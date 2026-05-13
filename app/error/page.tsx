import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 *
 */
async function readDirRecursive() {
  const results = []
  for (const a of await readdir('posts')) {
    const aDir = join('posts', a)
    for (const b of await readdir(aDir)) {
      const bDir = join(aDir, b)
      for (const c of await readdir(bDir)) {
        const cDir = join(bDir, c)
        for (const d of await readdir(cDir)) {
          // Results.push(await readFile(`posts/${a}/${b}/${c}/${d}`, 'utf8'))
          results.push(await readFile(join('posts', a, b, c, d), 'utf8'))
        }
      }
    }
  }

  return results
}

/**
 *
 */
export default async function Root() {
  const items = await readDirRecursive()

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
