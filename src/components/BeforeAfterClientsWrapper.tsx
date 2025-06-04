interface BeforeAfterClientsWrapperProps {
  children: React.ReactNode
  sliderValue: number[]
}

export const BeforeAfterClientsWrapper = ({ children, sliderValue }: BeforeAfterClientsWrapperProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex space-x-4 transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${sliderValue[0] / 2}%)`, // sliderValue (0-100) maps to translateX (0% to -50%)
          width: '200%' // Inner container is twice the width of the viewport
        }}
      >
        {children}
      </div>
    </div>
  )
}
