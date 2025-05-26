'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ReviewInterface, ReviewsCard } from '@/components/ui/ReviewsCard'

const mockReviews: ReviewInterface[] = [
  {
    feedback: 'This service is absolutely fantastic! Highly recommended.',
    fullReviewUrl: '#',
    id: 1,
    name: 'Alice Wonderland',
    photoUrl: '/client1.jpg',
    position: 'CEO, Wonderland Inc.',
    rating: 5
  },
  {
    feedback: "A game-changer for our marketing strategy. We've seen great results.",
    fullReviewUrl: '#',
    id: 2,
    name: 'Bob The Builder',
    photoUrl: '/client2.jpg',
    position: 'Marketing Director, BuildIt Co.',
    rating: 5
  },
  {
    feedback: 'Very helpful and responsive team. The platform is easy to use.',
    fullReviewUrl: '#',
    id: 3,
    name: 'Charlie Brown',
    photoUrl: '/client3.jpg',
    position: 'Project Manager, Peanuts LLC',
    rating: 4
  },
  {
    feedback: 'Exceeded our expectations in every way. Truly outstanding!',
    fullReviewUrl: '#',
    id: 4,
    name: 'Diana Prince',
    photoUrl: '/client3.jpg',
    position: 'Lead Designer, Themyscira Design',
    rating: 5
  },
  {
    feedback: 'Solid service with a noticeable impact on our ad performance.',
    fullReviewUrl: '#',
    id: 5,
    name: 'Edward Scissorhands',
    photoUrl: '/client2.jpg',
    position: 'Creative Lead, Artisan Creations',
    rating: 4
  },
  {
    feedback: 'The insights provided are invaluable. A must-have tool.',
    fullReviewUrl: '#',
    id: 6,
    name: 'Fiona Gallagher',
    photoUrl: '/client1.jpg',
    position: 'Operations Head, SouthSide Solutions',
    rating: 5
  },
  {
    feedback: 'Great platform, very intuitive and powerful features.',
    fullReviewUrl: '#',
    id: 7,
    name: 'George Jetson',
    photoUrl: '/client1.jpg',
    position: 'Futurist, Spacely Sprockets',
    rating: 4
  },
  {
    feedback: 'Our campaign success skyrocketed after using this.',
    fullReviewUrl: '#',
    id: 8,
    name: 'Harley Quinn',
    photoUrl: '/client2.jpg',
    position: 'Strategist, Gotham Digital',
    rating: 5
  },
  {
    feedback: 'Efficient and effective. Streamlined our whole process.',
    fullReviewUrl: '#',
    id: 9,
    name: 'Indiana Jones',
    photoUrl: '/client3.jpg',
    position: 'Explorer, Adventure Co.',
    rating: 4
  }
]

const CARDS_PER_PAGE = 3

export const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(mockReviews.length / CARDS_PER_PAGE)

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }

  const currentReviews = mockReviews.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE)

  return (
    <section aria-label="Reviews section" className="w-full py-12 md:py-16 lg:py-20" id="reviews">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-2xl md:text-3xl mb-8 md:mb-12">Reviews</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentReviews.map(review => (
              <ReviewsCard key={review.id} review={review} />
            ))}
          </div>
          {totalPages > 1 && (
            <>
              <Button
                aria-label="Previous reviews"
                className="text-muted-foreground absolute top-1/2 -translate-y-1/2 left-[-40px] md:left-[-45px] z-10 h-10 w-10 rounded-full"
                onClick={handlePrev}
                size="icon"
                variant="ghost"
              >
                <ChevronLeftIcon className="size-9" />
              </Button>
              <Button
                aria-label="Next reviews"
                className="text-muted-foreground absolute top-1/2 -translate-y-1/2 right-[-40px] md:right-[-45px] z-10 h-10 w-10 rounded-full"
                onClick={handleNext}
                size="icon"
                variant="ghost"
              >
                <ChevronRightIcon className="size-9" />
              </Button>
            </>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                aria-label={`Go to page ${i + 1}`}
                className={`w-3 h-3 rounded-full ${currentPage === i ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'}`}
                key={i}
                onClick={() => setCurrentPage(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
