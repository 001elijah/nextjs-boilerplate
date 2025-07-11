'use client'

import { ChevronDownIcon, X } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/Button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { useBusinessChannels } from '@/hooks/useBusinessChannels'
import { Category, ChannelsData, Step } from '@/types'

interface BusinessChannelsStepProps {
  defaultValue: ChannelsData
  onChannelsChange: (channels: ChannelsData) => void
  step: Step
}

export const BusinessChannelsStep = ({ defaultValue, onChannelsChange, step }: BusinessChannelsStepProps) => {
  const { channelsData, customChannel, handleCustomChannelAdd, handleCustomChannelKeyPress, removeChannel, setCustomChannel, toggleChannel } =
    useBusinessChannels({
      defaultValue
    })

  useEffect(() => {
    onChannelsChange(channelsData)
  }, [channelsData, onChannelsChange])

  const categories = step.categories as Category[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'multiSelect')
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput')

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined channels */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.title}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {channelsData.length > 0 ? `${channelsData.length} region${channelsData.length > 1 ? 's' : ''} selected` : 'Select channels'}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-48">
                {dropdownCategory.options?.map(option => (
                  <DropdownMenuCheckboxItem
                    checked={channelsData.includes(option.value)}
                    key={option.id}
                    onCheckedChange={() => toggleChannel(option.value)}
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
                onChange={e => setCustomChannel(e.target.value)}
                onKeyDown={handleCustomChannelKeyPress}
                placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.title}
                value={customChannel}
              />
              <Button disabled={!customChannel.trim()} onClick={handleCustomChannelAdd} type="button">
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Selected channels display */}
        {channelsData.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Selected Channels:</label>
            <div className="flex flex-wrap gap-2">
              {channelsData.map(region => (
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm" key={region}>
                  <span>
                    {region
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')}
                  </span>{' '}
                  <button className="text-muted-foreground hover:text-foreground" onClick={() => removeChannel(region)} type="button">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden input for form submission */}
        <input name={step.id} type="hidden" value={JSON.stringify(channelsData)} />
      </div>
    </div>
  )
}
