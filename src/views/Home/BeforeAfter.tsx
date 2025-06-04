'use client'

import { useState } from 'react'
import { BeforeAfterClientsCard, BeforeAfterClientsPanel, BeforeAfterClientsWrapper, BeforeAfterSlider, Button, Container, Section } from '@/components'
import { useGlobal } from '@/contexts'
import { BeforeAfterProps } from '@/types'

export const BeforeAfter = ({ beforeAfter }: BeforeAfterProps) => {
  const [sliderValue, setSliderValue] = useState([0])
  const { isMobile } = useGlobal()

  const clientsBefore = isMobile ? [beforeAfter.clients.before[0]] : beforeAfter.clients.before
  const clientsAfter = isMobile ? [beforeAfter.clients.after[0]] : beforeAfter.clients.after

  return (
    <>
      {beforeAfter && (
        <Section ariaLabel="Frequently Asked Questions" id="faq">
          <Container className="flex flex-col items-center gap-8">
            <BeforeAfterSlider setSliderValue={setSliderValue} sliderValue={sliderValue} />
            <BeforeAfterClientsWrapper sliderValue={sliderValue}>
              <BeforeAfterClientsPanel title={'Before'}>
                <div className="flex space-x-4">
                  {clientsBefore.map((client, index) => (
                    <BeforeAfterClientsCard client={client} key={`before-${index}`} />
                  ))}
                </div>
              </BeforeAfterClientsPanel>

              <BeforeAfterClientsPanel title={'After'}>
                <div className="flex space-x-4">
                  {clientsAfter.map((client, index) => (
                    <BeforeAfterClientsCard client={client} key={`before-${index}`} />
                  ))}
                </div>
              </BeforeAfterClientsPanel>
            </BeforeAfterClientsWrapper>
            <Button>{beforeAfter.buttonText}</Button>
          </Container>
        </Section>
      )}
    </>
  )
}
