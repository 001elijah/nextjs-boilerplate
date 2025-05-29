'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { Button, CardBorder } from '@/components'

export interface ReviewInterface {
  feedback: string
  fullReviewUrl?: string // Optional: Link for "Read full Review"
  id: number
  name: string
  photoUrl: string
  position: string
  rating: number
}

export const ReviewsCard = ({ review }: { review: ReviewInterface }) => {
  return (
    <CardBorder className="p-6 bg-card text-center text-card-foreground">
      <Image alt={`${review.name}'s photo`} className="rounded-full mb-4" height={80} src={review.photoUrl} width={80} />
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} key={i} />
        ))}
      </div>
      <p className="text-muted-foreground mb-4 italic">&#34;{review.feedback}&#34;</p>
      <p className="font-semibold text-lg">{review.name}</p>
      <p className="text-sm text-muted-foreground mb-4">{review.position}</p>
      {review.fullReviewUrl && (
        <Button onClick={() => window.open(review.fullReviewUrl, '_blank')} size="sm" variant="ghost">
          Read full Review
        </Button>
      )}
    </CardBorder>
  )
}
