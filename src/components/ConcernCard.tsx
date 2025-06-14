import { Ban, ChartNoAxesCombined, LucideProps, MapPin } from 'lucide-react'
import { ConcernInterface } from '@/types'

interface ConcernCardProps {
  concern: ConcernInterface
}

const iconComponents: Record<ConcernInterface['icon'], React.ElementType<LucideProps>> = {
  Ban,
  ChartNoAxesCombined,
  MapPin
}

export const ConcernCard = ({ concern }: ConcernCardProps) => {
  const { icon, text, title } = concern
  const iconConfig = {
    className: 'w-16 h-16 shrink-0',
    color: '#9A8043',
    strokeWidth: 1
  }
  const IconComponent = iconComponents[icon]
  return (
    <div className="w-full flex gap-2">
      <IconComponent {...iconConfig} />
      <div className="flex flex-col">
        <p className="text-3xl font-bold">{title}</p>
        {typeof text === 'string' ? (
          <p className="text-2xl text-gold">{text}</p>
        ) : (
          <div className="mb-2">
            {text?.map((textItem, index) => (
              <p className="text-2xl text-gold" key={index}>
                {textItem}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
