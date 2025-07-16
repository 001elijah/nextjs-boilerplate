import { ICampaignFormCategory, ICampaignOtherFormCategory, ICampaignPromotionStepProps } from '@/types'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Button } from '@/components/Button'
import { ChevronDownIcon } from 'lucide-react'
import { Input } from '@/components/Input'
import { useCampaignPromotion } from '@/hooks/useCampaignPromotion'

export const CampaignPromotionStep = ({ defaultValue, error, isLoading, step }: ICampaignPromotionStepProps) => {
  const { promotionData, customPromotion, handleCustomPromotionChange, selectPromotion } = useCampaignPromotion({ defaultValue, error, isLoading })

  const categories = step.categories as (ICampaignFormCategory | ICampaignOtherFormCategory)[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'singleSelect') as ICampaignFormCategory | undefined
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput') as ICampaignOtherFormCategory | undefined

  const selectedOption = dropdownCategory?.options?.find(option => option.value === promotionData)

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined promotions */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.label}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {selectedOption ? `${selectedOption.icon ?? ''} ${selectedOption.label}` : 'Select promotion'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuItem key={option.id} onSelect={() => selectPromotion(option.value)}>
                    {`${option.icon ?? ''} ${option.label}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Custom promotion input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {customInputCategory.icon} {customInputCategory.label}
            </label>
            <Input
              className="w-full"
              onChange={e => handleCustomPromotionChange(e.target.value)}
              placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.label}
              value={customPromotion}
            />
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={promotionData} />
      </div>
    </div>
  )
}
