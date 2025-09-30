'use client'

import { PostgrestError } from '@supabase/supabase-js'
import { Dispatch, SetStateAction, useState } from 'react'
import { Modal } from '@/components/Modal'
import { PricingCard } from '@/components/PricingCard'
import { toast } from '@/components/Toast'
import { Tables } from '@/types/database.types'

interface PricingModalProps {
  actionText?: string
  isAuthFlow?: boolean
  isOpen: boolean
  onAction: ((price: Tables<{ schema: 'stripe' }, 'prices'>) => Promise<void>) | Dispatch<SetStateAction<boolean>>
  onClose: () => void
  priceIdLoading: string | undefined
  prices: Record<string, Partial<Record<'month' | 'year', Tables<{ schema: 'stripe' }, 'prices'>>>>
  pricesError: null | PostgrestError
  products: Tables<{ schema: 'stripe' }, 'products'>[]
  productsError: null | PostgrestError
  prompt?: string
  title?: string
}

export const PricingModal = ({
  actionText,
  isAuthFlow,
  isOpen,
  onAction,
  onClose,
  priceIdLoading,
  prices,
  pricesError,
  products,
  productsError,
  prompt,
  title
}: PricingModalProps) => {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')
  const isMonthly = billingPeriod === 'month'

  if (productsError || pricesError) {
    toast({
      message: 'Failed to load products or prices.',
      title: 'Error',
      type: 'error'
    })
  }

  const togglePeriod = () => {
    setBillingPeriod(isMonthly ? 'year' : 'month')
  }

  const toggleClass = 'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200'

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} title={title ?? ''} withCloseButton>
      <p className="mb-4">{prompt}</p>
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-background p-1 shadow-inner">
          <button className={`${toggleClass} ${isMonthly ? 'bg-primary text-background shadow' : 'text-foreground'}`} onClick={togglePeriod}>
            Monthly
          </button>
          <button className={`${toggleClass} ${!isMonthly ? 'bg-primary text-background shadow' : 'text-foreground'}`} onClick={togglePeriod}>
            Annually
          </button>
        </div>
      </div>
      <div className="overflow-auto max-h-[calc(80vh-220px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => {
          const productPrices = product.id ? prices[product.id] || {} : {}
          const currentPrice = productPrices[billingPeriod]

          return (
            <PricingCard
              actionText={actionText}
              billingPeriod={billingPeriod}
              isAuthFlow={isAuthFlow}
              key={product.id}
              onAction={onAction}
              price={currentPrice}
              priceIdLoading={priceIdLoading}
              product={product}
            />
          )
        })}
      </div>
    </Modal>
  )
}
