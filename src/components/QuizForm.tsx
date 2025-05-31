'use client'

import { isEmpty, size } from 'lodash'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/Button'
import { CardBorder } from '@/components/CardBorder'
import { ProgressBar } from '@/components/ProgressBar'
import { QuizOption } from '@/components/QuizOption'
import { QuizDataType, QuizOptionType, QuizSelectedOptionsType, QuizStepType } from '@/types'

export const QuizForm = ({ quiz }: QuizDataType) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<QuizSelectedOptionsType>({})
  if (!quiz || !quiz.steps || size(quiz.steps) === 0) {
    return null
  }

  const totalSteps = size(quiz.steps)
  const activeStepData: QuizStepType = quiz.steps[currentStep]

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const processSubmit = () => {
    console.log('Quiz submitted with answers:', selectedOptions)
    alert('Quiz submitted!')
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (activeStepData.final) {
      processSubmit()
    } else if (isStepComplete()) {
      handleNext()
    }
  }

  const handleInputChange = (optionText: QuizOptionType['text']) => {
    setSelectedOptions(prev => {
      const currentSelection = prev[currentStep]
      if (!activeStepData.final && activeStepData.multiSelect) {
        const newSelection = Array.isArray(currentSelection) ? [...currentSelection] : []
        const optionIndex = newSelection.indexOf(optionText)
        if (optionIndex > -1) {
          newSelection.splice(optionIndex, 1) // Deselect if already selected
        } else {
          newSelection.push(optionText) // Select if not selected
        }
        return { ...prev, [currentStep]: newSelection }
      }
      // For single select (radio button behavior)
      return { ...prev, [currentStep]: optionText }
    })
  }

  const isStepComplete = () => {
    const currentSelection = selectedOptions[currentStep]
    if (!activeStepData.final && activeStepData.multiSelect) {
      return Array.isArray(currentSelection) && !isEmpty(currentSelection)
    }
    return !!currentSelection // For a single select, any selection is enough
  }

  const questionOptions = !activeStepData.final && activeStepData.options ? (activeStepData.options as QuizOptionType[]) : []
  return (
    <form onSubmit={handleFormSubmit}>
      <CardBorder className="p-8 h-[calc(100vh-250px)] md:h-[calc(100vh-200px)]">
        <div className="w-full h-full flex flex-col justify-between text-center">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <h2 className="mb-2 text-2xl font-semibold">{activeStepData.title.toUpperCase()}</h2>
          {activeStepData.final ? (
            <p className="mb-6 text-gold text-xl">{activeStepData.description}</p>
          ) : (
            <p className="mb-6 text-gold">{activeStepData.question}</p>
          )}
          {!activeStepData.final && !isEmpty(questionOptions) && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 overflow-auto mb-6">
              {questionOptions.map((option, index) => (
                <QuizOption
                  activeStepData={activeStepData}
                  currentStep={currentStep}
                  key={index}
                  onChange={handleInputChange}
                  option={option}
                  selectedOptions={selectedOptions}
                />
              ))}
            </div>
          )}

          <div>
            {activeStepData.final ? (
              <Button size="lg" type="submit">
                {activeStepData.button.icon && <span className="mr-2">{activeStepData.button.icon}</span>}
                {activeStepData.button.text}
              </Button>
            ) : (
              <Button disabled={!isStepComplete()} onClick={handleNext} size="lg" type="button">
                {quiz.nextButtonText || 'Next'}
              </Button>
            )}
          </div>
        </div>
      </CardBorder>
    </form>
  )
}
