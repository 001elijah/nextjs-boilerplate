'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export const loginWithGoogle = async () => {
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

export const loginWithApple = async () => {
  const supabase = await createServerSupabaseClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: `${origin}${routes.auth.callback}`
    },
    provider: 'apple'
  })

  if (error) {
    console.error('Error signing in with Apple:', error.message)
  } else {
    revalidatePath(routes.home, 'layout')
    redirect(data.url)
  }
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    console.log('Error signing up:', error.message)
    return { error: { message: error.message } }
  }
  revalidatePath('/', 'layout')
  return { error: null }
}
