// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { CreateContentPreset } from '@/views'

export default function CreateCampaignPage() {
  const { PROFILE } = folderPaths
  const { contents } = getDataAction(PROFILE)

  return <CreateContentPreset contents={contents} />
}
