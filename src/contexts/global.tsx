'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface GlobalContextType {
  isMobile: boolean
  isOnline: boolean
  isSidebarCollapsed: boolean
  pageTitle: string
  setIsSidebarCollapsed: (collapsed: boolean) => void
  setPageTitle: (title: string) => void
  title: string
}

const GlobalContext = createContext<GlobalContextType>({
  isMobile: false,
  isOnline: true,
  isSidebarCollapsed: false,
  pageTitle: '',
  setIsSidebarCollapsed: () => {},
  setPageTitle: () => {},
  title: ''
})

export const useGlobal = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  const [title] = useState('DUNAMIS')
  const [pageTitle, setPageTitle] = useState('')

  useEffect(() => {
    // Handle mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
        isOnline,
        isSidebarCollapsed,
        pageTitle,
        setIsSidebarCollapsed,
        setPageTitle,
        title
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
