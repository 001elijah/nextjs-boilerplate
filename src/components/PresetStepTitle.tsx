export const PresetStepTitle = ({ question, title }: { question: string; title: string }) => {
  return (
    <div className="text-sm text-gold">
      <label className="font-medium">{title}</label>
      <p className="mb-2">{question}</p>
    </div>
  )
}
