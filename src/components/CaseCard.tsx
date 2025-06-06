import { size } from 'lodash'
import Image from 'next/image'
import { CardBorder, CaseInfo } from '@/components'
import { CaseStudyInterface } from '@/types'

export const CaseCard = ({ imageData, infoConfig, title }: CaseStudyInterface) => {
  const { alt, src } = imageData
  return (
    <CardBorder className="text-center">
      <Image
        alt={alt}
        className="rounded-t-lg w-full max-h-1/2 object-cover"
        height={80}
        onError={e => {
          e.currentTarget.src = 'https://placehold.co/300x200/4B5563/FFFFFF?text=Image+Error'
        }}
        src={src}
        width={80}
      />
      <div className="w-full px-6 py-4 md:px-4 ">
        <h5 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-4">{title}</h5>
        {infoConfig.map((info, index) => (
          <CaseInfo infoConfig={info} isLastItem={index === size(infoConfig) - 1} key={index} />
        ))}
      </div>
    </CardBorder>
  )
}
