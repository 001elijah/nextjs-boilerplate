import { BookOpen, LayoutDashboard, Settings, User } from 'lucide-react'

export const routes = {
  advertisement: (id: string) => `/advertisement/${id}`,
  auth: {
    callback: '/auth/callback',
    confirm: '/auth/confirm'
  },
  createTransformation: '/create-transformation',
  dashboard: '/dashboard',
  home: '/',
  login: '/auth/login',
  profile: '/profile',
  settings: '/settings',
  signIn: '/sign-in',
  signUp: '/sign-up',
  stories: '/stories',
  story: (id: string) => `/stories/${id}`,
  storyNew: '/stories/new'
} as const

// Type for all possible routes
export type AppRoute = (typeof routes)[keyof typeof routes] | (typeof routes.auth)[keyof typeof routes.auth]

// Type guard to check if a route requires authentication
export const isProtectedRoute = (route: AppRoute): boolean => {
  return route === routes.dashboard || route === routes.profile || route === routes.settings
}

export type Route = (typeof routes)[keyof typeof routes]

export const navigation = {
  main: [
    {
      href: routes.dashboard,
      icon: LayoutDashboard,
      label: 'Dashboard',
      protected: true
    },
    {
      href: routes.stories,
      icon: BookOpen,
      label: 'History',
      protected: true
    },
    {
      href: routes.profile,
      icon: User,
      label: 'Profile',
      protected: true
    }
  ],
  user: [
    {
      href: routes.profile,
      icon: User,
      label: 'Profile'
    },
    {
      href: routes.settings,
      icon: Settings,
      label: 'Settings'
    }
  ]
} as const
