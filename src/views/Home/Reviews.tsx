'use client'

import { size } from 'lodash'
import { useState } from 'react'
import { Section } from '@/components'
import { ReviewPagination, ReviewPaginationButtons, ReviewsCard } from '@/components'
import { Container } from '@/components'
import { useGlobal } from '@/contexts'
import { ReviewsProps } from '@/types'

const CARDS_PER_PAGE = 3

export const Reviews = ({ reviews }: { reviews: ReviewsProps }) => {
  const { isMobile } = useGlobal()
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(size(reviews.items) / CARDS_PER_PAGE)
  const showPagination = totalPages > 1

  const handleNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }

  const currentReviews = reviews.items.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE)

  return (
    <Section ariaLabel="Reviews section" id="reviews">
      <Container>
        <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-2xl md:text-3xl mb-8 md:mb-12">{reviews.heading}</h2>
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
