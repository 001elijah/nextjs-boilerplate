import { IBusinessData, IBusinessFormState, ICampaignData, ICampaignFormState, IContentFormState } from '@/types'

interface BusinessFormValidationResult {
  error?: string
  isValid: boolean
}

interface CampaignFormValidationResult {
  error?: string
  isValid: boolean
}

export const createCampaignFormState = (data: ICampaignData, error = ''): ICampaignFormState => ({
  ...data,
  error
})

export const createBusinessFormState = (data: IBusinessData, error = ''): IBusinessFormState => ({
  ...data,
  error
})

export const createContentFormState = (data: Omit<IContentFormState, 'error'>, error = ''): IContentFormState => ({
  ...data,
  error
})

export const createEmptyCampaignFormState = (): ICampaignFormState => ({
  approach: '',
  channels: [],
  error: '',
  goal: '',
  promotion: '',
  temperature: '',
  tone: ''
})

export const createEmptyBusinessFormState = (): IBusinessFormState => ({
  category: '',
  channels: [],
  customer: { demographics: '', painPoint: '', professionalType: '' },
  error: '',
  language: '',
  location: { city: '', country: '', region: '', state: '', zip: '' },
  name: '',
  promotions: [],
  regions: [],
  tone: '',
  type: 'online',
  visuals: []
})

export const createEmptyContentFormState = (): IContentFormState => ({
  business_id: '',
  campaign_id: '',
  error: ''
})

export const validateCampaignForm = (data: Omit<ICampaignFormState, 'error'>): CampaignFormValidationResult => {
  if (!data.goal || data.goal.trim().length === 0) {
    return { error: 'Goal is required', isValid: false }
  }

  if (data.goal.length < 3) {
    return { error: 'Goal must be at least 3 characters long', isValid: false }
  }

  return { isValid: true }
}

export const validateBusinessForm = (data: Omit<IBusinessFormState, 'error'>): BusinessFormValidationResult => {
  if (!data.name || data.name.trim().length === 0) {
    return { error: 'Name is required', isValid: false }
  }

  if (!data.name || data.name.trim().length < 3) {
    return { error: 'Name must be at least 3 characters long', isValid: false }
  }

  return { isValid: true }
}
