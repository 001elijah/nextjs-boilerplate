export const MainCategoryControlHeader = ({ onGoBack, title }: { onGoBack: () => void; title: string | undefined }) => {
  return (
    <div className="flex items-center gap-2">
      <button className="text-sm text-primary hover:text-foreground transition-colors cursor-pointer" onClick={onGoBack} type="button">
        ← Back to categories
      </button>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
  )
}
