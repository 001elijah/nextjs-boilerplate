'use client'

import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner'

export const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-background text-foreground border-border',
        duration: 3000
      }}
    />
  )
}

interface ToastProps {
  message: string
  title?: string
  type?: 'default' | 'error' | 'loading' | 'success'
}

const styles = {
  default: {
    className: 'border-l-4 border-l-primary',
    icon: 'ℹ'
  },
  error: {
    className: 'border-l-4 border-l-destructive text-destructive',
    icon: '✕'
  },
  loading: {
    className: 'border-l-4 border-l-muted-foreground animate-pulse',
    icon: '◌'
  },
  success: {
    className: 'border-l-4 border-l-success text-success',
    icon: '✓'
  }
}

const showToast = (message: string, type: 'default' | 'error' | 'loading' | 'success' = 'default', title?: string) => {
  const { className, icon } = styles[type]

  sonnerToast(message, {
    className,
    icon,
    ...(title && { description: message, title })
  })
}

export const toast = Object.assign(({ message, title, type = 'default' }: ToastProps) => showToast(message, type, title), {
  error: (message: string, title?: string) => showToast(message, 'error', title),
  loading: (message: string, title?: string) => showToast(message, 'loading', title),
  success: (message: string, title?: string) => showToast(message, 'success', title)
})
