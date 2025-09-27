// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Subscriptions } from '@/views'
import { getStripeProductsAndPrices } from '@/utils/stripe/getStripeProductsAndPrices'

export default async function SubscriptionsPage() {
  const { products, productsError, prices, pricesError } = await getStripeProductsAndPrices()
  return (
    <Subscriptions products={products!} productsError={productsError} prices={prices!} pricesError={pricesError} />
  )
}
