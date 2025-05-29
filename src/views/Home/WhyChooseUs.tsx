import { BrainIcon, GraduationCapIcon, RocketIcon, ShieldCheck, TargetIcon, UserRoundCog } from 'lucide-react'
import { CardBorder, Section } from '@/components'
import { Container } from '@/components'

export const WhyChooseUs = () => {
  const iconConfig = {
    className: 'w-24 h-24 mb-4',
    color: '#9A8043',
    strokeWidth: 1
  }

  const features = [
    {
      description:
        "Gain expert knowledge through step-by-step training programs that boost ROI by an average of 150%. Our goal isn't just to generate — it's to make you smarter.",
      icon: <GraduationCapIcon {...iconConfig} />,
      title: 'Education & Results'
    },
    {
      description: 'Launch campaigns in under 60 seconds and start seeing qualified leads within 48–72 hours. No learning curve — just results.',
      icon: <RocketIcon {...iconConfig} />,
      title: 'Get Started Quickly'
    },
    {
      description: 'We analyze your niche, competitors, and positioning — then generate campaigns tailored to your tone, offer, and business goals.',
      icon: <TargetIcon {...iconConfig} />,
      title: 'Personalized Approach'
    },
    {
      description:
        'Stop wasting budget on underperforming ads. Our AI checks your creatives pre-launch and suggests improvements — cutting costs by up to 30%.',
      icon: <BrainIcon {...iconConfig} />,
      title: 'AI Ad Review'
    },
    {
      description:
        "You're not using a tool — you're hiring an AI-powered creative team. Campaigns come with strategy, structure, analytics, and ongoing optimization.",
      icon: <ShieldCheck {...iconConfig} />,
      title: 'AI-Powered Agency'
    },
    {
      description:
        'No designer? No strategist? No problem. You get a built-in creative team plus an AI project manager to guide you toward better performance.',
      icon: <UserRoundCog {...iconConfig} />,
      title: 'Team Management'
    }
  ]

  return (
    <Section ariaLabel="Why Choose Us section" id="why-choose-us">
      <Container>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why choose us</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-12">Trusted by 2,100+ companies worldwide</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <CardBorder className="p-6 sm:p-8" key={index}>
                {feature.icon}
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardBorder>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
