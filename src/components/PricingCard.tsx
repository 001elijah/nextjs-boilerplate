'use client'

import { Dispatch, SetStateAction } from 'react'
import { Button, CardBorder } from '@/components'
import { Tables } from '@/types/database.types'

interface PricingCardProps {
  actionText: string | undefined
  billingPeriod: 'month' | 'year'
  onAction: Dispatch<SetStateAction<boolean>>
  price: Tables<{ schema: 'stripe' }, 'prices'> | undefined
  product: Tables<{ schema: 'stripe' }, 'products'>
}

export const PricingCard = ({ actionText, billingPeriod, onAction, price, product }: PricingCardProps) => {
  const periodText = billingPeriod === 'month' ? '/month' : '/year'

  return (
    <CardBorder className="border-primary justify-between p-4 text-center">
      <h3 className="mb-4 text-2xl font-semibold">{product.name}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{product.description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">
          {price &&
            new Intl.NumberFormat('en-US', {
              currency: 'USD',
              minimumFractionDigits: 2,
              style: 'currency'
            }).format((price.unit_amount || 0) / 100)}
        </span>
        {price?.type === 'recurring' && <span className="text-gray-500 dark:text-gray-400">{periodText}</span>}
      </div>
      <Button onClick={() => onAction(true)}>{actionText}</Button>
    </CardBorder>
  )
}
