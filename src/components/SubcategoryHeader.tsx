import { Dispatch, SetStateAction } from 'react'
import { BusinessCategory, BusinessSubcategory, Category, Subcategory } from '@/types'

type SubcategoryHeaderProps = {
  isExpanded: boolean
  setExpandedSubcategories: Dispatch<SetStateAction<Set<string>>>
  subcategory: BusinessCategory | BusinessSubcategory | Category | Subcategory
}

export const SubcategoryHeader = ({ isExpanded, setExpandedSubcategories, subcategory }: SubcategoryHeaderProps) => {
  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories((prev: Set<string>) => {
      const newSet = new Set(prev)
      if (newSet.has(subcategoryId)) {
        newSet.delete(subcategoryId)
      } else {
        newSet.add(subcategoryId)
      }
      return newSet
    })
  }

  return (
    <button
      className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-foreground hover:text-background cursor-pointer transition-colors"
      onClick={() => toggleSubcategory(subcategory.id)}
      type="button"
    >
      <h4 className="text-sm font-medium">
        {subcategory.title} {subcategory.maxSelections && `(max. ${subcategory.maxSelections})`}
      </h4>
      <span className={`text-sm transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
    </button>
  )
}
