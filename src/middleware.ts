import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const supabase = await createServerSupabaseClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!session && (pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/settings'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*', '/settings/:path*']
}
