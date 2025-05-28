'use client'

import { LoadingSpinner } from '@/components'
import { useAuth } from '@/contexts'
import { AdGenerator } from '@/views'
import { Reviews } from '@/views'
import { WhyChooseUs } from '@/views'
import { CaseStudies } from '@/views'
import { HomeHero } from '@/views'

export default function Home() {
  const { loading, user } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {user ? (
        <AdGenerator />
      ) : (
        <>
          <HomeHero />

          <Reviews />

          <WhyChooseUs />

          <CaseStudies />
        </>
      )}
    </>
  )
}
