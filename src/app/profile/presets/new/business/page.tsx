// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { CreateBusinessPreset } from '@/views'

export default async function CreateBusinessPresetPage() {
  const { PROFILE } = folderPaths
  const { business } = getDataAction(PROFILE)

  return <CreateBusinessPreset business={business} />
}
