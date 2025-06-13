import { size } from 'lodash'
import { Button, CallToActionCard, Container, Section, SectionHook, SectionTitle } from '@/components'
import { CallToActionProps } from '@/types'

export const CallToAction = ({ callToAction }: CallToActionProps) => {
  return (
    <Section ariaLabel="Call To Action" id="call-to-action">
      <Container className="flex flex-col items-center gap-8">
        {callToAction.heading && <SectionTitle fallbackTitle={'Before & After Clients'} sectionTitle={callToAction.heading} />}
        {callToAction.hook && <SectionHook sectionHook={callToAction.hook} />}
        <div className="flex flex-col md:flex-row">
          {callToAction.actionCalls.map((actionCall, index) => (
            <CallToActionCard
              actionCall={actionCall}
              className={size(callToAction.actionCalls) - 1 !== index ? 'border-b-2 border-background-foreground md:border-b-0 md:border-r-2' : ''}
              key={index}
            />
          ))}
        </div>
        <Button>{callToAction.buttonText}</Button>
      </Container>
    </Section>
  )
}
