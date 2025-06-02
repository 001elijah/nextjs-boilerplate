export interface SeoArticleBodyType {
  conclusion: string
  heading: string
  text: string | string[]
}

export interface SeoArticleDataType {
  body: SeoArticleBodyType[]
  conclusion: string | string[]
  heading: string
  hook: string
}

export interface SeoArticleProps {
  seoArticle: SeoArticleDataType
}
