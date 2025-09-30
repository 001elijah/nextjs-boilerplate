import { getPaymentMethodDetails } from '@/utils/stripe/getPaymentMethodDetails'
import { getStripeProductsAndPrices } from '@/utils/stripe/getStripeProductsAndPrices'
import { getStripeSubscription } from '@/utils/stripe/getStripeSubscription'
// @ts-nocheck
import { Subscriptions } from '@/views'

export default async function SubscriptionsPage() {
  const { prices, pricesError, products, productsError } = await getStripeProductsAndPrices()
  const userSubscriptionData = await getStripeSubscription()
  const userStripePaymentMethod = await getPaymentMethodDetails(userSubscriptionData.subscription?.attrs?.default_payment_method)
  return (
    <Subscriptions
      prices={prices!}
      pricesError={pricesError}
      products={products!}
      productsError={productsError}
      userStripePaymentMethod={userStripePaymentMethod}
      userSubscriptionData={userSubscriptionData}
    />
  )
}
