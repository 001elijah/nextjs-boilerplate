'use client'

import { ChevronLeft, Menu } from 'lucide-react'
import { renderTitle } from '@/components/Chunks'
import { Container } from '@/components/Container'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { UserInfo } from '@/components/UserInfo'
import { useGlobal } from '@/contexts/globalContext'

export const Header = () => {
  const { isSidebarCollapsed, pageTitle, setIsSidebarCollapsed, title } = useGlobal()

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <Container>
        <div className="flex h-16 items-center px-4">
          {/* Left section with logo and title */}
          <div className="flex items-center gap-3">
            <Button className="h-8 w-8 -ml-2" onClick={toggleSidebar} size="icon" variant="ghost">
              {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">{renderTitle(title)}</div>
          </div>

          {/* Page title */}
          {pageTitle && <div className="text-lg font-semibold flex items-center gap-3  ml-auto mr-0">{pageTitle}</div>}

          {/* Right actions pushed to the edge */}
          <div className="flex flex-wrap items-center gap-2 ml-auto mr-0">
            <ThemeToggle />
            <Button size="sm">Pro</Button>
            <Button size="sm" variant="secondary">
              SEO
            </Button>
            <UserInfo showName={false} />
          </div>
        </div>
      </Container>
    </header>
  )
}
