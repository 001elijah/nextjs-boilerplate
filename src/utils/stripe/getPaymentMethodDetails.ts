'use server'

import { stripe } from '@/utils/stripe/config'

/**
 * Retrieves human-readable details for a Stripe PaymentMethod ID.
 * @param {string} paymentMethodId The Stripe PaymentMethod ID (e.g., "pm_1SCKo9COxgozEhA8VTdR5bhR").
 * @returns {{ readableDetails?: string, type?: string, errorRedirect?: string }}
 */
export async function getPaymentMethodDetails(paymentMethodId: string) {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    const paymentType = paymentMethod.type
    let readableDetails = 'Unknown Payment Method'

    if (paymentType === 'card' && paymentMethod.card) {
      const card = paymentMethod.card
      const expDate = `${card.exp_month}/${card.exp_year}`
      readableDetails = `${card.brand} ending in ${card.last4} (Expires ${expDate})`
    } else if (paymentType === 'sepa_debit' && paymentMethod.sepa_debit) {
      readableDetails = `SEPA Debit ending in ${paymentMethod.sepa_debit.last4}`
    }

    return {
      readableDetails,
      type: paymentType
    }
  } catch (error) {
    console.error('Error retrieving PaymentMethod details:', error)
    throw new Error('Unable to retrieve PaymentMethod details.')
  }
}
