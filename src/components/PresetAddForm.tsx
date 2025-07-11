'use client'

import { ChangeEvent, useActionState, useEffect, useState, useTransition } from 'react'
import { cancelPresetForm, submitPresetForm } from '@/app/profile/presets/actions'
import {
  BusinessCategoryStep,
  BusinessChannelsStep,
  BusinessCustomerStep,
  BusinessLanguageStep,
  BusinessLocationStep,
  BusinessRegionsStep,
  BusinessTitleStep,
  BusinessToneStep,
  BusinessTypeStep,
  Button
} from '@/components'
import { presetFormConfig as presetSteps } from '@/config/presets'
import { useBusinessCategory } from '@/hooks/useBusinessCategory'
import {
  BusinessSubcategoryOption,
  BusinessTitle,
  BusinessType,
  CustomerData,
  isValidBusinessType,
  LocationData,
  PresetFormState,
  PresetsProps,
  RegionsData
} from '@/types'

export const PresetAddForm = ({ presets }: PresetsProps) => {
  const { cancelButtonText, cancelTransitionButtonText, submitButtonText, submitPendingButtonText } = presets
  const [isPending, startTransition] = useTransition()

  const { resetCategoryState } = useBusinessCategory()

  const initialState: PresetFormState = {
    category: '',
    channels: [],
    customer: {
      demographics: 'female 18 to 25',
      painPoint: 'looking for a service like yours',
      professionalType: 'small business owners'
    },
    error: '',
    language: '',
    location: {
      city: '',
      country: '',
      region: '',
      state: '',
      zip: ''
    },
    name: '',
    regions: [],
    tone: '',
    type: 'online'
  }

  const [state, action, isLoading] = useActionState(submitPresetForm, initialState)
  const [businessType, setBusinessType] = useState<BusinessType>(state.type)
  const [businessTitle] = useState<BusinessTitle>(state.name)
  const [businessCategory] = useState<BusinessSubcategoryOption['value']>(state.category)
  const [customerData, setCustomerData] = useState<CustomerData>(state.customer)
  const [locationData] = useState<LocationData>(state.location)
  const [regionsData, setRegionsData] = useState<RegionsData>(state.regions)
  const [channelsData, setChannelsData] = useState<RegionsData>(state.regions)

  useEffect(() => {
    setRegionsData(state.regions)
  }, [state.regions])

  useEffect(() => {
    setChannelsData(state.channels)
  }, [state.channels])

  const handleBusinessTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as BusinessType
    if (isValidBusinessType(value)) {
      setBusinessType(value)
      resetCategoryState()
    }
  }

  const handleCustomerDataChange = (categoryId: string, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [categoryId]: value
    }))
  }

  const handleCancel = () => {
    startTransition(async () => {
      await cancelPresetForm()
    })
  }

  const businessTypeStep = presetSteps.find(step => step.id === 'type')
  const businessTitleStep = presetSteps.find(step => step.id === 'name')
  const businessCategoryStep = presetSteps.find(step => step.id === 'category')
  const businessChannelsStep = presetSteps.find(step => step.id === 'channels')
  const businessCustomerStep = presetSteps.find(step => step.id === 'customer')
  const businessLanguageStep = presetSteps.find(step => step.id === 'language')
  const businessLocationStep = presetSteps.find(step => step.id === 'location')
  const businessRegionsStep = presetSteps.find(step => step.id === 'regions')
  const businessToneStep = presetSteps.find(step => step.id === 'tone')

  return (
    <form action={action} className="w-full">
      <div className="flex flex-col gap-4">
        {businessTypeStep && (
          <BusinessTypeStep
            businessType={businessType}
            onChange={e => {
              handleBusinessTypeChange(e)
            }}
            step={businessTypeStep}
          />
        )}

        {businessTitleStep && <BusinessTitleStep defaultValue={businessTitle} step={businessTitleStep} />}

        {businessCategoryStep && businessType && (
          <BusinessCategoryStep businessType={businessType} defaultValue={businessCategory} step={businessCategoryStep} />
        )}

        {businessCustomerStep && <BusinessCustomerStep customerData={customerData} onChange={handleCustomerDataChange} step={businessCustomerStep} />}

        {businessLocationStep && <BusinessLocationStep defaultValue={locationData} step={businessLocationStep} />}

        {businessRegionsStep && <BusinessRegionsStep defaultValue={regionsData} onRegionsChange={setRegionsData} step={businessRegionsStep} />}

        {businessLanguageStep && <BusinessLanguageStep defaultValue={state.language} error={state.error} isLoading={isLoading} step={businessLanguageStep} />}

        {businessChannelsStep && <BusinessChannelsStep defaultValue={channelsData} onChannelsChange={setChannelsData} step={businessChannelsStep} />}

        {businessToneStep && <BusinessToneStep defaultValue={state.tone} error={state.error} isLoading={isLoading} step={businessToneStep} />}

        {/* Action Buttons */}
        <Button disabled={isLoading} type="submit">
          {isLoading ? submitPendingButtonText : submitButtonText}
        </Button>

        <Button className="text-muted-foreground hover:text-foreground" disabled={isPending} onClick={handleCancel} type="button" variant="ghost">
          {isPending ? cancelTransitionButtonText : cancelButtonText}
        </Button>

        {/* Error Display */}
        {state.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
      </div>
    </form>
  )
}
