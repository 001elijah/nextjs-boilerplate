import { Input } from '@/components'
import { useBusinessCategory } from '@/hooks/useBusinessCategory'
import { BusinessSubcategoryOption, Option } from '@/types'

type SubcategoryPredefinedOptionProps = { id: string; name: string; option: BusinessSubcategoryOption | Option }

export const SubcategoryPredefinedOption = ({ id, name, option }: SubcategoryPredefinedOptionProps) => {
  const { businessCategoryOptionValue, setBusinessCategoryOptionValue } = useBusinessCategory()
  return (
    <label className="flex items-center gap-3 p-2 hover:bg-foreground hover:text-background rounded cursor-pointer transition-colors">
      <Input
        checked={businessCategoryOptionValue === option.value}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
        id={id}
        name={name}
        onChange={e => setBusinessCategoryOptionValue(e.target.value as BusinessSubcategoryOption['value'])}
        type="radio"
        value={option.value}
      />
      <span className="text-sm">{option.label}</span>
    </label>
  )
}
