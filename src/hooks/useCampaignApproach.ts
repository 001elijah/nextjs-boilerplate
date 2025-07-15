'use client'

import { useEffect, useState } from 'react'
import { ICampaignApproachStepProps } from '@/types'

export const useCampaignApproach = ({ defaultValue, error, isLoading }: Omit<ICampaignApproachStepProps, 'step'>) => {
  const [approachData, setApproachData] = useState<ICampaignApproachStepProps['defaultValue']>(defaultValue)
  const [customApproach, setCustomApproach] = useState<string>('')

  useEffect(() => {
    setApproachData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setApproachData(defaultValue)
      setCustomApproach('')
    }
  }, [isLoading, error, defaultValue])

  const selectApproach = (approach: string) => {
    setApproachData(approach)
    setCustomApproach('')
  }

  const handleCustomApproachChange = (approach: string) => {
    setCustomApproach(approach)
    setApproachData(approach.trim().toLowerCase())
  }

  return {
    approachData,
    customApproach,
    handleCustomApproachChange,
    selectApproach,
    setApproachData,
    setCustomApproach
  }
}
