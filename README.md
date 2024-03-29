# recma-nextjs-static-props

[![ci](https://github.com/remcohaszing/recma-nextjs-static-props/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/recma-nextjs-static-props/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/recma-nextjs-static-props/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/recma-nextjs-static-props)
[![npm version](https://img.shields.io/npm/v/recma-nextjs-static-props)](https://www.npmjs.com/package/recma-nextjs-static-props)
[![npm downloads](https://img.shields.io/npm/dm/recma-nextjs-static-props)](https://www.npmjs.com/package/recma-nextjs-static-props)

Generate [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
exposing top level identifiers

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Options](#options)
- [Example](#example)
- [Compatibility](#compatibility)
- [Related Projects](#related-projects)
- [License](#license)

## Installation

```sh
npm install recma-nextjs-static-props
```

## Usage

This plugin is intended for use with [Next.js](https://nextjs.org) and [MDX](https://mdxjs.com). It
injects a `getStaticProps` function which exposes all top level identifiers. This means these
variable are available in [`pages/_app.js`](https://nextjs.org/docs/advanced-features/custom-app).

```js
import nextMDX from '@next/mdx'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'

const withMDX = nextMDX({
  options: {
    recmaPlugins: [recmaNextjsStaticProps]
  }
})

export default withMDX()
```

This roughly transforms the following MDX:

```mdx
export const title = 'My document'
export const description = 'This is my document'

Hello Next
```

into the following JavaScript:

```js
import { jsx } from 'react/jsx-runtime'

export const title = 'My document'
export const description = 'This is my document'

export default function MDXContent() {
  return jsx('p', { children: ['Hello Next'] })
}

export const getStaticProps = () => ({
  props: JSON.parse(
    JSON.stringify({
      description,
      title
    })
  )
})
```

## API

The default export is a recma plugin which exposes variables from the top-level scope in
[Next.js](https://nextjs.org) through `getStaticProps`.

### Options

- `name`: The name of the export to generate. (Default: `'getStaticProps'`)
- `include`: A list to filter identifiers to include in the generated function. This list may
  include strings which must be matched exactly, a regular expression to test against, or a function
  that will be called with the value to test, and must return a boolean. If a value is specified
  which doesn’t exist in the document, it will be ignored. By default everything will be included.
- `exclude`: The same as `include`, but matching values will be excluded instead.

## Example

The source code repository for this plugin is setup as a [Next.js](https://nextjs.org) project. It
uses both [`rehype-mdx-title`](https://github.com/remcohaszing/rehype-mdx-title) and
[`remark-mdx-frontmatter`](https://github.com/remcohaszing/remark-mdx-frontmatter).

To try it yourself, simply clone, install, and run this project:

```sh
git clone https://github.com/remcohaszing/recma-nextjs-static-props.git
cd recma-nextjs-static-props
npm ci
npm run dev
```

## Compatibility

This project is compatible with Node.js 16 or greater.

## Related Projects

This plugin works well with the following [MDX](https://mdxjs.com) plugins:

- [`rehype-mdx-title`](https://github.com/remcohaszing/rehype-mdx-title)
- [`remark-mdx-frontmatter`](https://github.com/remcohaszing/remark-mdx-frontmatter)

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
