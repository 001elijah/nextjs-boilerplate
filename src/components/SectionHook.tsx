import { cn } from '@/lib/utils'

export const SectionHook = ({ className, sectionHook }: { className?: string; sectionHook: string }) => {
  return <p className={cn('text-xl md:text-lg text-muted-foreground mb-2', className)}>{sectionHook}</p>
}
