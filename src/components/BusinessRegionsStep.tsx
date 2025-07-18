'use client'

import { ChevronDownIcon, X } from 'lucide-react'
import { useEffect } from 'react'
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, Input, PresetStepTitle } from '@/components'
import { useBusinessRegions } from '@/hooks/useBusinessRegions'
import { Category, RegionsData, Step } from '@/types'

interface BusinessRegionsStepProps {
  defaultValue: RegionsData
  onRegionsChange: (regions: RegionsData) => void
  step: Step
}

export const BusinessRegionsStep = ({ defaultValue, onRegionsChange, step }: BusinessRegionsStepProps) => {
  const { customRegion, handleCustomRegionAdd, handleCustomRegionKeyPress, regionsData, removeRegion, setCustomRegion, toggleRegion } = useBusinessRegions({
    defaultValue
  })

  useEffect(() => {
    onRegionsChange(regionsData)
  }, [regionsData, onRegionsChange])

  const categories = step.categories as Category[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'multiSelect')
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput')

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined regions */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.title}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {regionsData.length > 0 ? `${regionsData.length} region${regionsData.length > 1 ? 's' : ''} selected` : 'Select regions'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuCheckboxItem
                    checked={regionsData.includes(option.value)}
                    key={option.id}
                    onCheckedChange={() => toggleRegion(option.value)}
                    onSelect={e => e.preventDefault()}
                  >
                    {`${option.icon} ${option.label}`}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Custom region input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{customInputCategory.title}</label>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                onChange={e => setCustomRegion(e.target.value)}
                onKeyDown={handleCustomRegionKeyPress}
                placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.title}
                value={customRegion}
              />
              <Button disabled={!customRegion.trim()} onClick={handleCustomRegionAdd} type="button">
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Selected regions display */}
        {regionsData.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Selected Regions:</label>
            <div className="flex flex-wrap gap-2">
              {regionsData.map(region => (
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm" key={region}>
                  <span>
                    {region
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')}
                  </span>{' '}
                  <button className="text-muted-foreground hover:text-foreground" onClick={() => removeRegion(region)} type="button">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={JSON.stringify(regionsData)} />
      </div>
    </div>
  )
}
