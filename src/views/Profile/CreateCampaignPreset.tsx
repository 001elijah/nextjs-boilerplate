import { CampaignPresetAddForm } from '@/components'
import { ICampaignsProps } from '@/types'

export const CreateCampaignPreset = ({ campaigns }: ICampaignsProps) => {
  return <CampaignPresetAddForm campaigns={campaigns} />
}
