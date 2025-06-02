'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const Modal = ({ children, isOpen, onOpenChange, title }: ModalProps) => {
  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} open={isOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-muted-foreground/75', // Original backdrop style
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            'duration-300' // Animation duration
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 w-9/10 translate-x-[-50%] translate-y-[-50%]', // Centering
            'rounded-lg bg-background p-8', // Original container styling
            'max-h-[80vh] overflow-y-auto', // Max height and scroll
            'duration-300 ease-in-out', // Base animation properties from original
            // Standard Radix/shadcn-like animations
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <DialogPrimitive.Title className="text-xl font-bold">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <X />
            </DialogPrimitive.Close>
          </div>
          <div className="modal-content">
            {children}
            <div className="mt-6 flex justify-end">
              <DialogPrimitive.Close asChild>
                <Button aria-label="Close" variant={'secondary'}>
                  CLOSE
                </Button>
              </DialogPrimitive.Close>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
