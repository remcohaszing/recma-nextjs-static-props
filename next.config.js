import nextMDX from '@next/mdx'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import rehypeMdxTitle from 'rehype-mdx-title'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeMdxTitle],
    recmaPlugins: [recmaNextjsStaticProps],
  },
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
