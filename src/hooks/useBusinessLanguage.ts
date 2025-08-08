'use client'

import { useEffect, useState } from 'react'
import { IBusinessFormState, LanguageData } from '@/types'

interface UseBusinessLanguageProps {
  defaultValue: LanguageData
  error: IBusinessFormState['error']
  isLoading: boolean
}

export const useBusinessLanguage = ({ defaultValue, error, isLoading }: UseBusinessLanguageProps) => {
  const [languageData, setLanguageData] = useState<LanguageData>(defaultValue)
  const [customLanguage, setCustomLanguage] = useState<string>('')

  useEffect(() => {
    setLanguageData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setLanguageData(defaultValue)
      setCustomLanguage('')
    }
  }, [isLoading, error, defaultValue])

  const selectLanguage = (language: string) => {
    setLanguageData(language)
    setCustomLanguage('')
  }

  const handleCustomLanguageChange = (language: string) => {
    setCustomLanguage(language)
    setLanguageData(language.trim().toLowerCase())
  }

  return {
    customLanguage,
    handleCustomLanguageChange,
    languageData,
    selectLanguage,
    setCustomLanguage,
    setLanguageData
  }
}
