import { fileURLToPath } from 'node:url'

import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter'],
    rehypePlugins: ['rehype-mdx-title'],
    recmaPlugins: [fileURLToPath(import.meta.resolve('recma-nextjs-static-props'))]
  }
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})
