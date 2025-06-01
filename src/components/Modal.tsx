'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

export const Modal = ({ children, isOpen, onCloseAction, title }: { children: React.ReactNode; isOpen: boolean; onCloseAction: () => any; title: string }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={cn('fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out', {
        'opacity-0 pointer-events-none': !isOpen,
        'opacity-100': isOpen
      })}
      onClick={onCloseAction}
    >
      {/* Opaque backdrop */}
      <div className="absolute inset-0 bg-muted-foreground opacity-75 transition-opacity duration-300" />

      {/* Modal content */}
      <div
        className={cn('relative bg-background rounded-lg p-8 max-w-5xl w-auto shadow-xl transform transition-all duration-300 ease-in-out max-h-[80vh]', {
          'opacity-0 scale-95 translate-y-4': !isOpen,
          'opacity-100 scale-100 translate-y-0': isOpen
        })}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <Button aria-label="Close modal" onClick={onCloseAction} variant={'ghost'}>
            <X />
          </Button>
        </div>
        <div className="modal-content">
          {children}
          <div className="mt-6 flex justify-end">
            <Button aria-label="Close modal" onClick={onCloseAction} variant={'secondary'}>
              CLOSE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
