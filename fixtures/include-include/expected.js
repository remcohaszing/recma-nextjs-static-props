export const getStaticProps = () => ({
  props: JSON.parse(
    JSON.stringify({
      fn,
      regex_foo,
      string
    })
  )
})
import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime'
export const ignored = ''
export const string = ''
export const regex_foo = ''
export const fn = ''
function _createMdxContent(props) {
  return _jsx(_Fragment, {})
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout
    ? _jsx(MDXLayout, {
        ...props,
        children: _jsx(_createMdxContent, {
          ...props
        })
      })
    : _createMdxContent(props)
}
