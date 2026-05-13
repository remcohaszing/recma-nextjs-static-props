import type { ReactNode } from 'react'

import type { ParamsOf } from '../../../../../../.next/types/routes'

import { readdir, readFile } from 'node:fs/promises'

/**
 *
 */
export async function generateStaticParams(): Promise<ParamsOf<'/error/[a]/[b]/[c]/[d]'>[]> {
  const params: ParamsOf<'/error/[a]/[b]/[c]/[d]'>[] = []

  for (const a of await readdir('posts')) {
    for (const b of await readdir(`posts/${a}`)) {
      for (const c of await readdir(`posts/${a}/${b}`)) {
        for (const d of await readdir(`posts/${a}/${b}/${c}`)) {
          params.push({ a, b, c, d })
        }
      }
    }
  }

  return params
}

/**
 *
 */
export default async function Root({
  params
}: PageProps<'/error/[a]/[b]/[c]/[d]'>): Promise<ReactNode> {
  const { a, b, c, d } = await params

  const content = await readFile(`posts/${a}/${b}/${c}/${d}`, 'utf8')

  return (
    <main>
      <ul>
        <li>{a}</li>
        <li>{b}</li>
        <li>{c}</li>
        <li>{d}</li>
      </ul>
      <p>{content}</p>
    </main>
  )
}
