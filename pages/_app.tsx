import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode } from 'react'

import { PropsList } from '../components/PropsList'

/**
 * Next.js uses the `App` component to initialize pages. You can override it and control the page
 * initialization.
 *
 * Because of `recma-nextjs-static-props`, you can use any exports from your MDX page here.
 */
export default function App({ Component, pageProps }: AppProps): ReactNode {
  return (
    <main>
      <Head>
        <title>{pageProps.title}</title>
        <meta content={pageProps.description} name="description" />
      </Head>
      All page props are available in the <code>pages/_app.js</code> component.
      <PropsList {...pageProps} />
      <hr />
      <Component {...pageProps} />
    </main>
  )
}
