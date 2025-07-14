'use client'

import { useActionState, useTransition } from 'react'
import { cancelCampaignForm, submitCampaignForm } from '@/app/profile/campaigns/actions'
import { CampaignGoalStep } from '@/components'
import { Button } from '@/components/Button'
import { campaignFormConfig } from '@/config/campaigns'
import { ICampaignFormState, ICampaignsProps } from '@/types'

export const CampaignAddForm = ({ campaigns }: ICampaignsProps) => {
  const { cancelButtonText, cancelTransitionButtonText, submitButtonText, submitPendingButtonText } = campaigns
  const [isPending, startTransition] = useTransition()
  const initialState: ICampaignFormState = {
    error: '',
    goal: ''
  }

  const [state, action, isLoading] = useActionState(submitCampaignForm, initialState)

  const campaignGoalStep = campaignFormConfig.find(step => step.id === 'goal')

  const handleCancel = () => {
    startTransition(async () => {
      await cancelCampaignForm()
    })
  }

  return (
    <form action={action} className="w-full">
      <div className="flex flex-col gap-4">
        {campaignGoalStep && <CampaignGoalStep defaultValue={state.goal} error={state.error} isLoading={isLoading} step={campaignGoalStep} />}
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
