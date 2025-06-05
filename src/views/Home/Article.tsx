import { ArticleBodyItem, Button, Container, Section, SectionHook, SectionText, SectionTitle } from '@/components'
import { ArticleProps } from '@/types'

export const Article = ({ article }: ArticleProps) => {
  const { body, buttonText, conclusion, heading, hook } = article
  return (
    <>
      {article && (
        <Section ariaLabel={heading || 'SEO Article'} id="seo-article">
          <Container>
            <SectionTitle fallbackTitle={'SEO Article'} sectionTitle={heading} />
            <SectionHook sectionHook={hook} />
            {body.map((bodyItem, bodyIndex) => {
              return <ArticleBodyItem bodyIndex={bodyIndex} bodyItem={bodyItem} key={`body-item-${bodyIndex}`} />
            })}
            {typeof conclusion === 'string' ? (
              <SectionText className="text-lg md:text-xl text-muted-foreground">{conclusion}</SectionText>
            ) : (
              conclusion.map((paragraph, conclusionIndex) => {
                return (
                  <SectionText className="text-lg md:text-xl text-muted-foreground" key={`conclusion-p-${conclusionIndex}`}>
                    {paragraph}
                  </SectionText>
                )
              })
            )}
            {buttonText && (
              <div className="text-center mt-8">
                <Button>{buttonText}</Button>
              </div>
            )}
          </Container>
        </Section>
      )}
    </>
  )
}
