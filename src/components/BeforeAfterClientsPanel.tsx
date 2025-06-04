import { SectionTitle } from '@/components'

interface BeforeAfterClientsPanelProps {
  children: React.ReactNode
  title: string
}

export const BeforeAfterClientsPanel = ({ children, title }: BeforeAfterClientsPanelProps) => {
  return (
    <div className="w-1/2">
      {/* Each panel takes 50% of the 200% width = 100% of viewport */}
      <SectionTitle fallbackTitle={'Before & After Clients'} sectionTitle={title} />
      {children}
    </div>
  )
}
