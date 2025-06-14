import { Circle } from 'lucide-react'
import { CardBorder } from '@/components'
import { CaseInterface } from '@/types'

interface BoostYourSocialsCaseCardProps {
  caseItem: CaseInterface
}

export const BoostYourSocialsCaseCard = ({ caseItem }: BoostYourSocialsCaseCardProps) => {
  const { improvements, title } = caseItem
  return (
    <CardBorder className="md:w-1/3 border-gold p-8 gap-8">
      <p className="text-center text-3xl font-bold">{title}</p>
      <ul>
        {improvements.map((improvement, index) => (
          <li className="flex gap-2" key={index}>
            <Circle className="mt-1.5 flex-shrink-0 fill-primary stroke-0" size={12} />
            <p className="text-xl">{improvement}</p>
          </li>
        ))}
      </ul>
    </CardBorder>
  )
}
