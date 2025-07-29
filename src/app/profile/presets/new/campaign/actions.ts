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
  const promotion: ICampaignFormState['promotion'] = (formData.get('promotion') as ICampaignFormState['promotion']) || ''
  const tone: ICampaignFormState['tone'] = (formData.get('tone') as ICampaignFormState['tone']) || ''
  return { approach, channels, goal, promotion, temperature, tone }
}

export async function cancelCampaignForm() {
  redirect(routes.profile.presets.root)
}

export async function submitCampaignForm(previousState: ICampaignFormState, formData: FormData): Promise<ICampaignFormState> {
  const { approach, channels, goal, promotion, temperature, tone } = extractFormData(formData)

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
        promotion,
        temperature,
        tone
      }
    }

    if (goal.length < 3) {
      return {
        approach,
        channels,
        // Use the current form data, not previous state
        error: 'Goal must be at least 3 characters long',
        goal,
        promotion,
        temperature,
        tone
      }
    }

    console.log('Submitting campaign form', { approach, channels, goal, promotion, temperature, tone })

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
      promotion: '',
      temperature: '',
      tone: ''
    }
  } catch (error) {
    // Preserve the current form input values
    return {
      approach,
      channels,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      goal,
      promotion,
      temperature,
      tone
    }
  }
}
