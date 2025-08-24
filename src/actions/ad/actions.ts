'use server'

import { AdService } from '@/services/adService'
import { IAdSetFormState } from '@/types'
import { createAdSetFormState, createEmptyAdSetFormState } from '@/utils/formHelpers'

const ExtractFormData = (formData: FormData): Omit<IAdSetFormState, 'error'> => {
  const business_id = formData.get('business_id') as string
  const campaign_id = formData.get('campaign_id') as string
  const user_id = formData.get('user_id') as string
  return { business_id, campaign_id, user_id }
}

export const getUserGeneratedAds = async () => {
  const adService = new AdService()

  try {
    const generatedAds = await adService.getUserGeneratedAds()
    return { error: null, generatedAds }
  } catch (error) {
    console.error('Error fetching user ad sets:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch ad sets',
      generatedAds: [],
      needsAuth: false
    }
  }
}

export const submitAdSetForm = async (previousState: IAdSetFormState, formData: FormData): Promise<IAdSetFormState> => {
  const formValues = ExtractFormData(formData)
  const adService = new AdService()

  try {
    const result = await adService.generateAd(formValues)
    console.log('Generated ad:', result)
    return createEmptyAdSetFormState()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Ad set submission error:', errorMessage)
    return createAdSetFormState(formValues, errorMessage)
  }
}
