'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { BusinessService } from '@/services/businessService'
import {
  BusinessSubcategoryOption,
  BusinessType,
  ChannelsData,
  CustomerData,
  IBusinessFormState,
  LanguageData,
  LocationData,
  PromotionsData,
  RegionsData,
  VisualsData
} from '@/types'
import { createBusinessFormState, createEmptyBusinessFormState, validateBusinessForm } from '@/utils/formHelpers'

const extractBusinessFormData = (formData: FormData) => {
  const type = formData.get('type') as BusinessType
  const name = formData.get('name') as string
  const category = formData.get('category') as BusinessSubcategoryOption['value']
  const channelsRaw = formData.get('channels') as null | string
  const channels: ChannelsData = channelsRaw ? JSON.parse(channelsRaw) : []
  const customer: CustomerData = {
    demographics: (formData.get('demographics') as string) || '',
    painPoint: (formData.get('painPoint') as string) || '',
    professionalType: (formData.get('professionalType') as string) || ''
  }
  const language: LanguageData = (formData.get('language') as LanguageData) || ''
  const location: LocationData = {
    city: (formData.get('city') as string) || '',
    country: (formData.get('country') as string) || '',
    region: (formData.get('region') as string) || '',
    state: (formData.get('state') as string) || '',
    zip: (formData.get('zip') as string) || ''
  }
  const regionsRaw = formData.get('regions') as null | string
  const regions: RegionsData = regionsRaw ? JSON.parse(regionsRaw) : []

  const tone = (formData.get('tone') as string) || ''

  const promotionsRaw = formData.get('promotions') as null | string
  const promotions: PromotionsData = promotionsRaw ? JSON.parse(promotionsRaw) : []

  const visualsRaw = formData.get('visuals') as null | string
  const visuals: VisualsData = visualsRaw ? JSON.parse(visualsRaw) : []

  return { category, channels, customer, language, location, name, promotions, regions, tone, type, visuals }
}

export async function cancelBusinessForm() {
  redirect(routes.profile.presets.root)
}

export const deleteBusiness = async (businessId: string) => {
  const businessService = new BusinessService()

  try {
    const user = await businessService.getCurrentUser()

    if (!user) {
      console.error('Unauthorized deletion attempt: User not authenticated.')
      return
    }

    await businessService.deleteBusiness(businessId, user.id)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Business deletion error:', errorMessage)
    throw error
  } finally {
    revalidatePath(routes.profile.presets.root)
  }
}

export const getUserBusinesses = async () => {
  const businessService = new BusinessService()

  try {
    const user = await businessService.getCurrentUser()

    if (!user) {
      return {
        businesses: [],
        error: null,
        needsAuth: true
      }
    }

    const businesses = await businessService.getUserBusinesses(user.id)
    return { businesses, error: null }
  } catch (error) {
    console.error('Error fetching user businesses:', error)
    return {
      businesses: [],
      error: error instanceof Error ? error.message : 'Failed to fetch businesses',
      needsAuth: false
    }
  }
}

export const submitBusinessForm = async (previousState: IBusinessFormState, formData: FormData): Promise<IBusinessFormState> => {
  const formValues = extractBusinessFormData(formData)
  const businessService = new BusinessService()

  try {
    const validation = validateBusinessForm(formValues)
    if (!validation.isValid) {
      return createBusinessFormState(formValues, validation.error)
    }

    const user = await businessService.getCurrentUser()
    if (!user) {
      return createBusinessFormState(formValues, 'User not authenticated')
    }

    await businessService.createBusiness(formValues, user.id)

    return createEmptyBusinessFormState()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Business submission error:', errorMessage)
    return createBusinessFormState(formValues, errorMessage)
  } finally {
    redirect(routes.profile.presets.root)
  }
}
