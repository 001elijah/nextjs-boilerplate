export interface QuizDataType {
  quiz: {
    nextButtonText: string
    steps: QuizStepType[]
  }
}

export interface QuizOptionType {
  icon: string
  text: string
}

export type QuizSelectedOptionsType = Record<number, QuizOptionType['text'] | QuizOptionType['text'][]>

export type QuizStepType = FinalStepType | QuestionStepType

interface BaseQuizStepType {
  step: number
  title: string
}

interface FinalStepType extends BaseQuizStepType {
  button: QuizButtonType
  description: string
  final: true
  options?: never
  question?: never
}

interface QuestionStepType extends BaseQuizStepType {
  final?: never
  multiSelect?: boolean
  options: QuizOptionType[]
  question: string
}

interface QuizButtonType {
  icon: string
  text: string
}
