import { Plus } from 'lucide-react'
import Link from 'next/link'
import { BusinessPresetCard, Button, Container, Section, SectionTitle } from '@/components'
import { PresetType } from '@/components/PresetTypeBadge'
import { routes } from '@/config'

type BusinessPreset = {
  description: string
  platform: string
  tags: string[]
  title: string
  type: PresetType
}

const businessPresetsItems: BusinessPreset[] = [
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

export const BusinessPresets = () => {
  return (
    <Section ariaLabel="Business Presets" className="py-8" id="business-presets">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Business Presets" sectionTitle="Business Presets" />
          <Link href={routes.profile.presets.new.business}>
            <Button className="border-gold font-bold text-foreground hover:bg-gold" type="submit" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              Create Business Preset
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {businessPresetsItems.map((presetData, index) => (
            <BusinessPresetCard businessPresetData={presetData} key={index} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
