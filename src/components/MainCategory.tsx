import { BusinessCategory, Category } from '@/types'

type MainCategoryProps = {
  category: BusinessCategory | Category
  setSelectedMainCategory: (category: BusinessCategory['value']) => void
}

export const MainCategory = ({ category, setSelectedMainCategory }: MainCategoryProps) => {
  const handleClick = () => {
    setSelectedMainCategory(category.value as BusinessCategory['value'])
  }

  return (
    <button
      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-foreground hover:text-background cursor-pointer transition-colors text-left"
      onClick={handleClick}
      type="button"
    >
      <span className="text-sm font-medium">{category.title}</span>
    </button>
  )
}
