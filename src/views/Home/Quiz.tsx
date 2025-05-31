'use client'

import { Container, QuizForm, Section } from '@/components'
import { QuizDataType } from '@/types'

export const Quiz = ({ quiz }: QuizDataType) => {
  return (
    <>
      {quiz && (
        <Section ariaLabel="Quiz" id="quiz">
          <Container>
            <QuizForm quiz={quiz} />
          </Container>
        </Section>
      )}
    </>
  )
}
