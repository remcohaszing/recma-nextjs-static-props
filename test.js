/**
 * @import { RecmaNextjsStaticPropsOptions } from 'recma-nextjs-static-props'
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { compile } from '@mdx-js/mdx'

import recmaNextjsStaticProps from './index.js'

test('include imports', async () => {
  const { value } = await compile(
    `
import defaultImported, { imported } from "module"
`,
    { recmaPlugins: [recmaNextjsStaticProps] }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      'import defaultImported, {imported} from "module";\n' +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n' +
      'export const getStaticProps = () => ({\n' +
      '  props: JSON.parse(JSON.stringify({\n' +
      '    imported\n' +
      '  }))\n' +
      '});\n'
  )
})

test('include exports', async () => {
  const { value } = await compile(
    `
export const exported = ''
`,
    { recmaPlugins: [recmaNextjsStaticProps] }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      "export const exported = '';\n" +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n' +
      'export const getStaticProps = () => ({\n' +
      '  props: JSON.parse(JSON.stringify({\n' +
      '    exported\n' +
      '  }))\n' +
      '});\n'
  )
})

test('exclude function declarations', async () => {
  const { value } = await compile(
    `
export const exported = ''
export function declared() {}
`,
    { recmaPlugins: [recmaNextjsStaticProps] }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      "export const exported = '';\n" +
      'export function declared() {}\n' +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n' +
      'export const getStaticProps = () => ({\n' +
      '  props: JSON.parse(JSON.stringify({\n' +
      '    exported\n' +
      '  }))\n' +
      '});\n'
  )
})

test('don’t override existing getStaticProps', async () => {
  const { value } = await compile(
    `
export const exported = '';
export function getStaticProps() {}
`,
    { recmaPlugins: [recmaNextjsStaticProps] }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      "export const exported = '';\n" +
      'export function getStaticProps() {}\n' +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n'
  )
})

test('don’t insert getStaticProps if no variables are defined', async () => {
  const { value } = await compile('', { recmaPlugins: [recmaNextjsStaticProps] })

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n'
  )
})

test('support custom names', async () => {
  const { value } = await compile(
    `
export const exported = '';
`,
    { recmaPlugins: [[recmaNextjsStaticProps, { name: 'custom' }]] }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      "export const exported = '';\n" +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n' +
      'export const custom = () => ({\n' +
      '  props: JSON.parse(JSON.stringify({\n' +
      '    exported\n' +
      '  }))\n' +
      '});\n'
  )
})

test('only include included properties if specified', async () => {
  const { value } = await compile(
    `
export const ignored = ''
export const string = ''
export const regex_foo = ''
export const fn = ''
`,
    {
      recmaPlugins: [
        [
          recmaNextjsStaticProps,

          /**
           * @type {RecmaNextjsStaticPropsOptions}}
           */
          ({ include: ['string', /^regex/, (val) => val === 'fn'] })
        ]
      ]
    }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      "export const ignored = '';\n" +
      "export const string = '';\n" +
      "export const regex_foo = '';\n" +
      "export const fn = '';\n" +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n' +
      'export const getStaticProps = () => ({\n' +
      '  props: JSON.parse(JSON.stringify({\n' +
      '    fn,\n' +
      '    regex_foo,\n' +
      '    string\n' +
      '  }))\n' +
      '});\n'
  )
})

test('exclude included properties if specified', async () => {
  const { value } = await compile(
    `
export const ignored = ''
export const string = ''
export const regex_foo = ''
export const fn = ''
`,
    {
      recmaPlugins: [
        [
          recmaNextjsStaticProps,

          /**
           * @type {RecmaNextjsStaticPropsOptions}}
           */
          ({
            exclude: ['string', /^regex/, (val) => val === 'fn']
          })
        ]
      ]
    }
  )

  assert.equal(
    value,
    'import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";\n' +
      "export const ignored = '';\n" +
      "export const string = '';\n" +
      "export const regex_foo = '';\n" +
      "export const fn = '';\n" +
      'function _createMdxContent(props) {\n' +
      '  return _jsx(_Fragment, {});\n' +
      '}\n' +
      'export default function MDXContent(props = {}) {\n' +
      '  const {wrapper: MDXLayout} = props.components || ({});\n' +
      '  return MDXLayout ? _jsx(MDXLayout, {\n' +
      '    ...props,\n' +
      '    children: _jsx(_createMdxContent, {\n' +
      '      ...props\n' +
      '    })\n' +
      '  }) : _createMdxContent(props);\n' +
      '}\n' +
      'export const getStaticProps = () => ({\n' +
      '  props: JSON.parse(JSON.stringify({\n' +
      '    ignored\n' +
      '  }))\n' +
      '});\n'
  )
})
