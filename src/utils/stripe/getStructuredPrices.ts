import { Tables } from '@/types/database.types'

export type StructuredPrices = Record<string, Partial<Record<'month' | 'year', Tables<{ schema: 'stripe' }, 'prices'>>>>

export const getStructuredPrices = (prices: Tables<{ schema: 'stripe' }, 'prices'>[] | null): StructuredPrices => {
  if (!prices) {
    return {}
  }

  return prices.reduce((acc, price) => {
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
}
