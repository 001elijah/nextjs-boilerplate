'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export const login = async () => {
  const supabase = await createServerSupabaseClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      redirectTo: `${origin}${routes.auth.callback}`
    },
    provider: 'google'
  })

  if (error) {
    console.error('Error signing in:', error.message)
  } else {
    revalidatePath(routes.home, 'layout')
    redirect(data.url)
  }
}

export const logout = async () => {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
  } else {
    revalidatePath(routes.home, 'layout')
    redirect(routes.home)
  }
}
