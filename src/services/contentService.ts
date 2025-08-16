import { IBusinessData, ICampaignData, IContentData, IContentFormState } from '@/types'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export class ContentService {
  private supabase = createServerSupabaseClient()

  async createContent(data: Omit<IContentFormState, 'error'>) {
    const { error } = await (await this.supabase).from('contents').insert(data)

    if (error) {
      throw new Error(error.message)
    }
  }

  async deleteContent(businessId: string, campaignId: string) {
    const { error } = await (await this.supabase).from('contents').delete().eq('business_id', BigInt(businessId)).eq('campaign_id', BigInt(campaignId))

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

  async getUserContents(): Promise<IContentData[]> {
    const { data, error } = await (await this.supabase).from('contents').select(`
            business_id,
            businesses(*),
            campaign_id,
            campaigns(*)`)

    if (error) {
      throw new Error(error.message)
    }

    return data.map((item: any) => ({
      business_id: String(item.business_id),
      businesses: item.businesses as IBusinessData,
      campaign_id: String(item.campaign_id),
      campaigns: item.campaigns as ICampaignData
    }))
  }
}
