import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Project In Bio',
  description: 'Project In Bio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={` ${inter.variable} bg-background-primary text-white antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-CGP7BVJSTG" />
    </html>
  )
}
