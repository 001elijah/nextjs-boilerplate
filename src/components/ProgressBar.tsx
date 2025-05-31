export const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="mb-8 w-full">
    <div className="relative h-2 rounded-full bg-gray-200">
      <div className="absolute top-0 left-0 h-2 rounded-full bg-primary" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} />
    </div>
    <p className="mt-2 text-sm">
      Step {currentStep + 1} of {totalSteps}
    </p>
  </div>
)
