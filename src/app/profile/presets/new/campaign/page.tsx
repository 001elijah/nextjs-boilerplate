// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { CreateCampaignPreset } from '@/views'

export default function CreateCampaignPage() {
  const { PROFILE } = folderPaths
  const { campaigns } = getDataAction(PROFILE)

  return <CreateCampaignPreset campaigns={campaigns} />
}
