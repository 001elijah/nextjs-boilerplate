'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import { PromotionsData } from '@/types'

export const useBusinessPromotions = ({ defaultValue }: { defaultValue: PromotionsData }) => {
  const [promotionsData, setPromotionsData] = useState<PromotionsData>(defaultValue)
  const [customPromotion, setCustomPromotion] = useState<string>('')

  useEffect(() => {
    setPromotionsData(defaultValue)
  }, [defaultValue])

  const addPromotion = (promotion: string) => {
    if (promotion.trim() && !promotionsData.includes(promotion.trim())) {
      setPromotionsData(prev => [...prev, promotion.trim()])
    }
  }

  const removePromotion = (promotionToRemove: string) => {
    setPromotionsData(prev => prev.filter(promotion => promotion !== promotionToRemove))
  }

  const togglePromotion = (promotion: string) => {
    setPromotionsData(prev => (prev.includes(promotion) ? prev.filter(r => r !== promotion) : [...prev, promotion]))
  }

  const resetPromotionsState = () => {
    setPromotionsData(defaultValue)
    setCustomPromotion('')
  }

  const handleCustomPromotionAdd = () => {
    if (customPromotion.trim() && !promotionsData.includes(customPromotion.trim())) {
      addPromotion(customPromotion.trim().toLowerCase())
      setCustomPromotion('')
    }
  }

  const handleCustomPromotionKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCustomPromotionAdd()
    }
  }

  return {
    addPromotion,
    customPromotion,
    handleCustomPromotionAdd,
    handleCustomPromotionKeyPress,
    promotionsData,
    removePromotion,
    resetPromotionsState,
    setCustomPromotion,
    setPromotionsData,
    togglePromotion
  }
}
