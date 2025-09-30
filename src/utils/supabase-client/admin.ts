import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
import { stripe } from '@/utils/stripe/config'

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY, which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '')

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
  const { error: upsertError } = await supabaseAdmin.from('user_stripe_map').upsert([{ stripe_customer_id: customerId, user_id: uuid }])

  if (upsertError) throw new Error(`Supabase customer record creation failed: ${upsertError.message}`)

  return customerId
}

const createCustomerInStripe = async (uuid: string, email: string) => {
  const customerData = { email: email, metadata: { supabaseUUID: uuid } }
  const newCustomer = await stripe.customers.create(customerData)
  if (!newCustomer) throw new Error('Stripe customer creation failed.')

  return newCustomer.id
}

const createOrRetrieveCustomer = async ({ email, uuid }: { email: string; uuid: string }) => {
  const { data: existingMapRecord, error: queryError } = await supabaseAdmin
    .from('user_stripe_map')
    .select('stripe_customer_id')
    .eq('user_id', uuid)
    .maybeSingle()

  if (queryError) {
    throw new Error(`Supabase customer lookup failed: ${queryError.message}`)
  }

  let stripeCustomerId = existingMapRecord?.stripe_customer_id

  if (!stripeCustomerId) {
    const stripeCustomers = await stripe.customers.list({ email: email })
    stripeCustomerId = stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined
  }

  const stripeIdToInsert = stripeCustomerId || (await createCustomerInStripe(uuid, email))
  if (!stripeIdToInsert) throw new Error('Stripe customer creation failed.')

  if (!existingMapRecord) {
    console.warn(`Supabase customer record was missing. A new record was created.`)

    const upsertedStripeCustomer = await upsertCustomerToSupabase(uuid, stripeIdToInsert)
    if (!upsertedStripeCustomer) throw new Error('Supabase customer record creation failed.')
  }

  return stripeIdToInsert
}

export { createOrRetrieveCustomer }
