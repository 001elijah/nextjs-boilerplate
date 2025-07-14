import { BarChart, Calendar, LucideIcon, Megaphone, MousePointerClick, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { Button, CardBorder, Container, Section, SectionTitle } from '@/components'

type Campaign = {
  clicks: string
  endDate: string
  engagement: string
  platform: string
  reach: string
  startDate: string
  status: CampaignStatus
  title: string
}

type CampaignStatus = 'Active' | 'Completed' | 'Paused'

const campaigns: Campaign[] = [
  {
    clicks: '890',
    endDate: '2025-06-30',
    engagement: '1.2K',
    platform: 'Instagram',
    reach: '12.5K',
    startDate: '2025-06-01',
    status: 'Active',
    title: 'Summer Sale 2024'
  },
  {
    clicks: '1.5K',
    endDate: '2025-01-31',
    engagement: '2.8K',
    platform: 'Facebook',
    reach: '25K',
    startDate: '2025-01-01',
    status: 'Completed',
    title: 'New Year Promo'
  },
  {
    clicks: '120',
    endDate: '2025-05-15',
    engagement: '350',
    platform: 'Facebook',
    reach: '5.2K',
    startDate: '2025-04-15',
    status: 'Paused',
    title: 'Spring Collection Launch'
  },
  {
    clicks: '4.2K',
    endDate: '2024-11-29',
    engagement: '8.7K',
    platform: 'Instagram & Facebook',
    reach: '50K',
    startDate: '2024-11-20',
    status: 'Completed',
    title: 'Black Friday Deals'
  }
]

const statusStyles: Record<CampaignStatus, string> = {
  Active: 'bg-green-500/20 text-green-400 border-green-500/30',
  Completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
}

const CampaignStatusBadge = ({ status }: { status: CampaignStatus }) => (
  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>{status}</span>
)

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-foreground/80">
    <Icon className="size-4" />
    <span className="text-sm">
      {label}: <strong className="font-semibold text-foreground">{value}</strong>
    </span>
  </div>
)

export const Campaigns = () => {
  return (
    <Section ariaLabel="Campaigns" className="py-8" id="campaigns">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Campaigns" sectionTitle="Campaigns" />
          <Link href="/profile/campaigns/create">
            <Button className="border-gold font-bold text-foreground hover:bg-gold" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              New Campaign
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {campaigns.map((campaign, index) => (
            <CardBorder className="items-start border-gold/50 bg-background/30 p-6" key={index}>
              <div className="flex w-full items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{campaign.title}</h3>
                <CampaignStatusBadge status={campaign.status} />
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
                <Megaphone className="size-4" />
                <span>{campaign.platform}</span>
              </div>
              <div className="my-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                <Metric icon={BarChart} label="Reach" value={campaign.reach} />
                <Metric icon={Users} label="Engagement" value={campaign.engagement} />
                <Metric icon={MousePointerClick} label="Clicks" value={campaign.clicks} />
              </div>
              <div className="w-full text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>
                    {campaign.startDate} - {campaign.endDate}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex w-full gap-4">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </CardBorder>
          ))}
        </div>
      </Container>
    </Section>
  )
}
