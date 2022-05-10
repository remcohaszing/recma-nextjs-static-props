# recma-nextjs-static-props

> Expose top-level identifiers in Next.js app.js

## Installation

```sh
npm install recma-nexjs-static-props
```

## Usage

This plugin is intended for use with [Next.js](https://nextjs.org) and [MDX](https://mdxjs.com).

```js
import nextMDX from '@next/mdx'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'

const withMDX = nextMDX({
  options: {
    recmaPlugins: [recmaNextjsStaticProps],
  },
})

export default withMDX()
```

## API

The default export is a recma plugin which exposes variables from the top-level scope in
[Next.js](https://nextjs.org) through `getStaticProps`.

### Options

- `name`: The name of the export to generate. (Default: `'getStaticProps'`)
- `include`: A list to filter identifiers to include in the generated function. This list may
  include strings which must be matched exactly, a regular expression to test against, or a function
  that will be called with the value to test, and must return a boolean. By default everything will
  be included.
- `exclude`: The same as `include`, but matching values will be excluded instead.

## Example

The source code repository for this plugin is setup as a [Next.js](https://nextjs.org) project.

To try it yourself, simply clone, install, and run this project:

```
git clone https://github.com/remcohaszing/recma-nextjs-static-props.git
cd recma-nextjs-static-props
npm ci
npm run dev
```

## Related Projects

This plugin works well with the following [MDX](https://mdxjs.com) plugins:

- [rehype-mdx-title](https://github.com/remcohaszing/rehype-mdx-title)
- [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter)

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
