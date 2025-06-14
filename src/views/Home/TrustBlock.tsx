import { CompanyLogoCard, Container, Section, SectionTitle } from '@/components'
import { TrustBlockProps } from '@/types'

export const TrustBlock = ({ trustBlock }: TrustBlockProps) => {
  return (
    <Section ariaLabel="Trust Block" id="trust-block">
      <Container>
        <SectionTitle fallbackTitle={'Trust Block'} sectionTitle={trustBlock.heading} />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {trustBlock.trustingCompanies.map((logoUrl, index) => (
            <CompanyLogoCard key={index} logoUrl={logoUrl} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
