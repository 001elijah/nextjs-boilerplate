import { BookOpen, ChevronLeft, LayoutDashboard, Plus, Settings, User } from 'lucide-react'

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
  profile: {
    content: {
      generate: '/profile/content/generate',
      root: '/profile/content'
    },
    presets: {
      new: {
        business: '/profile/presets/new/business',
        campaign: '/profile/presets/new/campaign'
      },
      root: '/profile/presets'
    },
    referral: '/profile/referral',
    root: '/profile',
    settings: '/profile/settings',
    socials: '/profile/socials',
    subscriptions: '/profile/subscriptions'
  },
  settings: '/settings',
  signIn: '/sign-in',
  signUp: '/sign-up',
  stories: '/stories',
  story: (id: string) => `/stories/${id}`,
  storyNew: '/stories/new'
} as const

// Type for all possible routes
export type AppRoute =
  | (typeof routes)[keyof typeof routes]
  | (typeof routes.auth)[keyof typeof routes.auth]
  | (typeof routes.profile)[keyof typeof routes.profile]

// Type guard to check if a route requires authentication
export const isProtectedRoute = (route: string): boolean => {
  return route === routes.dashboard || route.startsWith(routes.profile.root) || route === routes.settings
}

export type Route = (typeof routes)[keyof typeof routes]

export const navigation = {
  main: [
    {
      href: routes.home,
      icon: Plus,
      label: 'Try a new Ad generation',
      protected: true
    },
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
      href: routes.profile.settings,
      icon: User,
      label: 'Profile',
      protected: true
    }
  ],
  profile: [
    { href: routes.dashboard, icon: ChevronLeft, label: 'Back to Dashboard' },
    { href: '', icon: undefined, label: '' },
    { href: routes.profile.settings, icon: Settings, label: 'Profile settings' },
    { href: routes.profile.content.root, icon: Plus, label: 'Content generation' },
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
      href: routes.settings,
      icon: Settings,
      label: 'Settings'
    }
  ]
} as const
