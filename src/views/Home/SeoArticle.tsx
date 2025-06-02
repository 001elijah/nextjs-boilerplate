import { Container, Section, SectionHook, SectionText, SectionTitle, SeoArticleBodyItem } from '@/components'
import { SeoArticleProps } from '@/types'

export const SeoArticle = ({ seoArticle }: SeoArticleProps) => {
  return (
    <>
      {seoArticle && (
        <Section ariaLabel={seoArticle.heading || 'SEO Article'} id="seo-article">
          <Container>
            <SectionTitle fallbackTitle={'SEO Article'} sectionTitle={seoArticle.heading} />
            <SectionHook sectionHook={seoArticle.hook} />
            {seoArticle.body.map((bodyItem, bodyIndex) => {
              return <SeoArticleBodyItem bodyIndex={bodyIndex} bodyItem={bodyItem} key={`body-item-${bodyIndex}`} />
            })}
            {typeof seoArticle.conclusion === 'string' ? (
              <SectionText className="text-lg md:text-xl text-muted-foreground">{seoArticle.conclusion}</SectionText>
            ) : (
              seoArticle.conclusion.map((paragraph, conclusionIndex) => {
                return (
                  <SectionText className="text-lg md:text-xl text-muted-foreground" key={`conclusion-p-${conclusionIndex}`}>
                    {paragraph}
                  </SectionText>
                )
              })
            )}
          </Container>
        </Section>
      )}
    </>
  )
}
