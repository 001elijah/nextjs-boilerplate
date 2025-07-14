import { CampaignAddForm } from '@/components'
import { ICampaignsProps } from '@/types'

export const CreateCampaign = ({ campaigns }: ICampaignsProps) => {
  return <CampaignAddForm campaigns={campaigns} />
}
