import './globals.css'
import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import localFont from 'next/font/local'
import { initializeApp } from 'firebase/app';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const raleway = Raleway({ subsets: ['latin'], display: 'swap', variable: '--font-raleway' })
const young = localFont({
  src: '../public/YoungSerif-Regular.ttf',
  display: 'swap',
  variable: '--font-young',
})

export const metadata: Metadata = {
  title: 'HP - Portfolio',
}

const firebaseConfig = {

  apiKey: "AIzaSyAm54cAEUB89UFOyb6z9QI2oWmxWDU_vo0",

  authDomain: "portfolio-2d738.firebaseapp.com",

  projectId: "portfolio-2d738",

  storageBucket: "portfolio-2d738.appspot.com",

  messagingSenderId: "824846387183",

  appId: "1:824846387183:web:3434471891e3e8d674181a"

};
const app = initializeApp(firebaseConfig);

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
