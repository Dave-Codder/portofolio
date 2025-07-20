import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import CustomCursor from './components/CustomCursor'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata = {
  title: 'My Portfolio',
  description: 'Inspired by bydika.dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NavBar />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}