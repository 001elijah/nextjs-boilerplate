'use client'

import { useEffect, useRef } from 'react'
import { toast } from '@/components/ui/Toast'

export const NetworkMonitor = () => {
  const serviceErrorShown = useRef(false)

  useEffect(() => {
    const onOnline = () => {
      toast({
        message: 'Your internet connection has been restored',
        title: 'Connected',
        type: 'success'
      })
      // Reset service error flag when we're back online
      serviceErrorShown.current = false
    }

    const onOffline = () => {
      toast({
        message: 'You are currently offline. Some features may be unavailable.',
        title: 'No Internet',
        type: 'error'
      })
    }

    // Intercept all fetch requests to handle service unavailability
    const originalFetch = window.fetch
    window.fetch = async function (...args) {
      try {
        const response = await originalFetch(...args)

        // Reset service error flag on successful requests
        if (response.ok) {
          serviceErrorShown.current = false
        }

        // Handle service unavailable (503) or gateway timeout (504)
        if (response.status === 503 || response.status === 504) {
          if (!serviceErrorShown.current) {
            toast({
              message: 'Our service is temporarily unavailable. Please try again later.',
              title: 'Service Unavailable',
              type: 'error'
            })
            serviceErrorShown.current = true
          }
        }

        return response
      } catch (error) {
        // Handle network errors (failed to fetch)
        if (!serviceErrorShown.current && error instanceof TypeError && error.message === 'Failed to fetch') {
          toast({
            message: 'Unable to reach our servers. Please check your connection and try again.',
            title: 'Service Unavailable',
            type: 'error'
          })
          serviceErrorShown.current = true
        }
        throw error
      }
    }

    // Add event listeners for online/offline status
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    // Check initial state
    if (!navigator.onLine) {
      onOffline()
    }

    // Cleanup
    return () => {
      window.fetch = originalFetch
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  // This component doesn't render anything
  return null
}
