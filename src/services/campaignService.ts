import { ICampaignFormState } from '@/types'
import { createServerSupabaseClient } from '@/utils/supabase-client/server'

export class CampaignService {
  private supabase = createServerSupabaseClient()

  async createCampaign(data: Omit<ICampaignFormState, 'error'>, userId: string) {
    const { error } = await (await this.supabase).from('campaigns').insert([
      {
        user_id: userId,
        ...data
      }
    ])

    if (error) {
      throw new Error(error.message)
    }
  }

  async deleteCampaign(campaignId: string, userId: string) {
    const { error } = await (await this.supabase).from('campaigns').delete().eq('id', campaignId).eq('user_id', userId)

    if (error) {
      throw new Error(error.message)
    }
  }

  async getCurrentUser() {
    const {
      data: { user }
    } = await (await this.supabase).auth.getUser()
    return user
  }

  async getUserCampaigns(userId: string) {
    const { data, error } = await (await this.supabase).from('campaigns').select('*').eq('user_id', userId).order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
}
