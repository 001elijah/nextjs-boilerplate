import { Ban } from 'lucide-react'
import { CardBorder } from '@/components/CardBorder'

export const AuthErrorCard = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <CardBorder className="flex-row gap-4 md:gap-8 p-4 md:p-8 bg-secondary">
      <Ban className="flex-shrink-0 text-primary" size={24} />
      <p className="text-sm text-center text-destructive">{errorMessage}</p>
    </CardBorder>
  )
}
