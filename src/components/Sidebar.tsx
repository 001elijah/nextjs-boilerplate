'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SidebarDesktop, SidebarItemInterface, SidebarMobile, UserInfo } from '@/components'
import { navigation, routes } from '@/config'
import { useAuth, useGlobal } from '@/contexts'

interface SidebarProps {
  className?: string
  defaultCollapsed?: boolean
}

export const Sidebar = ({ className, defaultCollapsed = true }: SidebarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { isMobile, setIsSidebarCollapsed } = useGlobal()
  const { user } = useAuth()

  useEffect(() => {
    const isProfilePage = pathname.startsWith(routes.profile.root)
    const checkMobile = () => {
      if (isMobile) {
        setIsSidebarCollapsed(true)
      } else {
        setIsSidebarCollapsed(isProfilePage ? false : defaultCollapsed)
      }
    }
    checkMobile()
  }, [isMobile, setIsSidebarCollapsed, defaultCollapsed, pathname])
  // TODO: const [history, setHistory] = useState<HistoryTitle[]>([])
  // TODO: const { history } = useDbStore()

  // TODO: useEffect(() => {
  //   if (user) {
  //     history.findMyHistoryTitles().then(setHistory)
  //   }
  // }, [user, history])

  const items: SidebarItemInterface[] = []

  if (user) {
    const isProfilePage = pathname.startsWith(routes.profile.root)
    const currentNav = isProfilePage ? navigation.profile : navigation.main

    currentNav.forEach(route => {
      items.push({
        icon: route.icon,
        isActive: pathname.includes(route.href),
        label: route.label,
        onClick: () => router.push(route.href)
      })
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
  }

  // Mobile sidebar with overlay
  if (isMobile) {
    return <SidebarMobile footer={<UserInfo />} items={items} />
  }

  // Desktop sidebar
  return <SidebarDesktop className={className} footer={<UserInfo />} items={items} />
}
