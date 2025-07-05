import { cn } from '@/lib/utils'

interface CardBorderProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const CardBorder = ({ children, className, onClick }: CardBorderProps) => {
  return (
    <div className={cn('border-2 border-neutral-800 rounded-lg flex flex-col items-center', className)} onClick={onClick}>
      {children}
    </div>
  )
}
