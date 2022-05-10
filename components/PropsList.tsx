import { Fragment, ReactElement } from 'react'

/**
 * Render a list of available props.
 */
export function PropsList(props: Record<string, unknown>): ReactElement {
  return (
    <dl>
      {Object.entries(props).map(([key, value]) => (
        <Fragment key={key}>
          <dt>{key}</dt>
          <dd>
            <pre>
              <code>{JSON.stringify(value, undefined, 2)}</code>
            </pre>
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}
