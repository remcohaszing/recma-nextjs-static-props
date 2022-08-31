import { compile } from '@mdx-js/mdx'

import recmaNextjsStaticProps from './index.js'

it('should include imports', async () => {
  const { value } = await compile(
    `
import defaultImported, { imported } from "module"
`,
    { recmaPlugins: [recmaNextjsStaticProps] },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
import defaultImported, {imported} from "module";
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
export const getStaticProps = () => ({
  props: JSON.parse(JSON.stringify({
    defaultImported,
    imported
  }))
});
`,
  )
})

it('should include exports', async () => {
  const { value } = await compile(
    `
export const exported = ''
`,
    { recmaPlugins: [recmaNextjsStaticProps] },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
export const exported = '';
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
export const getStaticProps = () => ({
  props: JSON.parse(JSON.stringify({
    exported
  }))
});
`,
  )
})

it('should exclude function declarations', async () => {
  const { value } = await compile(
    `
export const exported = ''
export function declared() {}
`,
    { recmaPlugins: [recmaNextjsStaticProps] },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
export const exported = '';
export function declared() {}
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
export const getStaticProps = () => ({
  props: JSON.parse(JSON.stringify({
    exported
  }))
});
`,
  )
})

it('should not override existing getStaticProps', async () => {
  const { value } = await compile(
    `
export const exported = '';
export function getStaticProps() {}
`,
    { recmaPlugins: [recmaNextjsStaticProps] },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
export const exported = '';
export function getStaticProps() {}
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
`,
  )
})

it('should not insert getStaticProps if no variables are defined', async () => {
  const { value } = await compile('', { recmaPlugins: [recmaNextjsStaticProps] })

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
`,
  )
})

it('should support custom names', async () => {
  const { value } = await compile(
    `
export const exported = '';
`,
    { recmaPlugins: [[recmaNextjsStaticProps, { name: 'custom' }]] },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
export const exported = '';
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
export const custom = () => ({
  props: JSON.parse(JSON.stringify({
    exported
  }))
});
`,
  )
})

it('should only include included properties if specified', async () => {
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
           * @type {import('recma-nextjs-static-props').RecmaNextjsStaticPropsOptions}}
           */
          ({ include: ['string', /^regex/, (val) => val === 'fn'] }),
        ],
      ],
    },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
export const ignored = '';
export const string = '';
export const regex_foo = '';
export const fn = '';
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
export const getStaticProps = () => ({
  props: JSON.parse(JSON.stringify({
    fn,
    regex_foo,
    string
  }))
});
`,
  )
})

it('should exclude included properties if specified', async () => {
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
           * @type {import('recma-nextjs-static-props').RecmaNextjsStaticPropsOptions}}
           */
          ({
            exclude: ['string', /^regex/, (val) => val === 'fn'],
          }),
        ],
      ],
    },
  )

  expect(value).toBe(
    `/*@jsxRuntime automatic @jsxImportSource react*/
import {Fragment as _Fragment, jsx as _jsx} from "react/jsx-runtime";
export const ignored = '';
export const string = '';
export const regex_foo = '';
export const fn = '';
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export default MDXContent;
export const getStaticProps = () => ({
  props: JSON.parse(JSON.stringify({
    ignored
  }))
});
`,
  )
})
