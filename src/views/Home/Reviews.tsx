'use client'

import { size } from 'lodash'
import { useState } from 'react'
import { Section } from '@/components'
import { ReviewInterface, ReviewPagination, ReviewPaginationButtons, ReviewsCard } from '@/components'
import { Container } from '@/components'
import { useGlobal } from '@/contexts'

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
  const { isMobile } = useGlobal()
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(size(mockReviews) / CARDS_PER_PAGE)
  const showPagination = totalPages > 1

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }

  const currentReviews = mockReviews.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE)

  return (
    <Section ariaLabel="Reviews section" id="reviews">
      <Container>
        <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-2xl md:text-3xl mb-8 md:mb-12">Reviews</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentReviews.map(review => (
              <ReviewsCard key={review.id} review={review} />
            ))}
          </div>
          {!isMobile && showPagination && <ReviewPaginationButtons handleNext={handleNext} handlePrev={handlePrev} />}
        </div>
        {showPagination &&
          (isMobile ? (
            <div className="relative">
              <ReviewPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
              <ReviewPaginationButtons handleNext={handleNext} handlePrev={handlePrev} />
            </div>
          ) : (
            <ReviewPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          ))}
      </Container>
    </Section>
  )
}
