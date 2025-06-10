'use client'

import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
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

interface UserMenuProps {
  showName?: boolean
}

export const UserMenu = ({ showName = true }: UserMenuProps) => {
  const { signOut, user } = useAuth()

  if (!user) {
    return null
  }

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

  const { avatar_url, full_name } = user.user_metadata
  const displayName = full_name || user.email || ''
  const fallbackText = (full_name || user.email || 'U').charAt(0).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {showName ? (
          <div className="flex items-center gap-2 px-2 w-full cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage alt={displayName} src={avatar_url} />
              <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{displayName}</span>
          </div>
        ) : (
          <Button className="relative h-8 w-8 rounded-full" variant="ghost">
            <Avatar className="h-8 w-8">
              <AvatarImage alt={displayName} src={avatar_url} />
              <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
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
  )
}
