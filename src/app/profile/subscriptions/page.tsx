'use client'

import { ArrowDownToLine, CheckCircle, CreditCard, RefreshCw, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, CardBorder, Container, Modal, PricingCard, Section, SectionTitle } from '@/components'
import { pricingCards } from '@/views'

const currentPlan = {
  description: 'Perfect for medium businesses',
  features: ['Daily Content Creation', 'Full Ad Campaigns', 'Dedicated Account Manager', 'Monthly Analytics Report'],
  name: 'Pro Plan',
  price: 70,
  renewalDate: 'July 20, 2025'
}

const billingHistory = [
  { amount: 70, date: 'June 20, 2025', id: 'INV-2025-003' },
  { amount: 70, date: 'May 20, 2025', id: 'INV-2025-002' },
  { amount: 70, date: 'April 20, 2025', id: 'INV-2025-001' }
]

export default function SubscriptionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent | React.KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isModalOpen])
  return (
    <Section ariaLabel="Subscriptions" className="pb-0 md:pb-0 lg:pb-0" id="subscriptions">
      <Container>
        <SectionTitle fallbackTitle="Subscription" sectionTitle="Manage Your Subscription" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Current Plan Details */}
          <div className="lg:col-span-2">
            <CardBorder className="h-full border-gold/50 bg-background/30 p-6">
              <h3 className="text-2xl font-bold text-gold">Current Plan</h3>
              <div className="mt-4 flex items-baseline gap-4">
                <p className="text-4xl font-extrabold text-foreground">{currentPlan.name}</p>
                <p className="text-xl font-semibold text-foreground/80">
                  ${currentPlan.price}
                  <span className="text-sm font-normal text-foreground/60">/month</span>
                </p>
              </div>
              <p className="mt-2 text-sm text-foreground/60">
                Your plan renews on <span className="font-semibold text-gold">{currentPlan.renewalDate}</span>.
              </p>
              <ul className="my-8 space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <li className="flex items-center gap-3" key={index}>
                    <CheckCircle className="size-5 text-green-400" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col md:flex-row items-center justify-center w-full gap-4 pt-4">
                <Button className="bg-gold font-bold text-background hover:bg-gold/90" onClick={openModal}>
                  <RefreshCw className="-ml-1 mr-2 size-4" />
                  Upgrade Plan
                </Button>
                <Button variant="destructive">
                  <XCircle className="-ml-1 mr-2 size-4" />
                  Cancel Subscription
                </Button>
              </div>
            </CardBorder>
          </div>

          {/* Billing Information */}
          <div className="lg:col-span-1">
            <CardBorder className="h-full items-start border-gold/50 bg-background/30 p-6">
              <h3 className="text-xl font-bold text-foreground">Billing Information</h3>
              <div className="my-6">
                <p className="mb-2 text-sm font-semibold text-foreground/80">Payment Method</p>
                <div className="flex items-center gap-3">
                  <CreditCard className="size-6 text-foreground/60" />
                  <div>
                    <p className="font-semibold text-foreground">Visa ending in 1234</p>
                    <p className="text-sm text-foreground/60">Expires 12/2028</p>
                  </div>
                </div>
                <Button className="mt-4 w-full" size="sm" variant="outline">
                  Update Payment Method
                </Button>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-foreground/80">Billing History</p>
                <ul className="space-y-2">
                  {billingHistory.map(invoice => (
                    <li className="flex items-center justify-between text-sm" key={invoice.id}>
                      <p className="text-foreground/80">
                        {invoice.date}: ${invoice.amount.toFixed(2)}
                      </p>
                      <a className="flex items-center gap-1 text-gold hover:underline" href="#">
                        <ArrowDownToLine className="size-3" />
                        PDF
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardBorder>
          </div>
        </div>
      </Container>
      <Modal isOpen={isModalOpen} onOpenChange={closeModal} title={'Available plans'} withCloseButton>
        <p className="mb-4">{'Select the plan that fits your needs'}</p>
        <div className="overflow-auto max-h-[calc(80vh-220px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingCards.map((card, index) => (
            <PricingCard buttonText={'Upgrade'} description={card.description} key={index} price={card.price} />
          ))}
        </div>
      </Modal>
    </Section>
  )
}
