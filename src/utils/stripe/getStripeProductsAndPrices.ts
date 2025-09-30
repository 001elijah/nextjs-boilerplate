'use server'

import { PostgrestError } from '@supabase/supabase-js'
import { Tables } from '@/types/database.types'
import { createServerSupabaseClient } from '@/utils/supabase-client/server'

interface StripeData {
  prices: (Tables<{ schema: 'stripe' }, 'prices'> & { attrs: any })[] | null
  pricesError: null | PostgrestError
  products: null | Tables<{ schema: 'stripe' }, 'products'>[]
  productsError: null | PostgrestError
}

export const getStripeProductsAndPrices = async (): Promise<StripeData> => {
  const supabase = await createServerSupabaseClient()

  const { data: products, error: productsError } = await supabase.schema('stripe').from('products').select('*')
  const { data: prices, error: pricesError } = await supabase.schema('stripe').from('prices').select('*')

  return { prices, pricesError, products, productsError }
}
