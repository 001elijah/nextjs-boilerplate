'use client'

import { useEffect, useState } from 'react'
import { PresetFormState, ToneData } from '@/types'

interface UseBusinessToneProps {
  defaultValue: ToneData
  error: PresetFormState['error']
  isLoading: boolean
}

export const useBusinessTone = ({ defaultValue, error, isLoading }: UseBusinessToneProps) => {
  const [toneData, setToneData] = useState<ToneData>(defaultValue)
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
