'use client'

import { PostgrestError } from '@supabase/supabase-js'
import { CheckCircle, CreditCard, RefreshCw, XCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, CardBorder, Container, PricingModal, Section, SectionTitle, toast } from '@/components'
import { useModalClose } from '@/hooks/useModalClose'
import { getErrorRedirect, parseStripeUserCardPaymentMethod } from '@/lib/utils'
import { Tables } from '@/types/database.types'
import { getStripe } from '@/utils/stripe/client'
import { getPaymentMethodDetails } from '@/utils/stripe/getPaymentMethodDetails'
import { GetStripeSubscriptionResult } from '@/utils/stripe/getStripeSubscription'
import { getStructuredPrices, StructuredPrices } from '@/utils/stripe/getStructuredPrices'
import { cancelStripeSubscription, checkoutWithStripe } from '@/utils/stripe/server'

interface ExtendedPricingProps {
  prices: Tables<{ schema: 'stripe' }, 'prices'>[]
  pricesError: null | PostgrestError
  products: Tables<{ schema: 'stripe' }, 'products'>[]
  productsError: null | PostgrestError
  userStripePaymentMethod: Awaited<ReturnType<typeof getPaymentMethodDetails>>
  userSubscriptionData: GetStripeSubscriptionResult
}

export const Subscriptions = ({ prices, pricesError, products, productsError, userStripePaymentMethod, userSubscriptionData }: ExtendedPricingProps) => {
  const { closeModal, isModalOpen, openModal } = useModalClose()
  const [priceIdLoading, setPriceIdLoading] = useState<string>('')
  const structuredPrices: StructuredPrices = getStructuredPrices(prices)
  const router = useRouter()
  const currentPath = usePathname()

  const { product, productError, subscription, subscriptionError, userError, userStripeMapError } = userSubscriptionData
  const hasActiveSubscription = !!subscription
  console.log({
    subscription
  })

  useEffect(() => {
    if (pricesError) {
      toast({
        message: pricesError.message || 'Failed to retrieve pricing information.',
        title: 'Error loading prices',
        type: 'error'
      })
    }
    if (productsError) {
      toast({
        message: productsError.message || 'Failed to retrieve product information.',
        title: 'Error loading products',
        type: 'error'
      })
    }
    if (productError) {
      toast({
        message: productError.message || 'Failed to retrieve your product details.',
        title: 'Error loading user product',
        type: 'error'
      })
    }
    if (subscriptionError) {
      toast({
        message: subscriptionError.message || 'Failed to retrieve your subscription details.',
        title: 'Error loading subscription',
        type: 'error'
      })
    }
    if (userError) {
      toast({
        message: userError.message || 'Failed to retrieve user information.',
        title: 'Error loading user data',
        type: 'error'
      })
    }
    if (userStripeMapError) {
      toast({
        message: userStripeMapError.message || 'Failed to retrieve Stripe user mapping.',
        title: 'Error loading Stripe mapping',
        type: 'error'
      })
    }
  }, [pricesError, productsError, productError, subscriptionError, userError, userStripeMapError])

  const defaultPriceId = product?.default_price
  const userProductPrice = prices?.find(price => price.id === defaultPriceId)
  const userProductDescription = product?.description
  const isUserSubscriptionAutoCollect = subscription?.attrs?.collection_method === 'charge_automatically'

  const isUserSubscriptionCancelled = subscription?.attrs?.cancel_at_period_end === true
  const isUserRequestedCancellation = subscription?.attrs?.cancellation_details?.reason === 'cancellation_requested'
  const subscriptionCancelAt = new Date(subscription?.attrs?.cancel_at * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric'
  })
  const subscriptionCanceledAt = new Date(subscription?.attrs?.canceled_at * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric'
  })
  const userSubscriptionRenewalDate = new Date(subscription?.attrs?.items.data[0].current_period_end * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric'
  })

  const { readableDetails, type } = userStripePaymentMethod
  const isCardStripePaymentMethod = type === 'card'

  let stripeCardVendorInfo
  let stripeCardExpireInfo
  if (isCardStripePaymentMethod) {
    const { cardExpireInfo, cardVendorInfo } = parseStripeUserCardPaymentMethod(readableDetails)
    stripeCardVendorInfo = cardVendorInfo
    stripeCardExpireInfo = cardExpireInfo
  }
  const userProductName = product?.name
  const userProductPriceCurrency = userProductPrice?.currency
  const userProductPriceInterval = (userProductPrice?.attrs as { recurring?: null | { interval?: null | string } })?.recurring?.interval
  const userProductPriceNumber = userProductPrice?.unit_amount ? userProductPrice?.unit_amount / 100 : '0.00'

  const handleStripeCheckout = async (price: Tables<{ schema: 'stripe' }, 'prices'>) => {
    setPriceIdLoading(price.id ?? '')

    toast({
      message: '',
      title: `Sending purchase intent...`,
      type: 'success'
    })

    const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath)
    if (errorRedirect) {
      setPriceIdLoading('')
      const url = new URL(errorRedirect, window.location.origin)
      const errorMessage = url.searchParams.get('error') || 'An unknown error occurred.'
      const errorDescription = url.searchParams.get('error_description') || 'Please try again later or contact a system administrator.'

      toast({
        message: errorDescription,
        title: `Error: ${errorMessage}`,
        type: 'error'
      })
      return router.push(errorRedirect)
    }

    if (!sessionId) {
      setPriceIdLoading('')
      toast({
        message: 'Please try again later or contact a system administrator.',
        title: 'An unknown error occurred.',
        type: 'error'
      })
      return router.push(getErrorRedirect(currentPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.'))
    }

    const stripe = await getStripe()
    stripe?.redirectToCheckout({ sessionId })

    setPriceIdLoading('')
  }

  const handleCancelSubscription = async () => {
    if (!subscription?.id) {
      toast({
        message: 'Could not find subscription to cancel.',
        title: 'Error cancelling subscription',
        type: 'error'
      })
      return
    }

    toast({
      message: 'Cancelling your subscription...',
      title: 'Cancelling Subscription',
      type: 'loading'
    })

    const { errorRedirect } = await cancelStripeSubscription(subscription.id, currentPath)

    if (errorRedirect) {
      const url = new URL(errorRedirect, window.location.origin)
      const errorMessage = url.searchParams.get('error') || 'An unknown error occurred.'
      const errorDescription = url.searchParams.get('error_description') || 'Please try again later or contact a system administrator.'

      toast({
        message: errorDescription,
        title: `Error: ${errorMessage}`,
        type: 'error'
      })
      router.push(errorRedirect)
    } else {
      toast({
        message: 'Your subscription has been cancelled and will remain active until the end of the current billing period.',
        title: 'Subscription Cancelled',
        type: 'success'
      })
      router.refresh()
    }
  }

  return (
    <Section ariaLabel="Subscriptions" className="pb-0 md:pb-0 lg:pb-0" id="subscriptions">
      <Container>
        <SectionTitle fallbackTitle="Subscription" sectionTitle="Manage Your Subscription" />
        {hasActiveSubscription ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Current Plan Details */}
            <div className="lg:col-span-2">
              <CardBorder className="h-full border-gold/50 bg-background/30 p-6">
                <h3 className="text-2xl font-bold text-gold">Current Plan</h3>
                <div className="mt-4 flex items-baseline gap-4">
                  <p className="text-4xl font-extrabold text-foreground">{userProductName}</p>
                  <p className="text-xl font-semibold text-foreground/80">
                    {userProductPriceCurrency === 'usd' && '$'}
                    {userProductPriceNumber}
                    <span className="text-sm font-normal text-foreground/60">/{userProductPriceInterval}</span>
                  </p>
                </div>
                {isUserSubscriptionAutoCollect && !isUserSubscriptionCancelled ? (
                  <p className="mt-2 text-sm text-foreground/60">
                    Your plan renews on <span className="font-semibold text-gold">{userSubscriptionRenewalDate}</span>.
                  </p>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-foreground/60">
                      Your plan ends on <span className="font-semibold text-gold">{subscriptionCancelAt}</span>.
                    </p>
                    {isUserRequestedCancellation && (
                      <p className="mt-2 text-sm text-foreground/60">
                        You cancelled your plan on <span className="font-semibold text-gold">{subscriptionCanceledAt}</span>.
                      </p>
                    )}
                  </>
                )}
                <div className="flex items-center gap-3 pt-4">
                  <CheckCircle className="size-5 text-green-400" />
                  <span className="text-foreground/90">{userProductDescription}</span>
                </div>
                <div className="mt-auto flex flex-col md:flex-row items-center justify-center w-full gap-4 pt-4">
                  <Button className="bg-gold font-bold text-background hover:bg-gold/90" onClick={openModal}>
                    <RefreshCw className="-ml-1 mr-2 size-4" />
                    Upgrade Plan
                  </Button>
                  {!isUserSubscriptionCancelled && (
                    <Button onClick={handleCancelSubscription} variant="destructive">
                      <XCircle className="-ml-1 mr-2 size-4" />
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              </CardBorder>
            </div>

            {/* Billing Information */}
            <div className="lg:col-span-1">
              <CardBorder className="h-full items-start border-gold/50 bg-background/30 p-6">
                <h3 className="text-xl font-bold text-foreground">Billing Information</h3>
                <div className="mt-6">
                  <p className="mb-2 text-sm font-semibold text-foreground/80">Payment Method</p>
                  <div className="flex items-center gap-3">
                    {isCardStripePaymentMethod && <CreditCard className="size-6 text-foreground/60" />}
                    <div>
                      <p className="font-semibold text-foreground">{stripeCardVendorInfo}</p>
                      <p className="text-sm text-foreground/60">{stripeCardExpireInfo}</p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" size="sm" variant="outline">
                    Update Payment Method
                  </Button>
                </div>
              </CardBorder>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xl font-semibold text-foreground">{"You don't have an active subscription."}</p>
            <Button className="mt-4 bg-gold font-bold text-background hover:bg-gold/90" onClick={openModal}>
              Explore Plans
            </Button>
          </div>
        )}
      </Container>
      <PricingModal
        actionText={'Upgrade'}
        isAuthFlow={false}
        isOpen={isModalOpen}
        onAction={handleStripeCheckout}
        onClose={closeModal}
        priceIdLoading={priceIdLoading}
        prices={structuredPrices}
        pricesError={pricesError}
        products={products!}
        productsError={productsError}
        prompt={'Select the plan that fits your needs'}
        title={'Available plans'}
      />
    </Section>
  )
}
