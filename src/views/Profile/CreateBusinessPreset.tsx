import { BusinessPresetAddForm } from '@/components'
import { BusinessFormProps } from '@/types'

export const CreateBusinessPreset = ({ business }: BusinessFormProps) => {
  return <BusinessPresetAddForm business={business} />
}
