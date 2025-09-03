'use client'

import { size } from 'lodash'
import { Megaphone } from 'lucide-react'
import Link from 'next/link'
import { useActionState, useCallback, useEffect, useState } from 'react'
import { submitAdSetForm } from '@/actions/ad'
import { getUserContents } from '@/actions/content'
import { Button, Container, ContentPresetCard, LoadingSpinner, PresetStepTitle, Section } from '@/components'
import { routes } from '@/config'
import { useAuth } from '@/contexts'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { IAdGeneratorProps, IAdSetFormState, IContentData } from '@/types'

export const AdGenerator = ({ adGenerator }: IAdGeneratorProps) => {
  const { submitButtonText, submitPendingButtonText } = adGenerator
  const [selectedContentKey, setSelectedContentKey] = useState<null | string>(null)
  const [businessId, setBusinessId] = useState<null | string>(null)
  const [campaignId, setCampaignId] = useState<null | string>(null)

  const fetchContentData = useCallback(async () => {
    const { contents, error, needsAuth } = await getUserContents()
    return { data: contents, error, needsAuth }
  }, [])

  const { data: contents, loading: contentPresetsLoading } = useFetchUserPresets<IContentData>(fetchContentData, {
    errorMessage: 'Something went wrong while loading contents.',
    errorTitle: 'Error Loading Contents',
    unauthorizedMessage: 'You need to be logged in to view your contents.',
    unauthorizedTitle: 'Unauthorized'
  })

  const { user } = useAuth()

  // Effect to parse selectedContentKey and update businessId and campaignId
  useEffect(() => {
    if (selectedContentKey) {
      const [bId, cId] = selectedContentKey.split('-')
      setBusinessId(bId)
      setCampaignId(cId)
    } else {
      setBusinessId(null)
      setCampaignId(null)
    }
  }, [selectedContentKey])

  const userId = user?.identities?.[0]?.user_id || null
  const initialState: IAdSetFormState = {
    business_id: '',
    campaign_id: '',
    error: '',
    user_id: userId || ''
  }

  const [state, action, isLoading] = useActionState(submitAdSetForm, initialState)

  if (contentPresetsLoading) {
    return (
      <Section ariaLabel="AdGenerator" className="py-8" id="adGenerator">
        <Container>
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size={48} />
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section ariaLabel="AdGenerator" className="py-8" id="adGenerator">
      <Container>
        <form action={action} className="flex flex-col gap-4">
          {size(contents) === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-foreground/60">
              <Megaphone className="mb-4 size-16 text-gold" />
              <h3 className="text-xl font-bold">{'No Content Presets Found'}</h3>
              <p className="mt-2">{"It looks like you haven't created any content presets yet."}</p>

              <p>
                <Link href={routes.profile.presets.root}>
                  <Button size="sm" variant="link">
                    {'Add New Content'}
                  </Button>
                </Link>
                {'to get started!'}
              </p>
            </div>
          ) : (
            <div>
              <label>
                <PresetStepTitle question={'Pick a content preset for your ad set'} title={'Select a Content Preset'} />
              </label>
              <div className="grid grid-cols-1 gap-8">
                {contents.map((content, index) => (
                  <div
                    className={`p-1 cursor-pointer rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-primary/20
                        ${selectedContentKey === `${content.business_id}-${content.campaign_id}` ? 'ring-2 ring-primary' : 'border-2 border-transparent'}
                      `}
                    key={index}
                    onClick={() => setSelectedContentKey(`${content.business_id}-${content.campaign_id}`)}
                  >
                    <ContentPresetCard contentPresetData={content} key={index} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <Button disabled={isLoading || !selectedContentKey} type="submit">
            {isLoading ? submitPendingButtonText : submitButtonText}
          </Button>

          {/* Error Display */}
          {state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}

          <input name="business_id" type="hidden" value={businessId || ''} />
          <input name="campaign_id" type="hidden" value={campaignId || ''} />
          <input name="user_id" type="hidden" value={userId || ''} />
        </form>
      </Container>
    </Section>
  )
}
