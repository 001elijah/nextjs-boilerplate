import { Box, Megaphone, Pencil, Plus, Tag, Trash2 } from 'lucide-react'
import { Button, CardBorder, Container, Section, SectionTitle } from '@/components'

type Preset = {
  description: string
  platform: string
  tags: string[]
  title: string
  type: PresetType
}

type PresetType = 'Campaign' | 'Content'

const presets: Preset[] = [
  {
    description: 'A template for our weekly Q&A sessions, including branding and common hashtags.',
    platform: 'Instagram',
    tags: ['Community', 'Q&A', 'Weekly'],
    title: 'Weekly Q&A Post',
    type: 'Content'
  },
  {
    description: 'Standard setup for new product launch campaigns, targeting our primary audience.',
    platform: 'Facebook & Instagram',
    tags: ['Launch', 'Marketing', 'Sales'],
    title: 'New Product Launch',
    type: 'Campaign'
  },
  {
    description: 'A simple, eye-catching template for sharing daily tips and tricks.',
    platform: 'Facebook',
    tags: ['Tips', 'Daily Content', 'Education'],
    title: 'Daily Tips Graphic',
    type: 'Content'
  },
  {
    description: 'Preset for holiday promotions, includes ad copy, audience, and budget suggestions.',
    platform: 'All Platforms',
    tags: ['Holiday', 'Promo', 'Sales'],
    title: 'Holiday Sale Campaign',
    type: 'Campaign'
  }
]

const typeStyles: Record<PresetType, string> = {
  Campaign: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Content: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}

const PresetTypeBadge = ({ type }: { type: PresetType }) => (
  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${typeStyles[type]}`}>{type}</span>
)

export default function PresetsPage() {
  return (
    <Section ariaLabel="Presets" className="py-8" id="presets">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Presets" sectionTitle="Content & Campaign Presets" />
          <Button className="border-gold font-bold text-foreground hover:bg-gold" variant="outline">
            <Plus className="-ml-1 mr-2 size-4" />
            Create Preset
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {presets.map((preset, index) => (
            <CardBorder className="items-start border-gold/50 bg-background/30 p-6" key={index}>
              <div className="flex w-full items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{preset.title}</h3>
                <PresetTypeBadge type={preset.type} />
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
                {preset.type === 'Content' ? <Box className="size-4" /> : <Megaphone className="size-4" />}
                <span>{preset.platform}</span>
              </div>
              <p className="my-4 text-sm text-foreground/80">{preset.description}</p>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Tag className="size-4 text-foreground/60" />
                {preset.tags.map(tag => (
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
          ))}
        </div>
      </Container>
    </Section>
  )
}
