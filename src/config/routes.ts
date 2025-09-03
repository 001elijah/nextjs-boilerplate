import { BookOpen, ChevronLeft, LayoutDashboard, Settings, User } from 'lucide-react'

export const routes = {
  auth: {
    callback: '/auth/callback',
    confirm: '/auth/confirm'
  },
  createTransformation: '/create-transformation',
  dashboard: '/dashboard',
  history: '/history',
  home: '/',
  login: '/auth/login',
  profile: {
    presets: {
      new: {
        business: '/profile/presets/new/business',
        campaign: '/profile/presets/new/campaign',
        content: '/profile/presets/new/content'
      },
      root: '/profile/presets'
    },
    referral: '/profile/referral',
    root: '/profile',
    settings: '/profile/settings',
    socials: '/profile/socials',
    subscriptions: '/profile/subscriptions'
  },
  signIn: '/sign-in',
  signUp: '/sign-up'
} as const

// Type for all possible routes
export type AppRoute =
  | (typeof routes)[keyof typeof routes]
  | (typeof routes.auth)[keyof typeof routes.auth]
  | (typeof routes.profile)[keyof typeof routes.profile]

// Type guard to check if a route requires authentication
export const isProtectedRoute = (route: string): boolean => {
  return route === routes.dashboard || route.startsWith(routes.profile.root) || route === routes.profile.settings
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
      href: routes.history,
      icon: BookOpen,
      label: 'History',
      protected: true
    },
    {
      href: routes.profile.presets.root,
      icon: User,
      label: 'Profile',
      protected: true
    }
  ],
  profile: [
    { href: routes.dashboard, icon: ChevronLeft, label: 'Back to Dashboard' },
    { href: '', icon: undefined, label: '' },
    { href: routes.profile.settings, icon: Settings, label: 'Profile settings' },
    { href: routes.profile.presets.root, icon: LayoutDashboard, label: 'Profile presets' },
    { href: routes.profile.socials, icon: User, label: 'Socials' },
    { href: routes.profile.subscriptions, icon: BookOpen, label: 'Subscriptions' },
    { href: routes.profile.referral, icon: User, label: 'Referral' }
  ],
  user: [
    {
      href: routes.profile.root,
      icon: User,
      label: 'Profile'
    },
    {
      href: routes.profile.settings,
      icon: Settings,
      label: 'Settings'
    }
  ]
} as const
