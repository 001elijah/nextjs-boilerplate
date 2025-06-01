import { PlayCircle } from 'lucide-react'
import { Container, Section } from '@/components'
import { HowItWorksProps } from '@/types'

export const HowItWorks = ({ howItWorks }: HowItWorksProps) => {
  return (
    <>
      {howItWorks && (
        <Section ariaLabel="How It Works" id="how-it-works">
          <Container>
            <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-2xl md:text-3xl mb-8">{howItWorks?.heading || 'How It Works'}</h2>
            <div className="relative aspect-video bg-slate-800 dark:bg-slate-900 rounded-lg flex items-center justify-center mb-8 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-20"></div>

              <div className="z-10 flex flex-col items-center cursor-pointer group">
                <PlayCircle
                  className="h-16 w-16 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300 ease-in-out sm:h-20 sm:w-20 md:h-24 md:w-24"
                  strokeWidth={1.5}
                />
                <p className="mt-2 text-sm text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300 ease-in-out sm:text-base">
                  Watch Video
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-black bg-opacity-30 backdrop-blur-sm flex items-center px-4">
                <div className="w-full h-1 bg-gray-600 rounded-full">
                  <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
