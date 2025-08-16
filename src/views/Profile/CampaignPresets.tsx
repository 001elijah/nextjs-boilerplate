'use client'

import { size } from 'lodash'
import { Megaphone, Plus } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { deleteCampaign, getUserCampaigns } from '@/actions/campaign'
import { Button, CampaignPresetCard, Container, LoadingSpinner, Section, SectionTitle, toast } from '@/components'
import { routes } from '@/config'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { ICampaignData } from '@/types'

export interface ICampaignResponseItem extends ICampaignData {
  id: string
  user_id: string
}

export const CampaignPresets = () => {
  const [deletingId, setDeletingId] = useState<null | string>(null)

  const fetchCampaignData = useCallback(async () => {
    const { campaigns, error, needsAuth } = await getUserCampaigns()
    return { data: campaigns, error, needsAuth }
  }, [])

  const { data: campaigns, loading } = useFetchUserPresets<ICampaignResponseItem>(fetchCampaignData, {
    errorMessage: 'Something went wrong while loading campaigns.',
    errorTitle: 'Error Loading Campaigns',
    unauthorizedMessage: 'You need to be logged in to view your campaigns.',
    unauthorizedTitle: 'Unauthorized'
  })

  const handleDelete = async (campaignId: string) => {
    setDeletingId(campaignId)

    try {
      await deleteCampaign(campaignId)
      toast({
        message: '',
        title: `Campaign ${campaignId} Deleted Successfully.`,
        type: 'success'
      })
    } catch {
      toast({
        message: 'Something went wrong.',
        title: 'Error Deleting Campaign',
        type: 'error'
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <Section ariaLabel="Campaigns" className="py-8" id="campaigns">
        <Container>
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size={48} />
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section ariaLabel="Campaigns" className="py-8" id="campaigns">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Campaign Presets" sectionTitle="Campaign Presets" />
          <Link href={routes.profile.presets.new.campaign}>
            <Button className="border-gold font-bold text-foreground hover:bg-gold" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              New Campaign
            </Button>
          </Link>
        </div>
        {size(campaigns) === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-foreground/60">
            <Megaphone className="mb-4 size-16 text-gold" />
            <h3 className="text-xl font-bold">{'No Campaign Presets Found'}</h3>
            <p className="mt-2">{"It looks like you haven't created any campaign presets yet."}</p>

            <p>
              <Link href={routes.profile.presets.new.campaign}>
                <Button size="sm" variant="link">
                  {'Add New Campaign'}
                </Button>
              </Link>
              {'to get started!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {campaigns.map((campaign, index) => (
              <CampaignPresetCard campaignPresetData={campaign} deletingId={deletingId} key={index} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
