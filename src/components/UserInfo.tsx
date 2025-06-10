'use client'

import { useState } from 'react'
import { AuthModal, Button, UserMenu } from '@/components'
import { useAuth } from '@/contexts'

interface UserInfoProps {
  className?: string
  showName?: boolean
}

export const UserInfo = ({ className, showName = true }: UserInfoProps) => {
  const { user } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <div className={className}>
      {user ? (
        <UserMenu showName={showName} />
      ) : (
        <>
          <Button onClick={() => setIsAuthModalOpen(true)} size="sm" variant="secondary">
            Sign In
          </Button>
          <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
        </>
      )}
    </div>
  )
}
