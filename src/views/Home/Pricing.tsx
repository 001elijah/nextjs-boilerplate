'use client'

import { useEffect, useState } from 'react'
import { Button, Container, Modal, PricingCard, Section } from '@/components'
import { PricingProps } from '@/types'

export const Pricing = ({ pricing }: PricingProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <>
      {pricing && (
        <Section ariaLabel="Pricing" id="pricing">
          <Container>
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-2xl md:text-3xl mb-8">{pricing?.heading.toUpperCase()}</h2>
              <p className="text-4xl sm:text-5xl font-bold mb-4">{pricing?.hook.toUpperCase()}</p>
              <p className="text-lg sm:text-xl text-gray-400 mb-12">{pricing?.intro}</p>
              <div className="flex justify-center mt-8 space-x-2">
                <Button onClick={openModal}>{pricing?.action.toUpperCase()}</Button>
              </div>
            </div>
          </Container>

          <Modal isOpen={isModalOpen} onCloseAction={closeModal} title={pricing?.modalHeading}>
            <p className="mb-4">{pricing?.modalPrompt}</p>
            <div className="overflow-auto max-h-[calc(80vh-220px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingCards.map((card, index) => (
                <PricingCard buttonText={pricing?.modalAction} description={card.description} key={index} price={card.price} />
              ))}
            </div>
          </Modal>
        </Section>
      )}
    </>
  )
}
