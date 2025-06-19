'use client'

import { LucideIcon } from 'lucide-react'
import { useGlobal } from '@/contexts'
import { cn } from '@/lib/utils'

export interface SidebarItemInterface {
  icon?: LucideIcon
  isActive?: boolean
  isDisabled?: boolean
  label: string
  level?: number
  onClick?: () => void
}

interface SidebarItemProps {
  item: SidebarItemInterface
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
  const { isMobile, isSidebarCollapsed } = useGlobal()
  const accentPrefix = !isMobile ? 'sidebar-' : ''

  const handleClick = () => {
    if (item.isDisabled) return
    if (item.onClick) item.onClick()
  }

  return (
    <button
      className={cn(
        'w-full flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
        item.isActive && !item.isDisabled ? `bg-${accentPrefix}-accent text-${accentPrefix}-accent-foreground` : 'text-muted-foreground',
        !item.isDisabled && `transition-colors hover:text-foreground hover:bg-${accentPrefix}-accent/50`,
        item.isDisabled && 'opacity-50',
        item.level === 2 && 'pl-8'
      )}
      onClick={handleClick}
    >
      {item.icon && (
        <div className="flex-shrink-0">
          <item.icon className="h-4 w-4" />
        </div>
      )}
      {!isMobile ? (
        !isSidebarCollapsed && <span className="ml-3 truncate overflow-hidden text-ellipsis">{item.label}</span>
      ) : (
        <span className="ml-3 truncate overflow-hidden text-ellipsis">{item.label}</span>
      )}
    </button>
  )
}
