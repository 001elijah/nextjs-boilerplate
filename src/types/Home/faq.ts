export interface FaqDataType {
  faq: FaqItemType[]
  heading: string
}

export interface FaqItemType {
  answer: string
  question: string
}

export interface FaqProps {
  faq: FaqDataType
}
