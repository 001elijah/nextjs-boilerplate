import { IBusinessData, ICampaignData } from '@/types'

export interface IContentData {
  business_id: string
  businesses: IBusinessData
  campaign_id: string
  campaigns: ICampaignData
}

export interface IContentFormState extends Omit<IContentData, 'businesses' | 'campaigns'> {
  error: string
}

export interface IContentsProps {
  contents: IContentConfig
}

interface IContentConfig {
  cancelButtonText: string
  cancelTransitionButtonText: string
  nextButtonText: string
  submitButtonText: string
  submitPendingButtonText: string
}
