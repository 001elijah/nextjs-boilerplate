'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import { RegionsData } from '@/types'

export const useBusinessRegions = ({ defaultValue }: { defaultValue: RegionsData }) => {
  const [regionsData, setRegionsData] = useState<RegionsData>(defaultValue)
  const [customRegion, setCustomRegion] = useState<string>('')

  useEffect(() => {
    setRegionsData(defaultValue)
  }, [defaultValue])

  const addRegion = (region: string) => {
    if (region.trim() && !regionsData.includes(region.trim())) {
      setRegionsData(prev => [...prev, region.trim()])
    }
  }

  const removeRegion = (regionToRemove: string) => {
    setRegionsData(prev => prev.filter(region => region !== regionToRemove))
  }

  const toggleRegion = (region: string) => {
    setRegionsData(prev => (prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]))
  }

  const resetRegionsState = () => {
    setRegionsData(defaultValue)
    setCustomRegion('')
  }

  const handleCustomRegionAdd = () => {
    if (customRegion.trim() && !regionsData.includes(customRegion.trim())) {
      addRegion(customRegion.trim().toLowerCase())
      setCustomRegion('')
    }
  }

  const handleCustomRegionKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCustomRegionAdd()
    }
  }

  return {
    addRegion,
    customRegion,
    handleCustomRegionAdd,
    handleCustomRegionKeyPress,
    regionsData,
    removeRegion,
    resetRegionsState,
    setCustomRegion,
    setRegionsData,
    toggleRegion
  }
}
