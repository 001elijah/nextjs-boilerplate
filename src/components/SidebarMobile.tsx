'use client'

import { SidebarItemInterface, SidebarNav } from '@/components'
import { useGlobal } from '@/contexts'
import { cn } from '@/lib/utils'

interface SidebarMobileProps {
  footer?: React.ReactNode
  items: SidebarItemInterface[]
}

export const SidebarMobile = ({ footer, items }: SidebarMobileProps) => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useGlobal()
  return (
    <>
      {/* Overlay with transition */}
      <div
        className={cn(
          'z-10 fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300',
          isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
        onClick={() => setIsSidebarCollapsed(true)}
      />
      {/* Sidebar panel with transition */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] bg-background transition-transform duration-300 ease-in-out',
          isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0',
          'w-full max-w-sm'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <SidebarNav items={items} />
          {/* Sidebar Footer */}
          {footer && <div className="border-t p-4">{footer}</div>}
        </div>
      </aside>
    </>
  )
}
