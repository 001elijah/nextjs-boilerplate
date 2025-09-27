import { getStripeProductsAndPrices } from '@/utils/stripe/getStripeProductsAndPrices'
// @ts-nocheck
import { Subscriptions } from '@/views'

export default async function SubscriptionsPage() {
  const { prices, pricesError, products, productsError } = await getStripeProductsAndPrices()
  return <Subscriptions prices={prices!} pricesError={pricesError} products={products!} productsError={productsError} />
}
