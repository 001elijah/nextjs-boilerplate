'use client'

import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from '@/components'
import { routes } from '@/config'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  signUp: () => Promise<void>
  user: null | User
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  user: null
})

const supabase = createClient()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        },
        redirectTo: `${window.location.origin}${routes.auth.callback}`
      },
      provider: 'google'
    })
    if (error) console.error('Error signing in:', error.message)
  }

  const signUp = async () => {
    // For now, sign up is the same as sign in with Google
    await signIn()
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error.message)

    toast({
      message: 'You have been successfully logged out',
      title: 'Logged Out',
      type: 'success'
    })
    router.push(routes.home)
  }

  return <AuthContext.Provider value={{ loading, signIn, signOut, signUp, user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
