import { Input, PresetStepTitle } from '@/components'
import { BusinessTitle, Step } from '@/types'

export const BusinessTitleStep = ({ defaultValue, step }: { defaultValue: BusinessTitle; step: Step }) => {
  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />
      <Input defaultValue={defaultValue} id={step.id} name={step.id} placeholder="Business name" required type="text" />
    </div>
  )
}
