import { IBusinessData, ICampaignData } from '@/types'

export interface IAdGeneratorProps {
  adGenerator: IAdGeneratorConfig
}

export interface IAdSetData {
  business_id: string
  campaign_id: string
  user_id: string
}

export interface IAdSetFormState extends IAdSetData {
  error: string
}

export interface IAdSetResponse {
  ad_text: string
  business_details: IBusinessData
  business_id: string
  campaign_details: ICampaignData
  campaign_id: string
  generation_model: string
  image_url: string
  user_id: string
}

interface IAdGeneratorConfig {
  cancelButtonText: string
  cancelTransitionButtonText: string
  submitButtonText: string
  submitPendingButtonText: string
}
