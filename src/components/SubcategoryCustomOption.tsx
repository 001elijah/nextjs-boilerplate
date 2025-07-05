'use client'

import { useState } from 'react'
import { Input } from '@/components'
import { useBusinessCategory } from '@/hooks/useBusinessCategory'

export const SubcategoryCustomOption = ({ defaultValue, id, name, placeholder }: { defaultValue: string; id: string; name: string; placeholder?: string }) => {
  const { setBusinessCategoryOptionValue } = useBusinessCategory()
  const [customValue, setCustomValue] = useState<string>(defaultValue)

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomValue(value)

    // If user enters custom text, clear any selected radio button
    if (value.trim()) {
      setBusinessCategoryOptionValue('')
    }
  }

  return (
    <div className="flex items-center gap-3 p-2">
      <Input id={id} name={name} onChange={handleCustomInputChange} placeholder={placeholder} required type="text" value={customValue} />
    </div>
  )
}
