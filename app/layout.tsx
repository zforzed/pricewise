import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300','400','500','600','700']
})

export const metadata: Metadata = {
  title: 'Prisewise',
  description: 'Track product prices effortlessly and save money on your online shopping.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <body className={inter.className}>
        <main className='max-w-10xl mx-auto'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
