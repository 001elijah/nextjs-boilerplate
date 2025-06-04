import Image from 'next/image'
import { CardBorder } from '@/components'
import { BeforeAfterClientType } from '@/types'

interface BeforeAfterClientsCardProps {
  client: BeforeAfterClientType
}

export const BeforeAfterClientsCard = ({ client }: BeforeAfterClientsCardProps) => {
  return (
    <CardBorder className="w-full md:w-1/2 text-center gap-8">
      <Image
        alt={client.business}
        className="rounded-t-lg w-full object-cover"
        height={80}
        onError={e => {
          e.currentTarget.src = 'https://placehold.co/300x200/4B5563/FFFFFF?text=Image+Error'
        }}
        src={client.imageSrc}
        width={80}
      />
      <div className="w-full p-2 md:p-4">
        <p className="text-3sm md:text-xl font-bold lg mb-2">{client.comment}</p>
        <p className="text-2sm md:text-lg font-semibold mb-2">{client.business}</p>
        <p className="text-sm md:text-2lg">{client.strategy}</p>
      </div>
    </CardBorder>
  )
}
