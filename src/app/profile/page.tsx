import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'

export default function ProfilePage() {
  redirect(routes.profile.settings)
}
