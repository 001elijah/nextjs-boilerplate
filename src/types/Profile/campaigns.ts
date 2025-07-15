interface ICampaignConfig {
  cancelButtonText: string
  cancelTransitionButtonText: string
  nextButtonText: string
  submitButtonText: string
  submitPendingButtonText: string
}

export interface ICampaignsProps {
  campaigns: ICampaignConfig
}

export interface ICampaignGoalStepProps {
  defaultValue: string | TCampaignFormGoalStepValue
  error: ICampaignFormState['error']
  isLoading: boolean
  step: ICampaignFormStep
}

export interface ICampaignTemperatureStepProps {
  defaultValue: string | TCampaignFormTemperatureStepValue
  error: ICampaignFormState['error']
  isLoading: boolean
  step: ICampaignFormStep
}

export interface ICampaignApproachStepProps {
  defaultValue: string | TCampaignFormApproachStepValue
  error: ICampaignFormState['error']
  isLoading: boolean
  step: ICampaignFormStep
}

export interface ICampaignChannelsStepProps {
  defaultValue: (string | TCampaignFormChannelStepValue)[]
  error: ICampaignFormState['error']
  isLoading: boolean
  step: ICampaignFormStep
}

export interface ICampaignFormState {
  approach: string | TCampaignFormApproachStepValue
  channels: (string | TCampaignFormChannelStepValue)[]
  error: string
  goal: string | TCampaignFormGoalStepValue
  temperature: string | TCampaignFormTemperatureStepValue
}

type TCampaignFormInput = 'multiSelect' | 'singleSelect'
type TCampaignOtherFormInput = 'textInput'

interface ICampaignFormOption {
  icon: string
  id: string
  label: string
  value: TCampaignFormApproachStepValue | TCampaignFormChannelStepValue | TCampaignFormGoalStepValue | TCampaignFormTemperatureStepValue
}

export interface ICampaignFormCategory {
  icon?: string
  id: string
  inputType: TCampaignFormInput
  label: string
  options: ICampaignFormOption[]
}

export interface ICampaignOtherFormCategory {
  icon: string
  id: string
  inputType: TCampaignOtherFormInput
  label: string
  placeholder: string
  value: string
}

export interface ICampaignFormStep {
  categories: (ICampaignFormCategory | ICampaignOtherFormCategory)[]
  id: string
  question: string
  step: number
  title: string
}

type TCampaignFormGoalStepValue = 'attention' | 'bring back past clients' | 'convert to sale' | 'test new offer' | 'warm up audience'
type TCampaignFormTemperatureStepValue = 'cold' | 'hot' | 'warm'
type TCampaignFormApproachStepValue = 'case-study' | 'emotional' | 'expert' | 'light' | 'problem-focused'
type TCampaignFormChannelStepValue = 'email' | 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'website' | 'youtube'
