'use server'

import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { ICampaignFormState } from '@/types'

const extractFormData = (formData: FormData) => {
  const goal: ICampaignFormState['goal'] = (formData.get('goal') as ICampaignFormState['goal']) || ''
  const temperature: ICampaignFormState['temperature'] = (formData.get('temperature') as ICampaignFormState['temperature']) || ''
  const approach: ICampaignFormState['approach'] = (formData.get('approach') as ICampaignFormState['approach']) || ''
  const channelsRaw = formData.get('channels') as null | string
  const channels: ICampaignFormState['channels'] = channelsRaw ? JSON.parse(channelsRaw) : []
  return { approach, channels, goal, temperature }
}

export async function cancelCampaignForm() {
  redirect(routes.profile.campaigns)
}

export async function submitCampaignForm(previousState: ICampaignFormState, formData: FormData): Promise<ICampaignFormState> {
  const { approach, channels, goal, temperature } = extractFormData(formData)

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Add validation
    if (!goal || goal.trim().length === 0) {
      return {
        approach,
        channels,
        // Use the current form data, not previous state
        error: 'Goal is required',
        goal,
        temperature
      }
    }

    if (goal.length < 3) {
      return {
        approach,
        channels,
        // Use the current form data, not previous state
        error: 'Goal must be at least 3 characters long',
        goal,
        temperature
      }
    }

    console.log('Submitting campaign form', { approach, channels, goal, temperature })

    // Simulate potential server error
    // Remove this in production
    if (Math.random() < 0.3) {
      throw new Error('Server error occurred')
    }

    return {
      approach: '',
      channels: [],
      error: '', // Clear any previous errors
      goal: '',
      temperature: ''
    }
  } catch (error) {
    // Preserve the current form input values
    return {
      approach,
      channels,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      goal,
      temperature
    }
  }
}
