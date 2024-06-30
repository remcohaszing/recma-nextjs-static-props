import { compile } from '@mdx-js/mdx'
import { testFixturesDirectory } from 'snapshot-fixtures'

import recmaNextjsStaticProps from './index.js'

testFixturesDirectory({
  directory: new URL('fixtures', import.meta.url),
  tests: {
    'expected.js'(input, options) {
      return compile(input, { recmaPlugins: [[recmaNextjsStaticProps, options]] })
    }
  }
})
