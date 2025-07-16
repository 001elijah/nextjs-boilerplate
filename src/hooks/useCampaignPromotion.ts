'use client'

import { useEffect, useState } from 'react'
import { ICampaignPromotionStepProps } from '@/types'

export const useCampaignPromotion = ({ defaultValue, error, isLoading }: Omit<ICampaignPromotionStepProps, 'step'>) => {
  const [promotionData, setPromotionData] = useState<ICampaignPromotionStepProps['defaultValue']>(defaultValue)
  const [customPromotion, setCustomPromotion] = useState<string>('')

  useEffect(() => {
    setPromotionData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setPromotionData(defaultValue)
      setCustomPromotion('')
    }
  }, [isLoading, error, defaultValue])

  const selectPromotion = (promotion: string) => {
    setPromotionData(promotion)
    setCustomPromotion('')
  }

  const handleCustomPromotionChange = (promotion: string) => {
    setCustomPromotion(promotion)
    setPromotionData(promotion.trim().toLowerCase())
  }

  return {
    customPromotion,
    handleCustomPromotionChange,
    promotionData,
    selectPromotion,
    setCustomPromotion,
    setPromotionData
  }
}
