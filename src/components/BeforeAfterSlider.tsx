'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { SetStateAction, useRef } from 'react'

// Define thresholds for snapping
const SNAP_TO_END_THRESHOLD = 5 // If dragging right & committed value > 30, snap to 100
const SNAP_TO_START_THRESHOLD = 95 // If dragging left & committed value < 70, snap to 0

export const BeforeAfterSlider = ({ setSliderValue, sliderValue }: { setSliderValue: React.Dispatch<SetStateAction<number[]>>; sliderValue: number[] }) => {
  const dragStartValueRef = useRef<null | number>(null)

  const handlePointerDown = () => {
    // Capture the slider's value when dragging begins
    if (sliderValue && sliderValue.length > 0) {
      dragStartValueRef.current = sliderValue[0]
    } else {
      // Fallback, though sliderValue should generally be initialized
      dragStartValueRef.current = 50 // A sensible default if needed
    }
  }

  const handleValueCommit = (committedValueArray: number[]) => {
    const committedValue = committedValueArray[0]
    const initialDragVal = dragStartValueRef.current

    // Reset for the next drag interaction
    dragStartValueRef.current = null

    if (initialDragVal === null) {
      // If dragStartValue was not captured for some reason,
      // let the value be what Radix committed (already set by onValueChange).
      return
    }

    const dragDistance = committedValue - initialDragVal

    if (dragDistance > 0) {
      // User dragged to the right (increasing value)
      if (committedValue > SNAP_TO_END_THRESHOLD && committedValue < 100) {
        // If dragged past the threshold and not already at the end, snap to 100
        setSliderValue([100])
      }
      // Otherwise, the value is already `committedValue` due to onValueChange, so no action needed.
    } else if (dragDistance < 0) {
      // User dragged to the left (decreasing value)
      if (committedValue < SNAP_TO_START_THRESHOLD && committedValue > 0) {
        // If dragged past the threshold and not already at the start, snap to 0
        setSliderValue([0])
      }
      // Otherwise, the value is already `committedValue`, so no action needed.
    }
    // If dragDistance is 0 (e.g., a click without dragging), no snap occurs.
    // The value remains what onValueChange set it to.
  }

  return (
    <>
      <SliderPrimitive.Root
        aria-label="Value"
        className="relative flex items-center select-none touch-none w-full h-5"
        max={100}
        onPointerDown={handlePointerDown} // Capture value at drag start
        onValueChange={setSliderValue} // Update value live during drag
        onValueCommit={handleValueCommit} // Apply custom logic when drag ends
        step={0.01} // Using the existing step value
        value={sliderValue} // Controlled component: value comes from props
      >
        <SliderPrimitive.Track className="bg-gold relative grow rounded-full h-[3px]">
          <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block w-5 h-5 bg-gold shadow-md rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 cursor-pointer" />
      </SliderPrimitive.Root>
    </>
  )
}
