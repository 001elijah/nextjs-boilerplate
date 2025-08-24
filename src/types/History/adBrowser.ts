import { IBusinessResponseItem, ICampaignResponseItem } from '@/types'

export interface IAdBrowserProps {
  ads: IAdBrowserConfig
}

export interface IGeneratedAdData {
  ad_text: string
  business_details: IBusinessResponseItem
  business_id: number
  campaign_details: ICampaignResponseItem
  campaign_id: number
  created_at: string
  generation_model: string
  id: number
  image_url: string
  user_id: string
}

interface IAdBrowserConfig {
  heading: string
  subheading: string
}
