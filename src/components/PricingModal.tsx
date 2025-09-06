import { Modal } from '@/components/Modal'
import { PricingCard } from '@/components/PricingCard'

const pricingCards = [
  {
    description: 'Perfect for small businesses',
    price: 40
  },
  {
    description: 'Perfect for medium businesses',
    price: 70
  },
  {
    description: 'Perfect for large businesses',
    price: 120
  },
  {
    description: 'Perfect for startups',
    price: 240
  }
]

type PricingModalProps = {
  actionText: string
  isOpen: boolean
  onClose: () => void
  prompt: string
  title: string
}

export const PricingModal = ({ actionText, isOpen, onClose, prompt, title }: PricingModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title={title} withCloseButton>
      <p className="mb-4">{prompt}</p>
      <div className="overflow-auto max-h-[calc(80vh-220px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingCards.map((card, index) => (
          <PricingCard buttonText={actionText} description={card.description} key={index} price={card.price} />
        ))}
      </div>
    </Modal>
  )
}
