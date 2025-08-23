// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { AdGenerator } from '@/views'

export default function Dashboard() {
  const { DASHBOARD } = folderPaths
  const { adGenerator } = getDataAction(DASHBOARD)
  return <AdGenerator adGenerator={adGenerator} />
}
