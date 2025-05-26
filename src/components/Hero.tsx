import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/Button'

export const Hero = () => {
  return (
    <Section ariaLabel="Hero section" id="hero">
      <div className="w-full" style={{ backgroundImage: 'url(/bg-hero.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <Container className="py-12 min-h-screen">
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
          <div className="text-center">
            <div className="flex flex-wrap items-center gap-2 ml-auto mr-0">
              <Button size="lg">{'How it works'.toUpperCase()}</Button>
              <Button size="lg" variant={'secondary'}>
                {'Try for free'.toUpperCase()}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  )
}
