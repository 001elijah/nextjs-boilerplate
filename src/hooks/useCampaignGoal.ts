'use client'

import { useEffect, useState } from 'react'
import { ICampaignGoalStepProps } from '@/types'

export const useCampaignGoal = ({ defaultValue, error, isLoading }: Omit<ICampaignGoalStepProps, 'step'>) => {
  const [goalData, setGoalData] = useState<ICampaignGoalStepProps['defaultValue']>(defaultValue)
  const [customGoal, setCustomGoal] = useState<string>('')

  useEffect(() => {
    setGoalData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setGoalData(defaultValue)
      setCustomGoal('')
    }
  }, [isLoading, error, defaultValue])

  const selectGoal = (goal: string) => {
    setGoalData(goal)
    setCustomGoal('')
  }

  const handleCustomGoalChange = (goal: string) => {
    setCustomGoal(goal)
    setGoalData(goal.trim().toLowerCase())
  }

  return {
    customGoal,
    goalData,
    handleCustomGoalChange,
    selectGoal,
    setCustomGoal,
    setGoalData
  }
}
