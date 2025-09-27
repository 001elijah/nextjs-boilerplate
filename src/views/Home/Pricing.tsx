'use client'

import { PostgrestError } from '@supabase/supabase-js'
import { Button, Container, PricingModal, Section, toast } from '@/components'
import { useModalClose } from '@/hooks/useModalClose'
import { PricingProps } from '@/types'
import { Tables } from '@/types/database.types'

interface ExtendedPricingProps extends PricingProps {
  prices: Tables<{ schema: 'stripe' }, 'prices'>[]
  pricesError: null | PostgrestError
  products: Tables<{ schema: 'stripe' }, 'products'>[]
  productsError: null | PostgrestError
}

type StructuredPrices = Record<string, Partial<Record<'month' | 'year', Tables<{ schema: 'stripe' }, 'prices'>>>>

export const Pricing = ({ prices, pricesError, pricing, products, productsError }: ExtendedPricingProps) => {
  const { closeModal, isModalOpen, openModal } = useModalClose()

  if (productsError || pricesError) {
    toast({
      message: 'Failed to load products or prices.',
      title: 'Error',
      type: 'error'
    })
  }

  const structuredPrices: StructuredPrices = prices.reduce((acc, price) => {
    if (
      price.type === 'recurring' &&
      price?.attrs &&
      typeof price.attrs === 'object' &&
      'recurring' in price.attrs &&
      (price.attrs as any).recurring?.interval &&
      price.product !== null
    ) {
      const interval = (price.attrs as any).recurring.interval as 'month' | 'year'
      acc[price.product] = {
        ...(acc[price.product] || {}),
        [interval]: price
      }
    }
    return acc
  }, {} as StructuredPrices)

  console.log({ products })
  console.log({ prices })
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
            prices={structuredPrices}
            products={products}
            prompt={pricing?.modalPrompt}
            title={pricing?.modalHeading}
          />
        </Section>
      )}
    </>
  )
}
