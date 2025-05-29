import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/config'

export const Title = ({ title }: { title: string }) => {
  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === 'dark' ? '/logo-gold.png' : '/logo-black.png'

  return (
    <Link className="flex items-center gap-2" href={routes.home}>
      <Image alt="Logo" className="object-contain" height={32} src={logoSrc} width={32} />
      {title && <span className="text-xl font-bold bg-primary text-transparent bg-clip-text whitespace-nowrap">{title}</span>}
    </Link>
  )
}
