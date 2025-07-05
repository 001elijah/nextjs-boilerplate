'use server'

import { redirect } from 'next/navigation'
import { BusinessSubcategoryOption, BusinessType, CustomerData, PresetFormState } from '@/types'

const extractFormData = (formData: FormData) => {
  const type = formData.get('type') as BusinessType
  const name = formData.get('name') as string
  const category = formData.get('category') as BusinessSubcategoryOption['value']
  const customer: CustomerData = {
    demographics: (formData.get('demographics') as string) || '',
    painPoint: (formData.get('painPoint') as string) || '',
    professionalType: (formData.get('professionalType') as string) || ''
  }

  return { category, customer, name, type }
}

export async function cancelPresetForm() {
  redirect('/profile/presets')
}

export async function submitPresetForm(previousState: PresetFormState, formData: FormData): Promise<PresetFormState> {
  const { category, customer, name, type } = extractFormData(formData)

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Add validation
    if (!name || name.trim().length === 0) {
      return {
        category,
        customer,
        error: 'Business name is required',
        name,
        type // Use the current form data, not previous state
      }
    }

    if (name.length < 3) {
      return {
        category,
        customer,
        error: 'Business name must be at least 3 characters long',
        name,
        type // Use the current form data, not previous state
      }
    }

    console.log('Submitting preset form', { category, customer, name, type })

    // Simulate potential server error
    // Remove this in production
    if (Math.random() < 0.3) {
      throw new Error('Server error occurred')
    }

    return {
      category: '',
      customer: { demographics: '', painPoint: '', professionalType: '' },
      error: '', // Clear any previous errors
      name: '',
      type: 'online'
    }
  } catch (error) {
    // Preserve the current form input values
    return {
      category,
      customer,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      name,
      type
    }
  }
}
