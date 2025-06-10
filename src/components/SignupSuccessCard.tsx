import { MailCheck } from 'lucide-react'
import { CardBorder } from '@/components/CardBorder'

export const SignupSuccessCard = () => {
  return (
    <CardBorder className="flex-row gap-4 md:gap-8 p-4 md:p-8 bg-secondary">
      <MailCheck className="flex-shrink-0 text-primary" size={24} />
      <p className="text-base text-muted-foreground flex-grow">Please check your email and follow the link to activate your account.</p>
    </CardBorder>
  )
}
