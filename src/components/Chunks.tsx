import Link from 'next/link'
import { routes } from '@/config'

export const renderTitle = (title?: string) => {
  return (
    <Link href={routes.home}>
      <span className="text-xl font-bold bg-yellow-400 text-transparent bg-clip-text whitespace-nowrap">{title}</span>
    </Link>
  )
}
