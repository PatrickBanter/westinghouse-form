import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Westinghouse X Messina',
  description: 'Buy a participating Westinghouse Fridge to win a year’s worth of Gelato Messina!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-gray-50'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
