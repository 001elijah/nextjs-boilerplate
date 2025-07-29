import { Box, Megaphone, Pencil, Tag, Trash2 } from 'lucide-react'
import { Button, CardBorder, PresetType, PresetTypeBadge } from '@/components'

export const BusinessPresetCard = ({
  businessPresetData
}: {
  businessPresetData: { description: string; platform: string; tags: string[]; title: string; type: PresetType }
}) => {
  const { description, platform, tags, title, type } = businessPresetData
  return (
    <CardBorder className="items-start border-gold/50 bg-background/30 p-6">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <PresetTypeBadge type={type} />
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
        {type === 'Content' ? <Box className="size-4" /> : <Megaphone className="size-4" />}
        <span>{platform}</span>
      </div>
      <p className="my-4 text-sm text-foreground/80">{description}</p>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Tag className="size-4 text-foreground/60" />
        {tags.map(tag => (
          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground/80" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex w-full gap-4 pt-4">
        <Button size="sm" variant="outline">
          Use Preset
        </Button>
        <Button className="shrink-0" size="icon" variant="ghost">
          <Pencil className="size-4" />
        </Button>
        <Button className="shrink-0 hover:bg-destructive/10" size="icon" variant="ghost">
          <Trash2 className="size-4 text-destructive/80" />
        </Button>
      </div>
    </CardBorder>
  )
}
