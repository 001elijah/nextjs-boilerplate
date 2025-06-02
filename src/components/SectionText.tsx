import { cn } from '@/lib/utils'

export const SectionText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={cn('text-base text-foreground md:text-lg lg:text-xl mb-2', className)}>{children}</p>
}
