'use client'

import { BarChart, ChevronDown, ChevronUp, Gift, Globe, Languages, LucideIcon, MapPin, Megaphone, MessageSquare, Tag, Users } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { CardBorder } from '@/components/CardBorder'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { cn } from '@/lib/utils'
import { IContentData } from '@/types'

interface ContentPresetCardProps {
  contentPresetData: IContentData
  deletingKey?: null | string
  onDelete?: (businessId: string, campaignId: string) => void
}

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-foreground/80">
    <Icon className="size-4" />
    <span className="text-sm">
      {label}: <strong className="font-semibold text-foreground">{value}</strong>
    </span>
  </div>
)

interface ContentDetailSectionProps {
  children: React.ReactNode
  className?: string
  title: string
}

const ContentDetailSection = ({ children, className, title }: ContentDetailSectionProps) => (
  <div className={cn('w-full md:flex-1', className)}>
    <h4 className="mb-3 text-lg font-semibold text-foreground">{title}</h4>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
  </div>
)

export const ContentPresetCard = ({ contentPresetData, deletingKey, onDelete }: ContentPresetCardProps) => {
  const [isFolded, setIsFolded] = useState(true)

  const toggleFold = () => setIsFolded(!isFolded)

  return (
    <CardBorder className="items-start border-gold/50 bg-background/30 p-6">
      <div className="flex w-full flex-col gap-4">
        {/* Main Title/Header */}
        <h3 className="text-2xl font-bold text-gold">
          {contentPresetData.businesses?.name || 'Untitled Business'}
          {contentPresetData.businesses?.category && <span className="ml-2 text-xl text-foreground/70">({contentPresetData.businesses.category})</span>}
        </h3>
        <p className="text-sm text-foreground/60">
          Preset ID:{' '}
          <strong className="font-semibold">
            {contentPresetData.business_id}-{contentPresetData.campaign_id}
          </strong>
        </p>

        <div className={cn('overflow-hidden transition-all duration-300 ease-in-out', isFolded ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100 pt-4')}>
          <div className="flex flex-col gap-4 lg:flex-row">
            <ContentDetailSection title="Campaign Details">
              <Metric icon={Megaphone} label="Approach" value={contentPresetData.campaigns?.approach || 'N/A'} />
              <Metric icon={BarChart} label="Goal" value={contentPresetData.campaigns?.goal || 'N/A'} />
              <Metric icon={Users} label="Channels" value={contentPresetData.campaigns?.channels?.join(', ') || 'N/A'} />
              <Metric icon={MessageSquare} label="Tone" value={contentPresetData.campaigns?.tone || 'N/A'} />
              <Metric icon={Megaphone} label="Promotion" value={contentPresetData.campaigns?.promotion || 'N/A'} />
              <Metric icon={BarChart} label="Temperature" value={contentPresetData.campaigns?.temperature || 'N/A'} />
            </ContentDetailSection>

            <ContentDetailSection className="border-t pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 border-gold/20" title="Business Information">
              <Metric icon={Tag} label="Type" value={contentPresetData.businesses?.type || 'N/A'} />
              <Metric icon={Languages} label="Language" value={contentPresetData.businesses?.language || 'N/A'} />
              {contentPresetData.businesses?.location && (
                <Metric
                  icon={MapPin}
                  label="Location"
                  value={`${contentPresetData.businesses.location.city}, ${contentPresetData.businesses.location.state}, ${contentPresetData.businesses.location.country}`}
                />
              )}
              <Metric icon={Users} label="Channels" value={contentPresetData.businesses?.channels?.join(', ') || 'N/A'} />
              <Metric icon={MessageSquare} label="Tone" value={contentPresetData.businesses?.tone || 'N/A'} />
              <Metric icon={Globe} label="Regions" value={contentPresetData.businesses?.regions?.join(', ') || 'N/A'} />
              <Metric icon={Gift} label="Promotions" value={contentPresetData.businesses?.promotions?.join(', ') || 'N/A'} />
            </ContentDetailSection>

            {contentPresetData.businesses?.customer && (
              <div className="w-full border-t pt-4 md:flex-1 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 border-gold/20">
                <h5 className="mb-2 text-lg font-semibold text-foreground">Customer Profile:</h5>
                <p className="text-sm text-foreground/70">
                  <strong>Demographics:</strong> {contentPresetData.businesses.customer.demographics || 'N/A'}
                </p>
                <p className="text-sm text-foreground/70">
                  <strong>Professional Type:</strong> {contentPresetData.businesses.customer.professionalType || 'N/A'}
                </p>
                <p className="text-sm text-foreground/70">
                  <strong>Pain Point:</strong> {contentPresetData.businesses.customer.painPoint || 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>

        <Button className="w-fit" onClick={toggleFold} size="sm" type="button" variant="ghost">
          {isFolded ? (
            <>
              <ChevronDown className="mr-2 size-4" /> Show Details
            </>
          ) : (
            <>
              <ChevronUp className="mr-2 size-4" /> Hide Details
            </>
          )}
        </Button>

        {onDelete && (
          <div className="mt-6 flex w-full gap-4">
            <Button
              disabled={deletingKey === `${contentPresetData.business_id}-${contentPresetData.campaign_id}`}
              onClick={() => onDelete(contentPresetData.business_id, contentPresetData.campaign_id)}
              size="sm"
              variant="outline"
            >
              {deletingKey === `${contentPresetData.business_id}-${contentPresetData.campaign_id}` ? <LoadingSpinner /> : 'Delete'}
            </Button>
          </div>
        )}
      </div>
    </CardBorder>
  )
}
