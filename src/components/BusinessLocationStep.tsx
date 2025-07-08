import { Input } from '@/components/Input'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { LocationData, Step } from '@/types'

interface BusinessLocationStepProps {
  defaultValue: LocationData
  step: Step
}

export const BusinessLocationStep = ({ defaultValue, step }: BusinessLocationStepProps) => {
  return (
    <div className="flex flex-col gap-4">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.categories?.map(category => {
          const currentValue = defaultValue[category.id as keyof LocationData]

          return (
            <Input
              defaultValue={currentValue}
              id={category.id}
              key={category.id}
              name={category.id}
              placeholder={('placeholder' in category ? category.placeholder : undefined) || category.title}
              required={category.id !== 'region'}
              type="text"
            />
          )
        })}
      </div>
    </div>
  )
}
