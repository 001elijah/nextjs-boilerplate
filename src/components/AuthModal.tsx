'use client'

import { useState } from 'react'
import { login, loginWithGoogle, signup } from '@/app/actions'
import { Button, EmailPasswordForm, Modal, ModalProps, SignupSuccessCard } from '@/components'

interface AuthModalProps {
  isOpen: ModalProps['isOpen']
  onOpenChange: ModalProps['onOpenChange']
}

type AuthView = 'initial' | 'login' | 'signup' | 'signup_success'

export const AuthModal = ({ isOpen, onOpenChange }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>('initial')

  const handleSignup = async (email: string, password: string) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    const result = await signup(formData)
    if (result.error) {
      return result
    }
    setView('signup_success')
  }

  const handleLogin = async (email: string, password: string) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    return await login(formData)
  }

  const handleGoogleLogin = async () => {
    await loginWithGoogle()
    onOpenChange(false)
    setView('initial')
  }

  const handleAppleLogin = () => {
    alert('Apple login is not yet supported')
  }

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      if (view !== 'initial') {
        setView('initial')
      } else {
        onOpenChange(false)
      }
    } else {
      onOpenChange(true)
    }
  }

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Login with Email'
      case 'signup':
        return 'Sign Up with Email'
      case 'signup_success':
        return 'Check your email'
      default:
        return 'Sign In'
    }
  }

  return (
    <Modal className="w-[300px] md:w-[50%]" isOpen={isOpen} onOpenChange={handleModalOpenChange} title={getTitle()}>
      {view === 'initial' && (
        <div className="flex flex-col items-center gap-2 py-4">
          <Button className="w-full" onClick={() => setView('signup')}>
            Sign up with email
          </Button>
          <Button className="w-full" onClick={() => setView('login')} variant="outline">
            Login with email
          </Button>
          <div className="relative flex py-2 items-center w-full">
            <div className="flex-grow border-t border-border" />
            <span className="flex-shrink mx-4 text-muted-foreground">or</span>
            <div className="flex-grow border-t border-border" />
          </div>
          <Button className="w-full" onClick={handleGoogleLogin} variant="outline">
            <svg style={{ display: 'block' }} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                fill="#EA4335"
              />
              <path
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                fill="#4285F4"
              />
              <path
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                fill="#FBBC05"
              />
              <path
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                fill="#34A853"
              />
              <path d="M0 0h48v48H0z" fill="none" />
            </svg>
            Continue with Google
          </Button>
          <Button className="w-full" onClick={handleAppleLogin} variant="outline">
            <svg viewBox="0 0 41.5 51" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
              <path
                d="M40.2 17.4c-3.4 2.1-5.5 5.7-5.5 9.7 0 4.5 2.7 8.6 6.8 10.3-.8 2.6-2 5-3.5 7.2-2.2 3.1-4.5 6.3-7.9 6.3s-4.4-2-8.4-2c-3.9 0-5.3 2.1-8.5 2.1s-5.4-2.9-7.9-6.5C2 39.5.1 33.7 0 27.6c0-9.9 6.4-15.2 12.8-15.2 3.4 0 6.2 2.2 8.3 2.2 2 0 5.2-2.3 9-2.3 4-.1 7.8 1.8 10.1 5.1zM28.3 8.1C30 6.1 30.9 3.6 31 1c0-.3 0-.7-.1-1-2.9.3-5.6 1.7-7.5 3.9-1.7 1.9-2.7 4.3-2.8 6.9 0 .3 0 .6.1.9.2 0 .5.1.7.1 2.7-.2 5.2-1.6 6.9-3.7z"
                style={{ fill: '#fff' }}
              />
            </svg>
            Continue with Apple
          </Button>
        </div>
      )}
      {view === 'signup' && <EmailPasswordForm buttonText="Sign Up" onSubmit={handleSignup} />}
      {view === 'login' && <EmailPasswordForm buttonText="Login" onSubmit={handleLogin} />}
      {view === 'signup_success' && <SignupSuccessCard />}
    </Modal>
  )
}
