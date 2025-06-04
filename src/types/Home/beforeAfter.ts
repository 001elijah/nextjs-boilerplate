export interface BeforeAfterClientType {
  business: string
  comment: string
  imageSrc: string
  strategy: string
}

export interface BeforeAfterDataType {
  buttonText: string
  clients: {
    after: BeforeAfterClientType[]
    before: BeforeAfterClientType[]
  }
}

export interface BeforeAfterProps {
  beforeAfter: BeforeAfterDataType
}
