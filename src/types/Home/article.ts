export interface ArticleBodyType {
  conclusion: string
  heading: string
  text: string | string[]
}

export interface ArticleDataType {
  body: ArticleBodyType[]
  buttonText?: string
  conclusion: string | string[]
  heading: string
  hook: string
}

export interface ArticleProps {
  article: ArticleDataType
}
