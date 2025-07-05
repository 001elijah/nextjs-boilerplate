import { PresetAddForm } from '@/components'
import { PresetsProps } from '@/types'

export const CreatePreset = ({ presets }: PresetsProps) => {
  return <PresetAddForm presets={presets} />
}
