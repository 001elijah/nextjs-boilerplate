'use client'

import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
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
  DropdownMenuTrigger
} from '@/components'
import { navigation } from '@/config'
import { useAuth } from '@/contexts'

interface UserInfoProps {
  className?: string
  showName?: boolean
}

export const UserInfo = ({ className, showName = true }: UserInfoProps) => {
  const { signOut, user } = useAuth()

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
        <div className="flex items-center space-x-2">
          <Button onClick={login} size="sm" variant="secondary">
            Sign In
          </Button>
        </div>
      )}
    </div>
  )
}
