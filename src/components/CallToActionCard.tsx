import { ChartNoAxesCombined, CircleDollarSign, HomeIcon, LucideProps } from 'lucide-react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import { ActionCallInterface } from '@/types'

interface CallToActionCardProps {
  actionCall: ActionCallInterface
  className?: string
}

const iconComponents: Record<ActionCallInterface['icon'], React.ElementType<LucideProps>> = {
  ChartNoAxesCombined,
  CircleDollarSign,
  HomeIcon
}

export const CallToActionCard = ({ actionCall, className }: CallToActionCardProps) => {
  const { buttonText, icon, text } = actionCall
  const iconConfig = {
    className: 'w-24 h-24',
    color: '#9A8043',
    strokeWidth: 1
  }
  const IconComponent = iconComponents[icon]
  return (
    <div className={cn('md:w-1/3 flex flex-col items-center justify-between p-4 md:p-8 gap-4', className)}>
      {typeof text === 'string' ? (
        <p className="text-center text-xl md:text-xl font-bold mb-2">{text}</p>
      ) : (
        <div className="mb-2">
          {text?.map((textItem, index) => (
            <p className="text-center text-xl md:text-xl font-bold" key={index}>
              {textItem}
            </p>
          ))}
        </div>
      )}
      <IconComponent {...iconConfig} />
      <Button variant="secondary">{buttonText}</Button>
    </div>
  )
}
