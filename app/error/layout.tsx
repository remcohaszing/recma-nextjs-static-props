import type { Metadata } from 'next'

export const metadata: Metadata = {
  other: {
    'color-scheme': 'light dark'
  }
}

/**
 *
 */
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
