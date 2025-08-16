'use client'

import { size } from 'lodash'
import { BarChart, Gift, Globe, Languages, LucideIcon, MapPin, Megaphone, MessageSquare, Plus, Tag, Users } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { deleteContent, getUserContents } from '@/actions/content'
import { Button, CardBorder, Container, LoadingSpinner, Section, SectionTitle, toast } from '@/components'
import { routes } from '@/config'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { IContentData } from '@/types'

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-foreground/80">
    <Icon className="size-4" />
    <span className="text-sm">
      {label}: <strong className="font-semibold text-foreground">{value}</strong>
    </span>
  </div>
)

export const ContentPresets = () => {
  const [deletingKey, setDeletingKey] = useState<null | string>(null)

  const fetchContentData = useCallback(async () => {
    const { contents, error, needsAuth } = await getUserContents()
    return { data: contents, error, needsAuth }
  }, [])

  const { data: contents, loading } = useFetchUserPresets<IContentData>(fetchContentData, {
    errorMessage: 'Something went wrong while loading contents.',
    errorTitle: 'Error Loading Contents',
    unauthorizedMessage: 'You need to be logged in to view your contents.',
    unauthorizedTitle: 'Unauthorized'
  })

  const handleDelete = async (businessId: string, campaignId: string) => {
    // Create a unique key for the item being deleted to manage the UI state
    const currentDeletingKey = `${businessId}-${campaignId}`
    setDeletingKey(currentDeletingKey)

    try {
      await deleteContent(businessId, campaignId)
      toast({
        message: '',
        title: `Content ${currentDeletingKey} Deleted Successfully.`,
        type: 'success'
      })
    } catch {
      toast({
        message: 'Something went wrong.',
        title: 'Error Deleting Content',
        type: 'error'
      })
    } finally {
      setDeletingKey(null)
    }
  }

  if (loading) {
    return (
      <Section ariaLabel="Contents" className="py-8" id="contents">
        <Container>
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size={48} />
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section ariaLabel="Contents" className="py-8" id="contents">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Content Presets" sectionTitle="Content Presets" />
          <Link href={routes.profile.presets.new.content}>
            <Button className="border-gold font-bold text-foreground hover:bg-gold" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              New Content
            </Button>
          </Link>
        </div>
        {size(contents) === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-foreground/60">
            <Megaphone className="mb-4 size-16 text-gold" />
            <h3 className="text-xl font-bold">{'No Content Presets Found'}</h3>
            <p className="mt-2">{"It looks like you haven't created any content presets yet."}</p>

            <p>
              <Link href={routes.profile.presets.new.content}>
                <Button size="sm" variant="link">
                  {'Add New Content'}
                </Button>
              </Link>
              {'to get started!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {contents.map((content, index) => (
              <CardBorder className="items-start border-gold/50 bg-background/30 p-6" key={index}>
                <div className="flex w-full flex-col gap-4">
                  {/* Main Title/Header */}
                  <h3 className="text-2xl font-bold text-gold">
                    {content.businesses?.name || 'Untitled Business'}
                    {content.businesses?.category && <span className="ml-2 text-xl text-foreground/70">({content.businesses.category})</span>}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Preset ID:{' '}
                    <strong className="font-semibold">
                      {content.business_id}-{content.campaign_id}
                    </strong>
                  </p>

                  <div className="w-full">
                    <h4 className="mb-3 text-lg font-semibold text-foreground">Campaign Details</h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Metric icon={Megaphone} label="Approach" value={content.campaigns?.approach || 'N/A'} />
                      <Metric icon={BarChart} label="Goal" value={content.campaigns?.goal || 'N/A'} />
                      <Metric icon={Users} label="Channels" value={content.campaigns?.channels?.join(', ') || 'N/A'} />
                      <Metric icon={MessageSquare} label="Tone" value={content.campaigns?.tone || 'N/A'} />
                      <Metric icon={Megaphone} label="Promotion" value={content.campaigns?.promotion || 'N/A'} />
                      <Metric icon={BarChart} label="Temperature" value={content.campaigns?.temperature || 'N/A'} />
                    </div>
                  </div>

                  <div className="w-full pt-4 border-t border-gold/20">
                    <h4 className="mb-3 text-lg font-semibold text-foreground">Business Information</h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Metric icon={Tag} label="Type" value={content.businesses?.type || 'N/A'} />
                      <Metric icon={Languages} label="Language" value={content.businesses?.language || 'N/A'} />
                      {content.businesses?.location && (
                        <Metric
                          icon={MapPin}
                          label="Location"
                          value={`${content.businesses.location.city}, ${content.businesses.location.state}, ${content.businesses.location.country}`}
                        />
                      )}
                      <Metric icon={Users} label="Channels" value={content.businesses?.channels?.join(', ') || 'N/A'} />
                      <Metric icon={MessageSquare} label="Tone" value={content.businesses?.tone || 'N/A'} />
                      <Metric icon={Globe} label="Regions" value={content.businesses?.regions?.join(', ') || 'N/A'} />
                      <Metric icon={Gift} label="Promotions" value={content.businesses?.promotions?.join(', ') || 'N/A'} />
                    </div>
                    {content.businesses?.customer && (
                      <div className="mt-4 pt-4 border-t border-gold/20">
                        {' '}
                        {/* Separator for customer profile */}
                        <h5 className="mb-2 text-md font-medium text-foreground/80">Customer Profile:</h5>
                        <p className="text-sm text-foreground/70">
                          <strong>Demographics:</strong> {content.businesses.customer.demographics || 'N/A'}
                        </p>
                        <p className="text-sm text-foreground/70">
                          <strong>Professional Type:</strong> {content.businesses.customer.professionalType || 'N/A'}
                        </p>
                        <p className="text-sm text-foreground/70">
                          <strong>Pain Point:</strong> {content.businesses.customer.painPoint || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex w-full gap-4">
                    <Button
                      disabled={deletingKey === `${content.business_id}-${content.campaign_id}`}
                      onClick={() => handleDelete(content.business_id, content.campaign_id)}
                      size="sm"
                      variant="outline"
                    >
                      {deletingKey === `${content.business_id}-${content.campaign_id}` ? <LoadingSpinner /> : 'Delete'}
                    </Button>
                  </div>
                </div>
              </CardBorder>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
