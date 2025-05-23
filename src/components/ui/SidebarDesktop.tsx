'use client'

import { SidebarItemInterface } from '@/components/ui/SidebarItem'
import { SidebarNav } from '@/components/ui/SidebarNav'
import { useGlobal } from '@/contexts/globalContext'
import { cn } from '@/lib/utils'

interface SidebarDesktopProps {
  className?: string
  footer?: React.ReactNode
  items: SidebarItemInterface[]
}

export const SidebarDesktop = ({ className, footer, items }: SidebarDesktopProps) => {
  const { isMobile, isSidebarCollapsed } = useGlobal()
  return (
    <aside
      className={cn(
        'h-full bg-background transition-all duration-300 overflow-hidden',
        isMobile ? 'hidden' : 'flex-shrink-0',
        isSidebarCollapsed ? 'w-0' : 'w-64',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Navigation */}
        {!isSidebarCollapsed && <SidebarNav items={items} />}

        {/* Sidebar Footer */}
        {!isSidebarCollapsed && footer && <div className="border-t p-4">{footer}</div>}
      </div>
    </aside>
  )
}
