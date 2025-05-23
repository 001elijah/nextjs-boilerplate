'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import Image from 'next/image'
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
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full relative`}>
      {!user && (
        <div className="fixed inset-0 z-[-1]">
          <Image
            alt="Background"
            fill
            src="/bg_hero.jpg"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      )}
      {children}
    </body>
  )
}
