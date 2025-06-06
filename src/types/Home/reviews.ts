export interface ReviewItemInterface {
  feedback: string
  fullReviewUrl?: string
  id: number
  name: string
  photoUrl: string
  position: string
  rating: number
}

export interface ReviewsProps {
  heading: string
  items: ReviewItemInterface[]
}
