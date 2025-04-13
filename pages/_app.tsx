import './global.css'

import { type AppProps } from 'next/app'
import Head from 'next/head'
import { type ReactNode } from 'react'

import { PropsList } from '../components/PropsList.tsx'

/**
 * Next.js uses the `App` component to initialize pages. You can override it and control the page
 * initialization.
 *
 * Because of `recma-nextjs-static-props`, you can use any exports from your MDX page here.
 */
export default function App({ Component, pageProps }: AppProps): ReactNode {
  const { frontmatter, title } = pageProps

  return (
    <main>
      <Head>
        {title ? <title>{title}</title> : undefined}
        {frontmatter?.description ? (
          <meta content={frontmatter.description} name="description" />
        ) : undefined}
        <meta content="light dark" name="color-scheme" />
      </Head>
      All page props are available in the <code>pages/_app.js</code> component.
      <PropsList {...pageProps} />
      <hr />
      <Component {...pageProps} />
    </main>
  )
}
