'use client'

import { useEffect, useState } from 'react'
import { ICampaignTemperatureStepProps } from '@/types'

export const useCampaignTemperature = ({ defaultValue, error, isLoading }: Omit<ICampaignTemperatureStepProps, 'step'>) => {
  const [temperatureData, setTemperatureData] = useState<ICampaignTemperatureStepProps['defaultValue']>(defaultValue)
  const [customTemperature, setCustomTemperature] = useState<string>('')

  useEffect(() => {
    setTemperatureData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setTemperatureData(defaultValue)
      setCustomTemperature('')
    }
  }, [isLoading, error, defaultValue])

  const selectTemperature = (temperature: string) => {
    setTemperatureData(temperature)
    setCustomTemperature('')
  }

  const handleCustomTemperatureChange = (temperature: string) => {
    setCustomTemperature(temperature)
    setTemperatureData(temperature.trim().toLowerCase())
  }

  return {
    customTemperature,
    handleCustomTemperatureChange,
    selectTemperature,
    setCustomTemperature,
    setTemperatureData,
    temperatureData
  }
}
