'use server'

import Stripe from 'stripe'
import { getErrorRedirect, getURL } from '@/lib/utils'
import { Tables } from '@/types/database.types'
import { stripe } from '@/utils/stripe/config'
import { createOrRetrieveCustomer } from '@/utils/supabase-client/admin'
import { createServerSupabaseClient } from '@/utils/supabase-client/server'

type CheckoutResponse = {
  errorRedirect?: string
  sessionId?: string
}

type Price = Tables<{ schema: 'stripe' }, 'prices'>

export async function cancelStripeSubscription(subscriptionId: string, redirectPath: string = '/account'): Promise<CheckoutResponse> {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      console.error(error)
      throw new Error('Could not get user session.')
    }

    await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true })

    return { sessionId: undefined }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(redirectPath, error.message, 'Please try again later or contact a system administrator.')
      }
    } else {
      return {
        errorRedirect: getErrorRedirect(redirectPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.')
      }
    }
  }
}

export async function checkoutWithStripe(price: Price, redirectPath: string = '/account'): Promise<CheckoutResponse> {
  try {
    // Get the user from Supabase auth
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      console.error(error)
      throw new Error('Could not get user session.')
    }

    // Retrieve or create the customer in Stripe
    let customer: string
    try {
      customer = await createOrRetrieveCustomer({
        email: user?.email || '',
        uuid: user?.id || ''
      })
    } catch (err) {
      console.error(err)
      throw new Error('Unable to access customer record.')
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      cancel_url: getURL(),
      customer,
      customer_update: {
        address: 'auto'
      },
      line_items: [
        {
          price: price.id!,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: getURL(redirectPath)
    }

    // Create a checkout session in Stripe
    let session
    try {
      session = await stripe.checkout.sessions.create(params)
    } catch (err) {
      console.error(err)
      throw new Error('Unable to create checkout session.')
    }

    // Instead of returning a Response, just return the data or error.
    if (session) {
      return { sessionId: session.id }
    } else {
      throw new Error('Unable to create checkout session.')
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(redirectPath, error.message, 'Please try again later or contact a system administrator.')
      }
    } else {
      return {
        errorRedirect: getErrorRedirect(redirectPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.')
      }
    }
  }
}
