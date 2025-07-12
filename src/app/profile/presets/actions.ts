'use server'

import { redirect } from 'next/navigation'
import {
  BusinessSubcategoryOption,
  BusinessType,
  ChannelsData,
  CustomerData,
  LanguageData,
  LocationData,
  PresetFormState,
  PromotionsData,
  RegionsData,
  VisualsData
} from '@/types'

const extractFormData = (formData: FormData) => {
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

export async function cancelPresetForm() {
  redirect('/profile/presets')
}

export async function submitPresetForm(previousState: PresetFormState, formData: FormData): Promise<PresetFormState> {
  const { category, channels, customer, language, location, name, promotions, regions, tone, type, visuals } = extractFormData(formData)

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Add validation
    if (!name || name.trim().length === 0) {
      return {
        category,
        channels,
        customer,
        error: 'Business name is required',
        language,
        location,
        name,
        promotions,
        regions,
        tone,
        type, // Use the current form data, not previous state
        visuals
      }
    }

    if (name.length < 3) {
      return {
        category,
        channels,
        customer,
        error: 'Business name must be at least 3 characters long',
        language,
        location,
        name,
        promotions,
        regions,
        tone,
        type, // Use the current form data, not previous state
        visuals
      }
    }

    console.log('Submitting preset form', { category, channels, customer, language, location, name, promotions, regions, tone, type, visuals })

    // Simulate potential server error
    // Remove this in production
    if (Math.random() < 0.3) {
      throw new Error('Server error occurred')
    }

    return {
      category: '',
      channels: [],
      customer: { demographics: '', painPoint: '', professionalType: '' },
      error: '', // Clear any previous errors
      language: '',
      location: { city: '', country: '', region: '', state: '', zip: '' },
      name: '',
      promotions: [],
      regions: [],
      tone: '',
      type: 'online',
      visuals: []
    }
  } catch (error) {
    // Preserve the current form input values
    return {
      category,
      channels,
      customer,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      language,
      location,
      name,
      promotions,
      regions,
      tone,
      type,
      visuals
    }
  }
}
