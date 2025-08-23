import { IAdSetData, IAdSetResponse } from '@/types'
import { createServerSupabaseClient } from '@/utils/supabase-client/server'

export class AdService {
  private supabase = createServerSupabaseClient()

  async generateAd(adSetData: IAdSetData): Promise<IAdSetResponse> {
    try {
      const { data, error } = await (
        await this.supabase
      ).functions.invoke('generate-ad', {
        body: JSON.stringify(adSetData)
      })

      if (error) {
        throw new Error(error.message)
      }

      return data
    } catch (initialError) {
      console.warn('Failed to generate ad with "generate-ad", trying "generate-ad-openai":', initialError)
      const { data, error } = await (
        await this.supabase
      ).functions.invoke('generate-ad-openai', {
        body: JSON.stringify(adSetData)
      })

      if (error) {
        throw new Error(error.message)
      }

      return data
    }
  }
}
