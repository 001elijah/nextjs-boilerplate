'use server'

import { redirect } from 'next/navigation'
import { BusinessSubcategoryOption, BusinessType, CustomerData, LanguageData, LocationData, PresetFormState, RegionsData } from '@/types'

const extractFormData = (formData: FormData) => {
  const type = formData.get('type') as BusinessType
  const name = formData.get('name') as string
  const category = formData.get('category') as BusinessSubcategoryOption['value']
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

  return { category, customer, language, location, name, regions, type }
}

export async function cancelPresetForm() {
  redirect('/profile/presets')
}

export async function submitPresetForm(previousState: PresetFormState, formData: FormData): Promise<PresetFormState> {
  const { category, customer, language, location, name, regions, type } = extractFormData(formData)

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Add validation
    if (!name || name.trim().length === 0) {
      return {
        category,
        customer,
        error: 'Business name is required',
        language,
        location,
        name,
        regions,
        type // Use the current form data, not previous state
      }
    }

    if (name.length < 3) {
      return {
        category,
        customer,
        error: 'Business name must be at least 3 characters long',
        language,
        location,
        name,
        regions,
        type // Use the current form data, not previous state
      }
    }

    console.log('Submitting preset form', { category, customer, language, location, name, regions, type })

    // Simulate potential server error
    // Remove this in production
    if (Math.random() < 0.3) {
      throw new Error('Server error occurred')
    }

    return {
      category: '',
      customer: { demographics: '', painPoint: '', professionalType: '' },
      error: '', // Clear any previous errors
      language: '',
      location: { city: '', country: '', region: '', state: '', zip: '' },
      name: '',
      regions: [],
      type: 'online'
    }
  } catch (error) {
    // Preserve the current form input values
    return {
      category,
      customer,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      language,
      location,
      name,
      regions,
      type
    }
  }
}
