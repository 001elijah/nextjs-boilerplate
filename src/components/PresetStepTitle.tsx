export const PresetStepTitle = ({ question, title }: { question: string; title: string }) => {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">{title}</label>
      <p className="text-sm text-muted-foreground mb-2">{question}</p>
    </div>
  )
}
