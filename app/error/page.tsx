import type { ReactNode } from 'react'

import { readdir, readFile } from 'node:fs/promises'

/**
 *
 */
async function readDirRecursive(): Promise<string[]> {
  const results: string[] = []
  for (const a of await readdir('posts')) {
    for (const b of await readdir(`posts/${a}`)) {
      for (const c of await readdir(`posts/${a}/${b}`)) {
        for (const d of await readdir(`posts/${a}/${b}/${c}`)) {
          results.push(await readFile(`posts/${a}/${b}/${c}/${d}`, 'utf8'))
        }
      }
    }
  }

  return results
}

/**
 *
 */
export default async function Root(): Promise<ReactNode> {
  const items = await readDirRecursive()

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
