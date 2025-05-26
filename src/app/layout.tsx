import type { Metadata } from 'next'
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthGuard } from '@/components/AuthGuard'
import { Header } from '@/components/Header'
import { NetworkMonitor } from '@/components/NetworkMonitor'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Sidebar } from '@/components/ui/Sidebar'
import { ToastProvider } from '@/components/ui/ToastProvidet'
import { AuthProvider } from '@/contexts/authContext'
import { GlobalProvider } from '@/contexts/globalContext'

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
  title: 'apex'
}

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
              <div className="flex h-screen overflow-hidden">
                <AuthGuard>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <div className="flex flex-1 overflow-hidden">
                      <Sidebar />
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <main className="flex-1 overflow-y-auto">{children}</main>
                      </div>
                    </div>
                  </div>
                </AuthGuard>
              </div>
            </ThemeProvider>
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  )
}
