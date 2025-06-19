'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isProtectedRoute, routes } from '@/config/routes'
import { useAuth } from '@/contexts'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && isProtectedRoute(pathname) && !user) {
      router.push(routes.home)
    }
  }, [loading, pathname, user, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Don't render protected content if the user is not authenticated
  if (isProtectedRoute(pathname) && !user) {
    return null
  }

  return children
}
