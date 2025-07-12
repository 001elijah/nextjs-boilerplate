'use client'

import { useEffect, useState } from 'react'
import { FileInput, PresetStepTitle } from '@/components'
import { Step, VisualFile, VisualsData } from '@/types'

interface BusinessVisualsStepProps {
  defaultValue: VisualsData
  isLoading: boolean
  step: Step
}

export const BusinessVisualsStep = ({ defaultValue, isLoading, step }: BusinessVisualsStepProps) => {
  const [visuals, setVisuals] = useState<VisualFile[]>((defaultValue as VisualFile[]) || [])

  useEffect(() => {
    setVisuals((defaultValue as VisualFile[]) || [])
  }, [defaultValue])

  const handleFileChange = (file: File | null, uploadId: string) => {
    setVisuals(prev => {
      if (file) {
        const newFile: VisualFile = Object.assign(file, { id: uploadId })
        const existingFileIndex = prev.findIndex(f => f.id === uploadId)

        if (existingFileIndex !== -1) {
          const updatedVisuals = [...prev]
          updatedVisuals[existingFileIndex] = newFile
          return updatedVisuals
        }
        return [...prev, newFile]
      } else {
        return prev.filter(f => f.id !== uploadId)
      }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <PresetStepTitle question={step.question || ''} title={step.title} />
      {step.uploads?.map((upload, index) => {
        const selectedFile = visuals.find(f => f.id === upload.id)
        const inputId = `${step.id}-${index}`
        return (
          <FileInput
            accept={upload.accept}
            disabled={isLoading}
            id={inputId}
            key={index}
            label={upload.label}
            onFileChange={file => handleFileChange(file, upload.id)}
            selectedFile={selectedFile || null}
          />
        )
      })}
      <input name={step.id} type="hidden" value={JSON.stringify(visuals)} />
    </div>
  )
}
