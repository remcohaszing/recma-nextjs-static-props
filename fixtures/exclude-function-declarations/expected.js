import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime'
export const exported = ''
export function declared() {}
export const getStaticProps = () => ({
  props: JSON.parse(
    JSON.stringify({
      exported
    })
  )
})
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
