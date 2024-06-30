import { compile } from '@mdx-js/mdx'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import { testFixturesDirectory } from 'snapshot-fixtures'

testFixturesDirectory({
  directory: new URL('fixtures', import.meta.url),
  prettier: true,
  tests: {
    'expected.js'(input, options) {
      return compile(input, { recmaPlugins: [[recmaNextjsStaticProps, options]] })
    }
  }
})
