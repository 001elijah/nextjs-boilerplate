'use client'

import { useState } from 'react'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { SubcategoryHeader } from '@/components/SubcategoryHeader'
import { CustomerData, Step } from '@/types'

interface BusinessCustomerStepProps {
  customerData: CustomerData
  onChange?: (categoryId: string, value: string) => void
  step: Step
}

export const BusinessCustomerStep = ({ customerData, onChange, step }: BusinessCustomerStepProps) => {
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set())
  const [customValues, setCustomValues] = useState<Record<string, string>>({})
  const [selectedOtherOptions, setSelectedOtherOptions] = useState<Set<string>>(new Set())

  const handleInputChange = (categoryId: string, value: string) => {
    // Remove from selectedOtherOptions if selecting a predefined option
    setSelectedOtherOptions(prev => {
      const newSet = new Set(prev)
      newSet.delete(categoryId)
      return newSet
    })

    if (onChange) {
      onChange(categoryId, value)
    }
  }

  const handleCustomInputChange = (categoryId: string, value: string) => {
    setCustomValues(prev => ({
      ...prev,
      [categoryId]: value
    }))
    if (onChange) {
      onChange(categoryId, value)
    }
  }

  const handleOtherOptionSelect = (categoryId: string) => {
    // Mark this category as having "other" selected
    setSelectedOtherOptions(prev => new Set([categoryId, ...prev]))

    // Set the value to the current custom value or empty string
    const customValue = customValues[categoryId] || ''
    if (onChange) {
      onChange(categoryId, customValue)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <PresetStepTitle question={step.question || ''} title={step.title} />
      {step?.categories?.map(category => {
        const isExpanded = expandedSubcategories.has(category.id)
        const currentValue = customerData[category.id as keyof CustomerData]
        const customValue = customValues[category.id] || ''
        const isOtherSelected = selectedOtherOptions.has(category.id)

        return (
          <div className="border rounded-lg" key={category.id}>
            <SubcategoryHeader isExpanded={isExpanded} setExpandedSubcategories={setExpandedSubcategories} subcategory={category} />
            {!isExpanded && (
              <div className="border-t px-3 pb-3">
                <div className="grid gap-2 pt-2">
                  {category?.options?.map(option => {
                    const isOtherOption = option.id === 'other'
                    // Simplified selection logic
                    const isSelected = isOtherOption ? isOtherSelected : currentValue === option.value

                    return (
                      <div className="flex flex-col gap-2" key={option.id}>
                        <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-foreground hover:text-background cursor-pointer transition-colors">
                          <input
                            checked={isSelected}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            name={category.id}
                            onChange={() => {
                              if (isOtherOption) {
                                handleOtherOptionSelect(category.id)
                              } else {
                                handleInputChange(category.id, option.value)
                              }
                            }}
                            type="radio"
                            value={isOtherOption ? customValue : option.value}
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                        {/* Show text input when "other" option is selected */}
                        {isOtherOption && isSelected && (
                          <div className="ml-7">
                            <input
                              autoFocus
                              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              name={category.id}
                              onChange={e => handleCustomInputChange(category.id, e.target.value)}
                              placeholder={option.inputType === 'textInput' ? option.placeholder : 'Enter your option'}
                              type="text"
                              value={customValue}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
