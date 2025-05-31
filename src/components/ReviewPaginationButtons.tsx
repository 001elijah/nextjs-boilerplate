import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components'

export const ReviewPaginationButtons = ({ handleNext, handlePrev }: { handleNext: () => void; handlePrev: () => void }) => {
  return (
    <>
      <Button
        aria-label="Previous reviews"
        className="text-muted-foreground absolute bottom-[-30px] md:top-1/2 -translate-y-1/2 left-[-10px] md:left-[-45px] z-10 h-10 w-10 rounded-full"
        onClick={handlePrev}
        size="icon"
        variant="ghost"
      >
        <ChevronLeftIcon className="size-9" />
      </Button>
      <Button
        aria-label="Next reviews"
        className="text-muted-foreground absolute bottom-[-30px] md:top-1/2 -translate-y-1/2 right-[-10px] md:right-[-45px] z-10 h-10 w-10 rounded-full"
        onClick={handleNext}
        size="icon"
        variant="ghost"
      >
        <ChevronRightIcon className="size-9" />
      </Button>
    </>
  )
}
