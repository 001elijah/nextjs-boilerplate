import { MainCategory, MainCategoryControlHeader, PresetStepTitle, SubcategoryCustomOption, SubcategoryHeader, SubcategoryPredefinedOption } from '@/components'
import { useBusinessCategory } from '@/hooks/useBusinessCategory'
import { BusinessSubcategoryOption, BusinessType, Step } from '@/types'

interface BusinessCategoryStepProps {
  businessType: BusinessType
  defaultValue: BusinessSubcategoryOption['value']
  step: Step
}

export const BusinessCategoryStep = ({ businessType, defaultValue, step }: BusinessCategoryStepProps) => {
  const { expandedSubcategories, resetCategoryState, selectedMainCategory, setExpandedSubcategories, setSelectedMainCategory } = useBusinessCategory()

  // Extract business logic to separate functions
  const getVisibleCategories = (businessCategoryStep: Step) => {
    if (!businessCategoryStep?.categories) return []

    if (businessType === 'online') {
      return businessCategoryStep.categories.filter(cat => cat.id === 'online')
    } else if (businessType === 'offline') {
      return businessCategoryStep.categories.filter(cat => cat.id === 'offline')
    } else if (businessType === 'both') {
      return businessCategoryStep.categories
    }
    return []
  }

  const visibleCategories = getVisibleCategories(step)

  const selectedMainCategoryData = visibleCategories.find(cat => cat.id === selectedMainCategory)

  const handleGoBack = () => {
    resetCategoryState()
  }

  return (
    <div className="flex flex-col gap-4">
      <PresetStepTitle question={step.question || ''} title={step.title} />

      {/* Main Categories */}
      {!selectedMainCategory && (
        <div className="grid gap-2">
          {visibleCategories.map(category => (
            <MainCategory category={category} key={category.id} setSelectedMainCategory={setSelectedMainCategory} />
          ))}
        </div>
      )}

      {/* Subcategories */}
      {selectedMainCategory && selectedMainCategoryData && (
        <div className="space-y-4">
          <MainCategoryControlHeader onGoBack={handleGoBack} title={selectedMainCategoryData.title} />

          <div className="grid gap-3">
            {selectedMainCategoryData.categoryOptions?.map(subcategory => {
              // TODO: fix: if not isExpanded then value in null
              const isExpanded = expandedSubcategories.has(subcategory.id)

              return (
                <div className="border rounded-lg" key={subcategory.id}>
                  {/* Subcategory Header - Always Clickable */}
                  <SubcategoryHeader isExpanded={isExpanded} setExpandedSubcategories={setExpandedSubcategories} subcategory={subcategory} />

                  {/* Subcategory Options - Collapsible */}
                  {isExpanded && (
                    <div className="border-t px-3 pb-3">
                      <div className="grid gap-2 pt-2">
                        {/* If a subcategory has options, map through them */}
                        {subcategory.options && subcategory.options.length > 0 ? (
                          subcategory.options.map(option => <SubcategoryPredefinedOption id={option.id} key={option.id} name={step.id} option={option} />)
                        ) : (
                          /* If no options, render as plain text input */
                          <SubcategoryCustomOption defaultValue={defaultValue} id={step.id} name={step.id} placeholder={subcategory.placeholder} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
