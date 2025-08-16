import { useEffect, useState } from 'react'
import { toast } from '@/components/Toast'
import { useAuth } from '@/contexts'

type FetcherFunction<T> = () => Promise<FetchResult<T>>

interface FetchResult<T> {
  data: T[]
  error?: null | string
  needsAuth?: boolean
}

interface UseFetchUserPresetsOptions {
  errorMessage: string
  errorTitle: string
  unauthorizedMessage: string
  unauthorizedTitle: string
}

export const useFetchUserPresets = <T,>(fetcher: FetcherFunction<T>, options: UseFetchUserPresetsOptions) => {
  const { signOut } = useAuth()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetcher()

        if (result.needsAuth) {
          toast({
            message: options.unauthorizedMessage,
            title: options.unauthorizedTitle,
            type: 'error'
          })
          // Set data to empty array or current data if needsAuth happens before data is fully loaded
          setData(result.data || [])
          await signOut()
          return
        }

        if (result.error) {
          console.error(`Error fetching:`, result.error)
          toast({
            message: result.error,
            title: options.errorTitle,
            type: 'error'
          })
          setError(result.error)
        } else {
          setData(result.data || [])
        }
      } catch (err) {
        console.error(`Failed to fetch:`, err)
        toast({
          message: options.errorMessage,
          title: options.errorTitle,
          type: 'error'
        })
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetcher, signOut, options.unauthorizedMessage, options.unauthorizedTitle, options.errorMessage, options.errorTitle])

  return { data, error, loading, setData }
}
