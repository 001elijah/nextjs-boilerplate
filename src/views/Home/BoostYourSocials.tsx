import { BoostYourSocialsCaseCard, Button, ConcernCard, Container, Section, SectionHook, SectionTitle } from '@/components'
import { BoostYourSocialsProps } from '@/types'

export const BoostYourSocials = ({ boostYourSocials }: BoostYourSocialsProps) => {
  return (
    <Section ariaLabel="Boost Your Socials" id="boost-your-socials">
      <Container className="flex flex-col gap-8">
        {boostYourSocials.heading && <SectionTitle fallbackTitle={'Boost Your Socials'} sectionTitle={boostYourSocials.heading} />}
        <div className="flex max-xl:flex-col md:gap-4">
          {boostYourSocials.concerns.map((concern, index) => (
            <ConcernCard concern={concern} key={index} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {boostYourSocials.cases.map((caseItem, index) => (
            <BoostYourSocialsCaseCard caseItem={caseItem} key={index} />
          ))}
        </div>
        <div className="flex gap-8 items-center justify-between">
          <SectionHook className="text-2xl md:text-4xl font-bold text-foreground" sectionHook={boostYourSocials.hook} />
          <Button className="w-1/4 h-16 md:w-56 md:h-16 bg-background border-2 border-gold md:text-xl font-bold">
            {boostYourSocials.buttonText.toUpperCase()}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
