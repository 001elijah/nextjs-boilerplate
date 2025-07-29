import { SectionTitle } from '@/components'
import { BusinessPresets, CampaignPresets } from '@/views'

export default function PresetsPage() {
  return (
    <>
      <SectionTitle fallbackTitle="Content & Campaign & Business Presets" sectionTitle="Content & Campaign & Business Presets" />
      <CampaignPresets />
      <BusinessPresets />
    </>
  )
}
