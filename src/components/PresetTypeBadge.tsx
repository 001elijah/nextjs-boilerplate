export type PresetType = 'Campaign' | 'Content'

const typeStyles: Record<PresetType, string> = {
  Campaign: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Content: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}

export const PresetTypeBadge = ({ type }: { type: PresetType }) => (
  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${typeStyles[type]}`}>{type}</span>
)
