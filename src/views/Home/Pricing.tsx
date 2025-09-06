'use client'

import { Button, Container, PricingModal, Section } from '@/components'
import { useModalClose } from '@/hooks/useModalClose'
import { PricingProps } from '@/types'

export const Pricing = ({ pricing }: PricingProps) => {
  const { closeModal, isModalOpen, openModal } = useModalClose()

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

          <PricingModal
            actionText={pricing?.modalAction}
            isOpen={isModalOpen}
            onClose={closeModal}
            prompt={pricing?.modalPrompt}
            title={pricing?.modalHeading}
          />
        </Section>
      )}
    </>
  )
}
