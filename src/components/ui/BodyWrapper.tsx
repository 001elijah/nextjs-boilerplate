'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import { useAuth } from '@/contexts/authContext'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()

  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full relative bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `${!user ? 'url("/bg_hero.jpg")' : ''}` }}>
      {children}
    </body>
  )
}
