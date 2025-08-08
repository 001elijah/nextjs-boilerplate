import { IBusinessFormState } from '@/types'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export class BusinessService {
  private supabase = createServerSupabaseClient()

  async createBusiness(data: Omit<IBusinessFormState, 'error'>, userId: string) {
    const { error } = await (await this.supabase).from('businesses').insert([
      {
        user_id: userId,
        ...data
      }
    ])

    if (error) {
      throw new Error(error.message)
    }
  }

  async deleteBusiness(businessId: string, userId: string) {
    const { error } = await (await this.supabase).from('businesses').delete().eq('id', businessId).eq('user_id', userId)

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

  async getUserBusinesses(userId: string) {
    const { data, error } = await (await this.supabase).from('businesses').select('*').eq('user_id', userId).order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
}
