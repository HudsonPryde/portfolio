import './globals.css'
import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import localFont from 'next/font/local'


const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const raleway = Raleway({ subsets: ['latin'], display: 'swap', variable: '--font-raleway' })
const young = localFont({
  src: '../public/YoungSerif-Regular.ttf',
  display: 'swap',
  variable: '--font-young',
})

export const metadata: Metadata = {
  title: 'Portfolio-HP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${raleway.variable} ${young.variable}`}>{children}</body>
    </html>
  )
}
