import { BarChart, LucideIcon, Megaphone, MessageSquare, Users } from 'lucide-react'
import { Button, CardBorder, LoadingSpinner } from '@/components'
import { ICampaignResponseItem } from '@/views'

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-foreground/80">
    <Icon className="size-4" />
    <span className="text-sm">
      {label}: <strong className="font-semibold text-foreground">{value}</strong>
    </span>
  </div>
)

export const CampaignPresetCard = ({
  campaignPresetData,
  deletingId,
  onDelete
}: {
  campaignPresetData: ICampaignResponseItem
  deletingId?: null | string
  onDelete?: (campaignId: string) => void
}) => {
  return (
    <CardBorder className="items-start border-gold/50 bg-background/30 p-6">
      {/* Card content start */}
      <div className="flex w-full flex-col gap-4">
        <h3 className="text-xl font-bold text-gold">Campaign Preset #{campaignPresetData.id}</h3>
        {/* Metrics section */}
        <div className="grid grid-cols-2 gap-4">
          <Metric icon={Megaphone} label="Approach" value={campaignPresetData.approach} />
          <Metric icon={BarChart} label="Goal" value={campaignPresetData.goal} />
          <Metric icon={Users} label="Channels" value={campaignPresetData.channels.join(', ')} />
          <Metric icon={MessageSquare} label="Tone" value={campaignPresetData.tone} />
        </div>
        {/* Promotion and Temperature details */}
        <div className="flex flex-col gap-2">
          <div className="text-sm">
            <span className="font-semibold text-foreground/80">Promotion:</span>
            <p className="mt-1 text-foreground/60">{campaignPresetData.promotion}</p>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-foreground/80">Temperature:</span>
            <p className="mt-1 text-foreground/60">{campaignPresetData.temperature}</p>
          </div>
        </div>
      </div>
      {/* Card content end */}
      {/* Buttons section */}
      <div className="mt-6 flex w-full gap-4">
        {onDelete && (
          <Button disabled={deletingId === campaignPresetData.id} onClick={() => onDelete(campaignPresetData.id)} size="sm" variant="outline">
            {deletingId === campaignPresetData.id ? <LoadingSpinner /> : 'Delete'}
          </Button>
        )}
      </div>
    </CardBorder>
  )
}
