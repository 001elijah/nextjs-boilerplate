'use client'

import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { login } from '@/app/actions'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Modal
} from '@/components'
import { navigation } from '@/config'
import { useAuth } from '@/contexts'

interface UserInfoProps {
  className?: string
  showName?: boolean
}

export const UserInfo = ({ className, showName = true }: UserInfoProps) => {
  const { signOut, user } = useAuth()
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const renderIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'profile':
        return <User className="h-4 w-4" />
      case 'settings':
        return <Settings className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const handleSignInClick = () => {
    setIsSignInModalOpen(true)
  }

  const handleGoogleLogin = async () => {
    await login()
    setIsSignInModalOpen(false)
  }

  return (
    <div className={className}>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {showName ? (
              <div className="flex items-center gap-2 px-2 w-full cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={user.user_metadata.full_name || user.email || ''} src={user.user_metadata.avatar_url} />
                  <AvatarFallback>{(user.user_metadata.full_name || user.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.user_metadata.full_name || user.email}</span>
              </div>
            ) : (
              <Button className="relative h-8 w-8 rounded-full" variant="ghost">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={user.user_metadata.full_name || user.email || ''} src={user.user_metadata.avatar_url} />
                  <AvatarFallback>{(user.user_metadata.full_name || user.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || user.email}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {navigation.user.map(item => (
              <DropdownMenuItem asChild key={item.href}>
                <Link className="flex items-center" href={item.href}>
                  {renderIcon(item.label)}
                  <span className="ml-2">{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button onClick={handleSignInClick} size="sm" variant="secondary">
            Sign In
          </Button>
          <Modal className="w-[300px] md:w-[50%]" isOpen={isSignInModalOpen} onOpenChange={setIsSignInModalOpen} title="Sign In">
            <div className="flex flex-col items-center py-4">
              <Button onClick={handleGoogleLogin} variant={'outline'}>
                <svg
                  style={{ display: 'block' }}
                  version="1.1"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    fill="#EA4335"
                  ></path>
                  <path
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    fill="#34A853"
                  ></path>
                  <path d="M0 0h48v48H0z" fill="none"></path>
                </svg>
                Continue with Google
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}
