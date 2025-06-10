'use client'

import { FormEvent, useState } from 'react'
import { AuthErrorCard, Button, Input } from '@/components'

interface EmailPasswordFormProps {
  buttonText: string
  onSubmit: (email: string, password: string) => Promise<void | { error?: { message: string } }>
}

export const EmailPasswordForm = ({ buttonText, onSubmit }: EmailPasswordFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    const result = await onSubmit(email, password)
    if (result?.error) {
      setErrorMessage(result.error.message)
    } else {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
      <Input onChange={e => setEmail(e.target.value)} placeholder="Email" required type="email" value={email} />
      <Input onChange={e => setPassword(e.target.value)} placeholder="Password" required type="password" value={password} />
      {errorMessage && <AuthErrorCard errorMessage={errorMessage} />}
      <Button className="w-full mt-2" type="submit">
        {buttonText}
      </Button>
    </form>
  )
}
