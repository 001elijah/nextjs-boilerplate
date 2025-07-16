'use client'

import { useEffect, useState } from 'react'
import { ICampaignToneStepProps } from '@/types'

export const useCampaignTone = ({ defaultValue, error, isLoading }: Omit<ICampaignToneStepProps, 'step'>) => {
  const [toneData, setToneData] = useState<ICampaignToneStepProps['defaultValue']>(defaultValue)
  const [customTone, setCustomTone] = useState<string>('')

  useEffect(() => {
    setToneData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setToneData(defaultValue)
      setCustomTone('')
    }
  }, [isLoading, error, defaultValue])

  const selectTone = (tone: string) => {
    setToneData(tone)
    setCustomTone('')
  }

  const handleCustomToneChange = (tone: string) => {
    setCustomTone(tone)
    setToneData(tone.trim().toLowerCase())
  }

  return {
    customTone,
    handleCustomToneChange,
    selectTone,
    setCustomTone,
    setToneData,
    toneData
  }
}
