import { Button } from '@/components/Button'
import { CardBorder } from '@/components/CardBorder'

export const PricingCard = ({ buttonText, description, price }: { buttonText: string; description: string; price: number }) => {
  return (
    <CardBorder className="border-primary justify-between p-4 text-center">
      <h5 className="font-bold">{`${price}/month`}</h5>
      <p className="mb-2">{description}</p>
      <Button>{buttonText}</Button>
    </CardBorder>
  )
}
