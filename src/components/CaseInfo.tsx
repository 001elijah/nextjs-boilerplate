import { Activity, ArrowUp, Lightbulb, LucideProps } from 'lucide-react'
import { CaseStudyInfoInterafce } from '@/types'

const iconComponents: Record<CaseStudyInfoInterafce['icon'], React.ElementType<LucideProps>> = {
  Activity,
  ArrowUp,
  Lightbulb
}

export const CaseInfo = ({ infoConfig, isLastItem }: { infoConfig: CaseStudyInfoInterafce; isLastItem: boolean }) => {
  const { icon, label, text } = infoConfig
  const IconComponent = iconComponents[icon]
  return (
    <div className={`w-full flex md:flex-col items-start gap-1 text-lg sm:text-xl ${isLastItem ? '' : 'mb-2'}`}>
      <div className="flex items-center gap-1 mr-4">
        {<IconComponent className="text-primary" size={24} />}
        <span className="text-primary">{label}</span>
      </div>
      <div className="w-full text-start text-xl md:text-lg">
        {typeof text === 'string' ? (
          <p>{text}</p>
        ) : (
          <ul>
            {text?.map((textItem, index) => (
              <li key={index}>
                <p>{textItem}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
