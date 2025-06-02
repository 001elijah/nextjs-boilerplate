'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FaqItemProps {
  answer: string
  question: string
}

export const FaqItem = ({ answer, question }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="border-b border-gray-200 py-6">
      <div aria-expanded={isOpen} className="flex justify-between items-center md:cursor-pointer" onClick={toggleOpen}>
        <h3 className="text-lg font-medium text-gold">{question}</h3>
        <span className="ml-6 h-7 flex items-center">
          <ChevronDown aria-hidden="true" className={cn(isOpen ? 'rotate-180' : 'rotate-0', 'transition-transform duration-200 ease-in-out')} />
        </span>
      </div>
      <div className={cn('overflow-hidden transition-all duration-500 ease-in-out', isOpen ? 'max-h-screen opacity-100 mt-4 pr-12' : 'max-h-0 opacity-0')}>
        <p className="text-base text-muted-foreground">{answer}</p>
      </div>
    </div>
  )
}
