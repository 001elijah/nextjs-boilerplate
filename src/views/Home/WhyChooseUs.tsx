import { BrainIcon, GraduationCapIcon, LucideProps, RocketIcon, ShieldCheck, TargetIcon, UserRoundCog } from 'lucide-react'
import { CardBorder, Container, Section } from '@/components'
import { FeatureItemInterface, WhyChooseUsProps } from '@/types'

const iconComponents: Record<FeatureItemInterface['icon'], React.ElementType<LucideProps>> = {
  BrainIcon,
  GraduationCapIcon,
  RocketIcon,
  ShieldCheck,
  TargetIcon,
  UserRoundCog
}

export const WhyChooseUs = ({ whyChooseUs }: WhyChooseUsProps) => {
  const iconConfig = {
    className: 'w-24 h-24 mb-4',
    color: '#9A8043',
    strokeWidth: 1
  }

  return (
    <Section ariaLabel="Why Choose Us section" id="why-choose-us">
      <Container>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why choose us</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-12">Trusted by 2,100+ companies worldwide</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.features.map((feature, index) => {
              const IconComponent = iconComponents[feature.icon]
              return (
                <CardBorder className="p-6 sm:p-8" key={index}>
                  {IconComponent ? <IconComponent {...iconConfig} /> : null}
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardBorder>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
