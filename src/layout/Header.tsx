'use client'

import { ChevronLeft, Menu } from 'lucide-react'
import { Title } from '@/components'
import { Container } from '@/components'
import { ThemeToggle } from '@/components'
import { Button } from '@/components'
import { UserInfo } from '@/components'
import { useGlobal } from '@/contexts'

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
            <div className="flex items-center gap-3">
              <Title title={title} />
            </div>
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
