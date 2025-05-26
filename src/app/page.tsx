'use client'

import { AdGenerator } from '@/components/AdGenerator'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Reviews } from '@/components/Reviews'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { useAuth } from '@/contexts/authContext'

export default function Home() {
  const { loading, user } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {user ? (
        <Container>
          <AdGenerator />
        </Container>
      ) : (
        <>
          <Hero />
          <Container>
            <Reviews />
            <WhyChooseUs />
          </Container>
        </>
      )}
    </>
  )
}
