'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { CampaignService } from '@/services/campaignService'
import { ICampaignFormState } from '@/types'
import { createCampaignFormState, createEmptyCampaignFormState, validateCampaignForm } from '@/utils/formHelpers'

const extractFormData = (formData: FormData): Omit<ICampaignFormState, 'error'> => {
  const goal = (formData.get('goal') as string) || ''
  const temperature = (formData.get('temperature') as string) || ''
  const approach = (formData.get('approach') as string) || ''
  const channelsRaw = formData.get('channels') as null | string
  const channels = channelsRaw ? JSON.parse(channelsRaw) : []
  const promotion = (formData.get('promotion') as string) || ''
  const tone = (formData.get('tone') as string) || ''

  return { approach, channels, goal, promotion, temperature, tone }
}

export async function cancelCampaignForm() {
  redirect(routes.profile.presets.root)
}

export async function deleteCampaign(campaignId: string) {
  const campaignService = new CampaignService()

  try {
    const user = await campaignService.getCurrentUser()

    if (!user) {
      console.error('Unauthorized deletion attempt: User not authenticated.')
      return
    }

    await campaignService.deleteCampaign(campaignId, user.id)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Campaign deletion error:', errorMessage)
    throw error
  } finally {
    revalidatePath(routes.profile.presets.root)
  }
}

export async function getUserCampaigns() {
  const campaignService = new CampaignService()

  try {
    const user = await campaignService.getCurrentUser()

    if (!user) {
      return {
        campaigns: [],
        error: null,
        needsAuth: true
      }
    }

    const campaigns = await campaignService.getUserCampaigns(user.id)
    return { campaigns, error: null }
  } catch (error) {
    console.error('Error fetching user campaigns:', error)
    return {
      campaigns: [],
      error: error instanceof Error ? error.message : 'Failed to fetch campaigns',
      needsAuth: false
    }
  }
}

export async function submitCampaignForm(previousState: ICampaignFormState, formData: FormData): Promise<ICampaignFormState> {
  const formValues = extractFormData(formData)
  const campaignService = new CampaignService()

  try {
    const validation = validateCampaignForm(formValues)
    if (!validation.isValid) {
      return createCampaignFormState(formValues, validation.error)
    }

    const user = await campaignService.getCurrentUser()
    if (!user) {
      return createCampaignFormState(formValues, 'User not authenticated')
    }

    await campaignService.createCampaign(formValues, user.id)

    return createEmptyCampaignFormState()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Campaign submission error:', errorMessage)
    return createCampaignFormState(formValues, errorMessage)
  } finally {
    redirect(routes.profile.presets.root)
  }
}
