'use client'

import { size } from 'lodash'
import { BarChart, LucideIcon, Megaphone, MessageSquare, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getUserCampaigns } from '@/app/profile/presets/actions'
import { deleteCampaign } from '@/app/profile/presets/new/campaign/actions'
import { Button, CardBorder, Container, LoadingSpinner, Section, SectionTitle, toast } from '@/components'
import { routes } from '@/config'
import { useAuth } from '@/contexts'
import { ICampaignData } from '@/types'

interface ICampaignResponseItem extends ICampaignData {
  id: string
  user_id: string
}

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-foreground/80">
    <Icon className="size-4" />
    <span className="text-sm">
      {label}: <strong className="font-semibold text-foreground">{value}</strong>
    </span>
  </div>
)

export const CampaignPresets = () => {
  const { signOut } = useAuth()
  const [campaigns, setCampaigns] = useState<ICampaignResponseItem[]>([])
  const [deletingId, setDeletingId] = useState<null | string>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { campaigns: fetchedCampaigns, error, needsAuth } = await getUserCampaigns()

        if (needsAuth) {
          toast({
            message: 'You need to be logged in to view your campaigns.',
            title: 'Unauthorized',
            type: 'error'
          })
          setCampaigns(fetchedCampaigns)
          await signOut()
          return
        }

        if (error) {
          console.error('Error fetching campaigns:', error)
          toast({
            message: error,
            title: 'Error Loading Campaigns',
            type: 'error'
          })
        } else {
          setCampaigns(fetchedCampaigns)
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
        toast({
          message: 'Something went wrong while loading campaigns.',
          title: 'Error Loading Campaigns',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [signOut])

  const handleDelete = async (campaignId: string) => {
    setDeletingId(campaignId)

    try {
      await deleteCampaign(campaignId)

      const newCampaigns = campaigns.filter(c => c.id !== campaignId)
      setCampaigns(newCampaigns)
    } catch (error) {
      console.error('Failed to delete campaign:', error)
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
              <CardBorder className="items-start border-gold/50 bg-background/30 p-6" key={index}>
                {/* Card content start */}
                <div className="flex w-full flex-col gap-4">
                  <h3 className="text-xl font-bold text-gold">Campaign Preset #{campaign.id}</h3>
                  {/* Metrics section */}
                  <div className="grid grid-cols-2 gap-4">
                    <Metric icon={Megaphone} label="Approach" value={campaign.approach} />
                    <Metric icon={BarChart} label="Goal" value={campaign.goal} />
                    <Metric icon={Users} label="Channels" value={campaign.channels.join(', ')} />
                    <Metric icon={MessageSquare} label="Tone" value={campaign.tone} />
                  </div>
                  {/* Promotion and Temperature details */}
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">
                      <span className="font-semibold text-foreground/80">Promotion:</span>
                      <p className="mt-1 text-foreground/60">{campaign.promotion}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-foreground/80">Temperature:</span>
                      <p className="mt-1 text-foreground/60">{campaign.temperature}</p>
                    </div>
                  </div>
                </div>
                {/* Card content end */}
                {/* Buttons section */}
                <div className="mt-6 flex w-full gap-4">
                  <Button disabled={deletingId === campaign.id} onClick={() => handleDelete(campaign.id)} size="sm" variant="outline">
                    {deletingId === campaign.id ? <LoadingSpinner /> : 'Delete'}
                  </Button>
                </div>
              </CardBorder>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
