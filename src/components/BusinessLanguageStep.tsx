import { ChevronDownIcon } from 'lucide-react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, PresetStepTitle } from '@/components'
import { useBusinessLanguage } from '@/hooks/useBusinessLanguage'
import { Category, IBusinessFormState, LanguageData, Step } from '@/types'

interface BusinessLanguageStepProps {
  defaultValue: LanguageData
  error: IBusinessFormState['error']
  isLoading: boolean
  step: Step
}

export const BusinessLanguageStep = ({ defaultValue, error, isLoading, step }: BusinessLanguageStepProps) => {
  const { customLanguage, handleCustomLanguageChange, languageData, selectLanguage } = useBusinessLanguage({ defaultValue, error, isLoading })

  const categories = step.categories as Category[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'singleSelect')
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput')

  const selectedOption = dropdownCategory?.options?.find(option => option.value === languageData)

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined languages */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.title}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {selectedOption ? `${selectedOption.icon ?? ''} ${selectedOption.label}` : 'Select language'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuItem key={option.id} onSelect={() => selectLanguage(option.value)}>
                    {`${option.icon ?? ''} ${option.label}`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Custom language input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{customInputCategory.title}</label>
            <Input
              className="w-full"
              onChange={e => handleCustomLanguageChange(e.target.value)}
              placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.title}
              value={customLanguage}
            />
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={languageData} />
      </div>
    </div>
  )
}
