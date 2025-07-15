import { ChevronDownIcon, X } from 'lucide-react'
import { Button } from '@/components/Button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { useCampaignChannels } from '@/hooks/useCampaignChannels'
import { ICampaignChannelsStepProps, ICampaignFormCategory, ICampaignOtherFormCategory } from '@/types'

export const CampaignChannelsStep = ({ defaultValue, error, isLoading, step }: ICampaignChannelsStepProps) => {
  const { channelsData, customChannel, handleCustomChannelAdd, handleCustomChannelKeyPress, removeChannel, setCustomChannel, toggleChannel } =
    useCampaignChannels({
      defaultValue,
      error,
      isLoading
    })

  const categories = step.categories as (ICampaignFormCategory | ICampaignOtherFormCategory)[]
  const dropdownCategory = categories?.find(cat => cat.inputType === 'multiSelect') as ICampaignFormCategory | undefined
  const customInputCategory = categories?.find(cat => cat.inputType === 'textInput') as ICampaignOtherFormCategory | undefined

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dropdown for predefined channels */}
        {dropdownCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{dropdownCategory.label}</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant="outline">
                  {channelsData.length > 0 ? `${channelsData.length} channel${channelsData.length > 1 ? 's' : ''} selected` : dropdownCategory.label}
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

        {/* Custom channel input */}
        {customInputCategory && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              {customInputCategory.icon} {customInputCategory.label}
            </label>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                onChange={e => setCustomChannel(e.target.value)}
                onKeyDown={handleCustomChannelKeyPress}
                placeholder={('placeholder' in customInputCategory ? customInputCategory.placeholder : undefined) || customInputCategory.label}
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
              {channelsData.map(channel => (
                <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm" key={channel}>
                  <span>
                    {channel
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')}
                  </span>{' '}
                  <button className="text-muted-foreground hover:text-foreground" onClick={() => removeChannel(channel)} type="button">
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
