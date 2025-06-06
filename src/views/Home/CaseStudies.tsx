'use client'

import { CaseCard, CaseCardMain, Container, Section } from '@/components'
import { CaseStudiesProps } from '@/types'

export const CaseStudies = ({ caseStudies }: CaseStudiesProps) => {
  return (
    <Section ariaLabel={'Success Stories with Dunamis'} id={'success-stories'}>
      <Container className={'flex flex-col items-center justify-center'}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gold">Case Studies</h2>
        <h4 className="text-lg mb-8 text-center">Real Growth with the Best AI Ad Generator</h4>
        <CaseCardMain imageData={caseStudies.mainCase.imageData} infoConfig={caseStudies.mainCase.infoConfig} title={caseStudies.mainCase.title} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {caseStudies.cases.map(({ imageData, infoConfig, title }, index) => (
            <CaseCard imageData={imageData} infoConfig={infoConfig} key={index} title={title} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
