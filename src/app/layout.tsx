import type { Metadata } from 'next'
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthGuard, NetworkMonitor, ThemeProvider, ToastProvider } from '@/components'
import { AuthProvider, GlobalProvider } from '@/contexts'
import { Layout } from '@/layout'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  description: 'advertiser',
  title: 'dunamis'
}

// TODO: update className to use cn from utils for conditional styling

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full relative`}>
        <GlobalProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem={false}>
              <ToastProvider />
              <NetworkMonitor />
              <AuthGuard>
                <Layout>{children}</Layout>
              </AuthGuard>
            </ThemeProvider>
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  )
}
