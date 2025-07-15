import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { useCampaignGoal } from '@/hooks/useCampaignGoal'
import { ICampaignFormCategory, ICampaignGoalStepProps, ICampaignOtherFormCategory } from '@/types'

export const CampaignGoalStep = ({ defaultValue, error, isLoading, step }: ICampaignGoalStepProps) => {
  const { customGoal, goalData, handleCustomGoalChange, selectGoal } = useCampaignGoal({ defaultValue, error, isLoading })

  const categories = step.categories as (ICampaignFormCategory | ICampaignOtherFormCategory)[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'singleSelect') as ICampaignFormCategory | undefined
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput') as ICampaignOtherFormCategory | undefined

  const selectedOption = dropdownCategory?.options?.find(option => option.value === goalData)

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined goals */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.label}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {selectedOption ? `${selectedOption.icon ?? ''} ${selectedOption.label}` : 'Select goal'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuItem key={option.id} onSelect={() => selectGoal(option.value)}>
                    {`${option.icon ?? ''} ${option.label}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Custom goal input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {customInputCategory.icon} {customInputCategory.label}
            </label>
            <Input
              className="w-full"
              onChange={e => handleCustomGoalChange(e.target.value)}
              placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.label}
              value={customGoal}
            />
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={goalData} />
      </div>
    </div>
  )
}
