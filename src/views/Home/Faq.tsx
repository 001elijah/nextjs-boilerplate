import { Container, FaqItem, Section } from '@/components'
import { FaqProps } from '@/types'

export const Faq = ({ faq }: FaqProps) => {
  return (
    <>
      {faq && faq.faq && faq.faq.length > 0 && (
        <Section ariaLabel="Frequently Asked Questions" id="faq">
          <Container>
            <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-3xl md:text-4xl mb-12">{faq.heading || 'Frequently Asked Questions'}</h2>
            <div className="max-w-3xl mx-auto">
              {faq.faq.map((item, index) => (
                <FaqItem answer={item.answer} key={index} question={item.question} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
