'use client'

import { ChevronDownIcon, X } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/Button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { useBusinessPromotions } from '@/hooks/useBusinessPromotions'
import { Category, PromotionsData, Step } from '@/types'

interface BusinessPromotionsStepProps {
  defaultValue: PromotionsData
  onPromotionsChange: (promotions: PromotionsData) => void
  step: Step
}

export const BusinessPromotionsStep = ({ defaultValue, onPromotionsChange, step }: BusinessPromotionsStepProps) => {
  const { customPromotion, handleCustomPromotionAdd, handleCustomPromotionKeyPress, promotionsData, removePromotion, setCustomPromotion, togglePromotion } =
    useBusinessPromotions({
      defaultValue
    })

  useEffect(() => {
    onPromotionsChange(promotionsData)
  }, [promotionsData, onPromotionsChange])

  const categories = step.categories as Category[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'multiSelect')
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput')

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined promotions */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.title}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {promotionsData.length > 0 ? `${promotionsData.length} promotion${promotionsData.length > 1 ? 's' : ''} selected` : 'Select promotions'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuCheckboxItem
                    checked={promotionsData.includes(option.value)}
                    key={option.id}
                    onCheckedChange={() => togglePromotion(option.value)}
                    onSelect={e => e.preventDefault()}
                  >
                    {`${option.icon} ${option.label}`}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Custom promotion input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{customInputCategory.title}</label>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                onChange={e => setCustomPromotion(e.target.value)}
                onKeyDown={handleCustomPromotionKeyPress}
                placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.title}
                value={customPromotion}
              />
              <Button disabled={!customPromotion.trim()} onClick={handleCustomPromotionAdd} type="button">
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Selected promotions display */}
        {promotionsData.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Selected Promotions:</label>
            <div className="flex flex-wrap gap-2">
              {promotionsData.map(promotion => (
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm" key={promotion}>
                  <span>
                    {promotion
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')}
                  </span>{' '}
                  <button className="text-muted-foreground hover:text-foreground" onClick={() => removePromotion(promotion)} type="button">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={JSON.stringify(promotionsData)} />
      </div>
    </div>
  )
}
