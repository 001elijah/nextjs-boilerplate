import { size } from 'lodash'
import Image from 'next/image'
import { CardBorder, CaseInfo } from '@/components'
import { CaseStudyInterface } from '@/types'

export const CaseCardMain = ({ imageData, infoConfig, title }: CaseStudyInterface) => {
  return (
    <CardBorder className="w-full p-8 md:p-6 mb-12 md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
      <div className="w-full flex-shrink-0 md:w-1/3">
        <Image
          alt={imageData.alt}
          className="rounded-lg w-full"
          height={80}
          onError={e => {
            e.currentTarget.src = 'https://placehold.co/400x300/4B5563/FFFFFF?text=Image+Error'
          }}
          src={imageData.src}
          width={80}
        />
      </div>

      <div className="flex-grow text-center md:text-left">
        <h5 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-8">{title}</h5>
        {infoConfig.map((info, index) => (
          <CaseInfo infoConfig={info} isLastItem={index === size(infoConfig) - 1} key={index} />
        ))}
      </div>
    </CardBorder>
  )
}
