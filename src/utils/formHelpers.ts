import { ICampaignFormState } from '@/types'

export interface ValidationResult {
  error?: string
  isValid: boolean
}

export const createCampaignFormState = (data: Omit<ICampaignFormState, 'error'>, error = ''): ICampaignFormState => ({
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

export const validateCampaignForm = (data: Omit<ICampaignFormState, 'error'>): ValidationResult => {
  if (!data.goal || data.goal.trim().length === 0) {
    return { error: 'Goal is required', isValid: false }
  }

  if (data.goal.length < 3) {
    return { error: 'Goal must be at least 3 characters long', isValid: false }
  }

  return { isValid: true }
}
