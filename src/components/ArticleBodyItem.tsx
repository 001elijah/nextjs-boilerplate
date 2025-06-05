import { SectionText } from '@/components'
import { ArticleBodyType } from '@/types'

export const ArticleBodyItem = ({ bodyIndex, bodyItem }: { bodyIndex: number; bodyItem: ArticleBodyType }) => {
  return (
    <>
      <SectionText className="text-gold">
        {bodyIndex + 1}. {bodyItem.heading}
      </SectionText>
      {typeof bodyItem.text === 'string' ? (
        <SectionText>{bodyItem.text}</SectionText>
      ) : (
        bodyItem.text.map((paragraph, pIndex) => {
          return <SectionText key={`body-text-${bodyIndex}-${pIndex}`}>{paragraph}</SectionText>
        })
      )}
      <SectionText>{bodyItem.conclusion}</SectionText>
    </>
  )
}
