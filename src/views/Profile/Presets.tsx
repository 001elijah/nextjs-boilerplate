import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button, Container, PresetCard, Section, SectionTitle } from '@/components'
import { PresetType } from '@/components/PresetTypeBadge'

type Preset = {
  description: string
  platform: string
  tags: string[]
  title: string
  type: PresetType
}

const presetItems: Preset[] = [
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

export const Presets = () => {
  return (
    <Section ariaLabel="Presets" className="py-8" id="presets">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Presets" sectionTitle="Content & Campaign Presets" />
          <Link href="/profile/presets/create">
            <Button className="border-gold font-bold text-foreground hover:bg-gold" type="submit" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              Create Preset
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {presetItems.map((presetData, index) => (
            <PresetCard key={index} presetData={presetData} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
