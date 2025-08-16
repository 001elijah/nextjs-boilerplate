'use client'

import { useActionState, useCallback, useState, useTransition } from 'react'
import { getUserBusinesses } from '@/actions/business'
import { getUserCampaigns } from '@/actions/campaign'
import { cancelContentForm, submitContentForm } from '@/actions/content'
import { BusinessPresetCard } from '@/components/BusinessPresetCard'
import { Button } from '@/components/Button'
import { CampaignPresetCard } from '@/components/CampaignPresetCard'
import { Container } from '@/components/Container'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { Section } from '@/components/Section'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { IContentFormState, IContentsProps } from '@/types'
import { IBusinessResponseItem, ICampaignResponseItem } from '@/views'

export const ContentPresetAddForm = ({ contents }: IContentsProps) => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('')
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('')
  const { cancelButtonText, cancelTransitionButtonText, submitButtonText, submitPendingButtonText } = contents

  const fetchCampaignData = useCallback(async () => {
    const { campaigns, error, needsAuth } = await getUserCampaigns()
    return { data: campaigns, error, needsAuth }
  }, [])

  const { data: campaigns, loading: campaignsLoading } = useFetchUserPresets<ICampaignResponseItem>(fetchCampaignData, {
    errorMessage: 'Something went wrong while loading campaigns.',
    errorTitle: 'Error Loading Campaigns',
    unauthorizedMessage: 'You need to be logged in to view your campaigns.',
    unauthorizedTitle: 'Unauthorized'
  })

  const fetchBusinessData = useCallback(async () => {
    const { businesses, error, needsAuth } = await getUserBusinesses()
    return { data: businesses, error, needsAuth }
  }, [])

  const { data: businesses, loading: businessesLoading } = useFetchUserPresets<IBusinessResponseItem>(fetchBusinessData, {
    errorMessage: 'Something went wrong while loading businesses.',
    errorTitle: 'Error Loading Businesses',
    unauthorizedMessage: 'You need to be logged in to view your businesses.',
    unauthorizedTitle: 'Unauthorized'
  })

  const [isPending, startTransition] = useTransition()
  const initialState: IContentFormState = {
    business_id: '',
    campaign_id: '',
    error: ''
  }

  const [state, action, isLoading] = useActionState(submitContentForm, initialState)

  const handleCancel = () => {
    startTransition(async () => {
      await cancelContentForm()
    })
  }

  if (campaignsLoading || businessesLoading) {
    return (
      <Section ariaLabel="Businesses" className="py-8" id="businesses">
        <Container>
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size={48} />
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <form action={action} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <label>
              <PresetStepTitle question={'Pick a campaign for your content preset'} title={'Select a Campaign'} />
            </label>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {campaigns.map((presetData, index) => (
                <div
                  className={`
                  p-1 cursor-pointer rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-primary/20
                  ${selectedCampaignId === presetData.id ? 'ring-2 ring-primary' : 'border-2 border-transparent'}
                `}
                  key={index} // Use a unique key for the wrapper div
                  onClick={() => setSelectedCampaignId(presetData.id)}
                  // Optionally add a subtle hover effect if desired
                  // hover:shadow-lg
                >
                  <CampaignPresetCard campaignPresetData={presetData} />
                </div>
              ))}
            </div>
          </div>
          {/* Business Preset Cards wrapped in a selectable div */}
          <div>
            <label>
              <PresetStepTitle question={'Pick a business for your content preset'} title={'Select a Business'} />
            </label>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {businesses.map((presetData, index) => (
                <div
                  className={`
                  p-1 cursor-pointer rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-primary/20
                  ${selectedBusinessId === presetData.id ? 'ring-2 ring-primary' : 'border-2 border-transparent'}
                `}
                  key={index} // Use a unique key for the wrapper div
                  onClick={() => setSelectedBusinessId(presetData.id)}
                  // Optionally add a subtle hover effect if desired
                  // hover:shadow-lg
                >
                  <BusinessPresetCard businessPresetData={presetData} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden input to submit the selected business_id */}
        {/* It's crucial that this input has the correct 'name' attribute */}
        <input name="business_id" type="hidden" value={selectedBusinessId} />
        <input name="campaign_id" type="hidden" value={selectedCampaignId} />

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
