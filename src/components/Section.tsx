import { cn } from '@/lib/utils'

export const Section = ({ ariaLabel, children, className, id }: { ariaLabel: string; children: React.ReactNode; className?: string; id: string }) => {
  return (
    <section aria-label={ariaLabel} className={cn('pb-12 md:pb-16 lg:pb-20', className)} id={id}>
      {children}
    </section>
  )
}
