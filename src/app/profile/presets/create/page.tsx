// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { CreatePreset } from '@/views'

export default async function CreatePresetPage() {
  const { PROFILE } = folderPaths
  const { presets } = getDataAction(PROFILE)

  return <CreatePreset presets={presets} />
}
