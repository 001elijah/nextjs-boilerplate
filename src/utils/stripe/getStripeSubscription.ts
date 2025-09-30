import { PostgrestError } from '@supabase/supabase-js'
import { Tables } from '@/types/database.types'
import { createServerSupabaseClient } from '@/utils/supabase-client/server'

export interface GetStripeSubscriptionResult {
  product: null | Tables<{ schema: 'stripe' }, 'products'>
  productError: null | PostgrestError
  subscription: null | (Tables<{ schema: 'stripe' }, 'subscriptions'> & { attrs: any })
  subscriptionError: null | PostgrestError
  user: null | Tables<{ schema: 'public' }, 'users'>
  userError: null | PostgrestError
  userStripeMap: null | Tables<{ schema: 'public' }, 'user_stripe_map'>
  userStripeMapError: null | PostgrestError
}

export const getStripeSubscription = async (): Promise<GetStripeSubscriptionResult> => {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user: authUser }
  } = await supabase.auth.getUser()

  let user: GetStripeSubscriptionResult['user'] = null
  let userError: GetStripeSubscriptionResult['userError'] = null

  if (authUser) {
    const { data, error } = await supabase.from('users').select('*').eq('id', authUser.id).single()
    user = data
    userError = error
  }

  const { data: userStripeMap, error: userStripeMapError } = await supabase.from('user_stripe_map').select('*').eq('user_id', authUser?.id).single()

  let subscription: GetStripeSubscriptionResult['subscription'] = null
  let subscriptionError: GetStripeSubscriptionResult['subscriptionError'] = null
  let product: GetStripeSubscriptionResult['product'] = null
  let productError: GetStripeSubscriptionResult['productError'] = null

  if (userStripeMap && userStripeMap.stripe_customer_id) {
    const { data, error } = await supabase.schema('stripe').from('subscriptions').select('*').eq('customer', userStripeMap.stripe_customer_id).single()

    subscription = data
    subscriptionError = error

    if (subscription && subscription.attrs) {
      // Safely access nested properties to get product ID from subscription items
      const subscriptionItems = (subscription.attrs as any)?.items?.data
      const productId = subscriptionItems?.[0]?.price?.product

      if (productId) {
        const { data: productData, error: prodError } = await supabase.schema('stripe').from('products').select('*').eq('id', productId).single()
        product = productData
        productError = prodError
      }
    }
  }

  return { product, productError, subscription, subscriptionError, user, userError, userStripeMap, userStripeMapError }
}
