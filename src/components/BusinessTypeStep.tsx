import { ChangeEvent } from 'react'
import { PresetStepTitle } from '@/components/PresetStepTitle'
import { Step } from '@/types'

export const BusinessTypeStep = ({
  businessType,
  onChange,
  step
}: {
  businessType: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  step: Step
}) => {
  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />
      <div className="grid gap-2">
        {step.options?.map(option => (
          <label
            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-foreground hover:text-background cursor-pointer transition-colors"
            key={option.id}
          >
            <input
              checked={businessType === option.value}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              name={step.id}
              onChange={onChange}
              type="radio"
              value={option.value}
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
