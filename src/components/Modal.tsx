'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'

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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onCloseAction}
    >
      {/* Opaque backdrop */}
      <div className="absolute inset-0 bg-muted-foreground opacity-75 transition-opacity duration-300" />

      {/* Modal content */}
      <div
        className={`relative bg-background rounded-lg p-8 max-w-5xl w-auto shadow-xl transform transition-all duration-300 ease-in-out max-h-[90vh] ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <Button aria-label="Close modal" onClick={onCloseAction} variant={'ghost'}>
            ✕
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
