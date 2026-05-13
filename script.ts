import { mkdir, writeFile } from 'node:fs/promises'

const max = 1000
const maxLength = String(max).length

for (let count = 0; count < max; count += 1) {
  const dir = `posts/${String(count)
    .padStart(maxLength - 1, '0')
    .split('')
    .join('/')}`

  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/file.js`, `export default ${JSON.stringify(dir)}\n`)
}
