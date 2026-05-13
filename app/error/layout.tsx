import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  other: {
    'color-scheme': 'light dark'
  }
}

/**
 *
 */
export default function RootLayout({ children }: LayoutProps<'/error'>): ReactNode {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
