// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { AdBrowser } from '@/views'

export default function History() {
  const { HISTORY } = folderPaths
  const { ads } = getDataAction(HISTORY)

  return <AdBrowser ads={ads} />
}
