'use server'

import { Tables } from '@/types/database.types'
import { PostgrestError } from '@supabase/supabase-js'
import { createServerSupabaseClient } from '@/utils/supabase-client/server'

interface StripeData {
  prices: Tables<{ schema: 'stripe' }, 'prices'>[] | null
  pricesError: null | PostgrestError
  products: Tables<{ schema: 'stripe' }, 'products'>[] | null
  productsError: null | PostgrestError
}

export const getStripeProductsAndPrices = async (): Promise<StripeData> => {
  const supabase = await createServerSupabaseClient()

  const { data: products, error: productsError } = await supabase.schema('stripe').from('products').select('*')
  const { data: prices, error: pricesError } = await supabase.schema('stripe').from('prices').select('*')

  return { products, productsError, prices, pricesError }
}
