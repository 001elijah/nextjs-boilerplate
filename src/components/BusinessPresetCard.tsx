import { Globe, MapPin, Megaphone, Mic, Tag, Trash2 } from 'lucide-react'
import { Button, CardBorder, PresetTypeBadge } from '@/components'
import { IBusinessResponseItem } from '@/views'

interface BusinessPresetCardProps {
  businessPresetData: IBusinessResponseItem
  deletingId: null | string
  onDelete: (businessId: string) => void
}

export const BusinessPresetCard = ({ businessPresetData, deletingId, onDelete }: BusinessPresetCardProps) => {
  const { category, channels, customer, language, location, name, promotions, tone, type } = businessPresetData

  const description = `A preset for a ${category} targeting ${customer.professionalType} who are ${customer.painPoint} ${customer.demographics}.`

  const platformString = channels.join(', ')

  return (
    <CardBorder className="items-start border-gold/50 bg-background/30 p-6">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        <PresetTypeBadge type={type} />
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
        <Megaphone className="size-4" />
        <span>{platformString}</span>
      </div>
      <p className="my-4 text-sm text-foreground/80" dangerouslySetInnerHTML={{ __html: description }}></p>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Tag className="size-4 text-foreground/60" />
        {promotions.map(tag => (
          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground/80" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-sm text-foreground/60">
        <div className="flex items-center gap-2">
          <MapPin className="size-4" />
          <span>
            {location.city}, {location.state}, {location.region}, {location.zip}, {location.country}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Mic className="size-4" />
          <span>Tone: {tone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="size-4" />
          <span>Language: {language}</span>
        </div>
      </div>
      <div className="mt-auto flex w-full gap-4 pt-4">
        <Button
          className="shrink-0 hover:bg-destructive/10"
          disabled={deletingId === businessPresetData.id}
          onClick={() => onDelete(businessPresetData.id)}
          size="icon"
          variant="ghost"
        >
          <Trash2 className="size-4 text-destructive/80" />
        </Button>
      </div>
    </CardBorder>
  )
}
