import { CardBorder } from '@/components'
import { cn } from '@/lib/utils'
import { QuizOptionType, QuizSelectedOptionsType, QuizStepType } from '@/types'

export const QuizOption = ({
  activeStepData,
  currentStep,
  onChange,
  option,
  selectedOptions
}: {
  activeStepData: QuizStepType
  currentStep: number
  onChange: (optionText: QuizOptionType['text']) => void
  option: QuizOptionType
  selectedOptions: QuizSelectedOptionsType
}) => {
  const inputId = `step-${currentStep}-option-${option.text.replace(/\s+/g, '-')}`
  let isChecked: boolean
  if ('multiSelect' in activeStepData && activeStepData?.multiSelect) {
    isChecked = Array.isArray(selectedOptions[currentStep]) && (selectedOptions[currentStep] as string[]).includes(option.text)
  } else {
    isChecked = selectedOptions[currentStep] === option.text
  }
  return (
    <CardBorder className={cn('cursor-pointer p-0 text-left transition-all hover:shadow-md', isChecked && 'border-primary')}>
      <label className="flex w-full cursor-pointer items-center p-4" htmlFor={inputId}>
        <input
          checked={isChecked}
          className="mr-3 h-5 w-5 cursor-pointer text-primary focus:ring-primary"
          id={inputId}
          name={`step-${currentStep}-option`}
          onChange={() => onChange(option.text)}
          type={'multiSelect' in activeStepData && activeStepData?.multiSelect ? 'checkbox' : 'radio'}
          value={option.text}
        />
        <span className="mr-3 text-2xl">{option.icon}</span>
        <span>{option.text}</span>
      </label>
    </CardBorder>
  )
}
