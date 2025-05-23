'use client'

import { AdGenerator } from '@/components/AdGenerator'
import { Reviews } from '@/components/Reviews'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/contexts/authContext'
export default function Home() {
  const { loading, user } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pt-16">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground mt-4 text-left">{"We're your reliable and steady partner in advertising."}</p>
          <h1 className="text-4xl font-bold text-left">
            <span>Your success </span>
            <br />
            <span className="whitespace-nowrap">is our goal</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 text-left">
            {"We don't just sell ads, we provide personalized service that is guaranteed to drive you to success."}
          </p>
        </div>

        {user ? (
          <div className="w-full max-w-4xl mx-auto">
            <AdGenerator />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex flex-wrap items-center gap-2 ml-auto mr-0">
              <Button size="lg">{'How it works'.toUpperCase()}</Button>
              <Button size="lg" variant={'secondary'}>
                {'Try for free'.toUpperCase()}
              </Button>
            </div>
            <Reviews />
          </div>
        )}
      </div>
    </div>
  )
}
