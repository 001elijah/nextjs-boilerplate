'use client'

import { useState } from 'react'
import { BusinessCategory, BusinessSubcategoryOption } from '@/types'

export const useBusinessCategory = () => {
  const [businessCategoryOptionValue, setBusinessCategoryOptionValue] = useState<BusinessSubcategoryOption['value']>('smm')
  const [selectedMainCategory, setSelectedMainCategory] = useState<BusinessCategory['value'] | null>(null)
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set())

  const resetCategoryState = () => {
    setSelectedMainCategory(null)
    setBusinessCategoryOptionValue('smm')
    setExpandedSubcategories(new Set())
  }

  return {
    businessCategoryOptionValue,
    expandedSubcategories,
    resetCategoryState,
    selectedMainCategory,
    setBusinessCategoryOptionValue,
    setExpandedSubcategories,
    setSelectedMainCategory
  }
}
