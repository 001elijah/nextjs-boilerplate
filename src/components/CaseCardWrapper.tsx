import { cn } from '@/lib/utils'

export const CaseCardWrapper = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return <div className={cn('border-2 border-neutral-800 rounded-lg flex flex-col items-center', className)}>{children}</div>
}
