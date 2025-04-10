import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  metadataBase: new URL('https://postgres-drizzle.vercel.app'),
  title: 'Wealth Builder Mortgage Educators',
  description:
    'A premium platform for real estate investors seeking mortgage solutions',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
