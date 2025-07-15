'use server'

import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { ICampaignFormState } from '@/types'

const extractFormData = (formData: FormData) => {
  const goal = (formData.get('goal') as ICampaignFormState['goal']) || ''
  const temperature = (formData.get('temperature') as ICampaignFormState['temperature']) || ''
  const approach = (formData.get('approach') as ICampaignFormState['approach']) || ''
  return { approach, goal, temperature }
}

export async function cancelCampaignForm() {
  redirect(routes.profile.campaigns)
}

export async function submitCampaignForm(previousState: ICampaignFormState, formData: FormData): Promise<ICampaignFormState> {
  const { approach, goal, temperature } = extractFormData(formData)

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Add validation
    if (!goal || goal.trim().length === 0) {
      return {
        approach,
        // Use the current form data, not previous state
        error: 'Goal is required',
        goal,
        temperature
      }
    }

    if (goal.length < 3) {
      return {
        approach,
        // Use the current form data, not previous state
        error: 'Goal must be at least 3 characters long',
        goal,
        temperature
      }
    }

    console.log('Submitting campaign form', { approach, goal, temperature })

    // Simulate potential server error
    // Remove this in production
    if (Math.random() < 0.3) {
      throw new Error('Server error occurred')
    }

    return {
      approach: '',
      error: '', // Clear any previous errors
      goal: '',
      temperature: ''
    }
  } catch (error) {
    // Preserve the current form input values
    return {
      approach,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      goal,
      temperature
    }
  }
}
