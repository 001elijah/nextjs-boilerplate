import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { useCampaignApproach } from '@/hooks/useCampaignApproach'
import { Category, ICampaignApproachStepProps } from '@/types'

export const CampaignApproachStep = ({ defaultValue, error, isLoading, step }: ICampaignApproachStepProps) => {
  const { approachData, customApproach, handleCustomApproachChange, selectApproach } = useCampaignApproach({ defaultValue, error, isLoading })

  const categories = step.categories as Category[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'singleSelect')
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput')

  const selectedOption = dropdownCategory?.options?.find(option => option.value === approachData)

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined approaches */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.title}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {selectedOption ? `${selectedOption.icon ?? ''} ${selectedOption.label}` : 'Select approach'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuItem key={option.id} onSelect={() => selectApproach(option.value)}>
                    {`${option.icon ?? ''} ${option.label}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Custom approach input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{customInputCategory.title}</label>
            <Input
              className="w-full"
              onChange={e => handleCustomApproachChange(e.target.value)}
              placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.title}
              value={customApproach}
            />
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={approachData} />
      </div>
    </div>
  )
}
