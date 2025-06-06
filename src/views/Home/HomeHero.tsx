import { Button, Container, Section } from '@/components'
import { HomeHeroProps } from '@/types'

export const HomeHero = ({ hero }: HomeHeroProps) => {
  return (
    <>
      {hero && (
        <Section ariaLabel="Hero section" id="hero">
          <div className="w-full" style={{ backgroundImage: 'url(/bg-hero.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <Container className="py-12 min-h-screen">
              <div className="text-center mb-12">
                <p className="text-lg text-muted-foreground mt-4 text-left">{hero?.hook}</p>
                <h1 className="text-4xl font-bold text-left">{hero?.heading}</h1>
                <p className="text-lg text-muted-foreground mt-4 text-left">{hero?.intro}</p>
              </div>
              <div className="text-center">
                <div className="flex flex-wrap items-center gap-2 ml-auto mr-0">
                  <Button size="lg">{hero?.howItWorks.toUpperCase()}</Button>
                  <Button size="lg" variant={'secondary'}>
                    {hero?.tryForFree.toUpperCase()}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </Section>
      )}
    </>
  )
}
