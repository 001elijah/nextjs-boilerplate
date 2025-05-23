'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { routes } from '@/config/routes'
import { useAuth } from '@/contexts/authContext'

export const AdGenerator = ({ isNewAd = true }: { isNewAd?: boolean } = {}) => {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const [showInput, setShowInput] = useState(true)
  const router = useRouter()
  const { user } = useAuth()

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = e.target.value
    setPrompt(newPrompt)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!user) return
    if (!prompt) return () => setError('Please enter your prompt')

    try {
      setLoading(true)
      setShowInput(false)

      console.log('Content generation using prompt...\nprompt:', prompt)

      const ad = {
        id: '1234567890'
      }

      router.push(routes.story(ad.id))
    } catch (error: unknown) {
      console.error('Error creating/finding transformation:', error)
      setError('Failed to create story. Please try again.')
      setShowInput(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {isNewAd && showInput && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Input
              className="text-center text-lg border-2 border-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm hover:border-yellow-600 transition-all h-12 dark:bg-stone-950 dark:border-yellow-500 dark:text-white dark:placeholder-gray-400 dark:focus:ring-yellow-400 dark:focus:border-yellow-400 w-full"
              onChange={handleInputChange}
              placeholder="Type your prompt here..."
              type="url"
              value={prompt}
            />
            <Button className="h-12" onClick={handleSubmit} size={'lg'}>
              {loading ? <LoadingSpinner /> : 'Submit'}
            </Button>
          </div>
          {error && (
            <div className="p-4 bg-purple-50 dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-purple-900">
              <p className="text-gray-700 dark:text-gray-300 mb-2">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
