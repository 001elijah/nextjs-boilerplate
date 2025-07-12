'use client'

import { Upload, X } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'
import { cn } from '@/lib/utils'

interface FileInputProps {
  accept?: string
  className?: string
  disabled?: boolean
  id: string
  label: string
  onFileChange: (file: File | null) => void
  selectedFile?: File | null
}

export const FileInput = ({ accept, className, disabled = false, id, label, onFileChange, selectedFile }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFileChange(file)
  }

  const handleRemoveFile = () => {
    onFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>

      <div className="flex flex-col gap-2">
        {selectedFile ? (
          <div className="flex items-center justify-between p-3 bg-muted rounded-md border">
            <div className="flex items-center gap-2 min-w-0">
              <Upload className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm truncate">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground flex-shrink-0">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
            <button
              aria-label="Remove file"
              className="p-1 hover:bg-destructive/10 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={disabled}
              onClick={handleRemoveFile}
              type="button"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
          </div>
        ) : (
          <button
            className={cn(
              'flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-md transition-colors',
              'hover:border-primary hover:bg-primary/5',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            )}
            disabled={disabled}
            onClick={handleClick}
            type="button"
          >
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click to select a file</span>
          </button>
        )}

        <input accept={accept} className="hidden" disabled={disabled} id={id} onChange={handleFileChange} ref={fileInputRef} type="file" />
      </div>
    </div>
  )
}
