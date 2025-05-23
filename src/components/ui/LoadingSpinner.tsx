import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: number
  text?: string
}

export const LoadingSpinner = ({ className, size = 24, text }: LoadingSpinnerProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Loader2 className={cn('animate-spin text-muted-foreground', className)} size={size} />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
