'use client'

import { size } from 'lodash'
import { Megaphone } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
import { getUserGeneratedAds } from '@/actions/ad'
import { AdCard, Button, Container, LoadingSpinner, Section, SectionHook, SectionTitle } from '@/components'
import { routes } from '@/config'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { IAdBrowserProps, IGeneratedAdData } from '@/types'

export const AdBrowser = ({ ads: { heading, subheading } }: IAdBrowserProps) => {
  const fetchGeneratedAdsData = useCallback(async () => {
    const { error, generatedAds, needsAuth } = await getUserGeneratedAds()
    return { data: generatedAds, error, needsAuth }
  }, [])

  const { data: generatedAds, loading } = useFetchUserPresets<IGeneratedAdData>(fetchGeneratedAdsData, {
    errorMessage: 'Something went wrong while loading generated ads.',
    errorTitle: 'Error Loading FGenerated Ads',
    unauthorizedMessage: 'You need to be logged in to view your generated ads.',
    unauthorizedTitle: 'Unauthorized'
  })

  console.log({ generatedAds })
  return (
    <Section ariaLabel="History" className="py-8" id="history">
      <Container>
        <SectionTitle fallbackTitle={'History'} sectionTitle={heading} />
        <SectionHook sectionHook={subheading} />

        {loading && <LoadingSpinner />}

        {!loading && generatedAds && size(generatedAds) > 0 ? (
          <>
            {generatedAds.map(ad => (
              <AdCard ad={ad} key={ad.id} />
            ))}
          </>
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center p-8 text-center text-foreground/60">
              <Megaphone className="mb-4 size-16 text-gold" />
              <h3 className="text-xl font-bold">{'No Generated Ads Found'}</h3>
              <p className="mt-2">{"It looks like you haven't generated any ads yet."}</p>

              <p>
                <Link href={routes.dashboard}>
                  <Button size="sm" variant="link">
                    {'Generate New Ads'}
                  </Button>
                </Link>
                {'to get started!'}
              </p>
            </div>
          )
        )}
      </Container>
    </Section>
  )
}
