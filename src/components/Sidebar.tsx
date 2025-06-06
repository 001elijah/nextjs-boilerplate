'use client'

import { BookOpen, LayoutDashboard, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SidebarDesktop, SidebarItemInterface, SidebarMobile, UserInfo } from '@/components'
import { routes } from '@/config'
import { useAuth, useGlobal } from '@/contexts'

interface SidebarProps {
  className?: string
  defaultCollapsed?: boolean
}

export const Sidebar = ({ className, defaultCollapsed = true }: SidebarProps) => {
  const { isMobile, setIsSidebarCollapsed } = useGlobal()

  useEffect(() => {
    const checkMobile = () => {
      if (isMobile) {
        setIsSidebarCollapsed(true)
      } else {
        setIsSidebarCollapsed(defaultCollapsed)
      }
    }
    checkMobile()
  }, [isMobile, setIsSidebarCollapsed, defaultCollapsed])

  const { user } = useAuth()
  // TODO: const pathname = usePathname()
  const router = useRouter()
  // TODO: const [history, setHistory] = useState<HistoryTitle[]>([])
  // TODO: const { history } = useDbStore()

  // TODO: useEffect(() => {
  //   if (user) {
  //     history.findMyHistoryTitles().then(setHistory)
  //   }
  // }, [user, history])

  const items: SidebarItemInterface[] = []

  if (user) {
    items.push({
      icon: Plus,
      isActive: false,
      label: 'Try a new Ad generation',
      onClick: () => router.push(routes.storyNew)
    })
    items.push({ isDisabled: true, label: '' })

    items.push({
      icon: BookOpen,
      isActive: false,
      label: 'History',
      onClick: () => router.push(routes.stories)
    })
    // TODO: history?.forEach(story => {
    //   items.push({
    //     icon: Shrub,
    //     label: story.title,
    //     onClick: () => router.push(routes.story(story.id)),
    //     isActive: pathname === routes.story(story.id),
    //     level: 2
    //   })
    // })

    items.push({
      isActive: false,
      isDisabled: true,
      label: ''
    })
  }

  items.push({
    icon: LayoutDashboard,
    isActive: false,
    label: 'Dashboard',
    onClick: () => router.push(routes.dashboard)
  })

  // Mobile sidebar with overlay
  if (isMobile) {
    return <SidebarMobile footer={<UserInfo />} items={items} />
  }

  // Desktop sidebar
  return <SidebarDesktop className={className} footer={<UserInfo />} items={items} />
}
