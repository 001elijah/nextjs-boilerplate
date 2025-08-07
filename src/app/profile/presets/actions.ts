'use server'

import { CampaignService } from '@/services/campaignService'

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
