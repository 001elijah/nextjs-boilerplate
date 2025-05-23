import type { Metadata } from 'next'
import './globals.css'
import { AuthGuard } from '@/components/AuthGuard'
import { Header } from '@/components/Header'
import { NetworkMonitor } from '@/components/NetworkMonitor'
import { ThemeProvider } from '@/components/ThemeProvider'
import { BodyWrapper } from '@/components/ui/BodyWrapper'
import { Sidebar } from '@/components/ui/Sidebar'
import { ToastProvider } from '@/components/ui/ToastProvidet'
import { AuthProvider } from '@/contexts/authContext'
import { GlobalProvider } from '@/contexts/globalContext'

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
      <GlobalProvider>
        <AuthProvider>
          <BodyWrapper>
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
                        <main className="flex-1 overflow-y-auto">
                          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">{children}</div>
                        </main>
                      </div>
                    </div>
                  </div>
                </AuthGuard>
              </div>
            </ThemeProvider>
          </BodyWrapper>
        </AuthProvider>
      </GlobalProvider>
    </html>
  )
}
