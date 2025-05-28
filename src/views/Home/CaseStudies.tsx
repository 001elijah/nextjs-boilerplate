import { Activity, ArrowUp, Lightbulb } from 'lucide-react'
import { Section } from '@/components'
import { Container } from '@/components'
import { CaseCardMain } from '@/components'
import { CaseCard } from '@/components'

export const CaseStudies = () => {
  const mainCaseCardConfig = {
    imageData: { alt: 'Spa Clinic NYC', src: '/success-story-1.jpg' },
    infoConfig: [
      {
        icon: <ArrowUp className="text-primary" size={24} />,
        label: '150%',
        text: 'Revenue in 3 months'
      },
      {
        icon: <Activity className="text-primary" size={24} />,
        label: 'Tools:',
        text: ['AI Ad Generator', 'Ad Design Tool', 'Personalized Video Ad Templates']
      },
      {
        icon: <Lightbulb className="text-primary" size={24} />,
        label: 'Quote:',
        text: '"We\'ve tried other ad creation software, but Dunamis was the first to actually drive real results"'
      }
    ],
    title: 'Spa Clinic NYC'
  }
  const caseCardsConfig = [
    {
      imageData: { alt: 'JD Solutions (B2B SaaS)', src: '/success-story-2.jpg' },
      infoConfig: [
        {
          icon: <ArrowUp className="text-primary" size={24} />,
          label: '+40%',
          text: 'Inbound leads'
        },
        {
          icon: <Activity className="text-primary" size={24} />,
          label: 'Tools:',
          text: ['create Facebook ads', 'AI marketing tools']
        },
        {
          icon: <Lightbulb className="text-primary" size={24} />,
          label: 'Quote:',
          text: '"Dunamis helped us to understand how to make an ad that converts - no guesswork"'
        }
      ],
      title: 'JD Solutions (B2B SaaS)'
    },
    {
      imageData: { alt: 'Boutique & You', src: '/success-story-3.jpg' },
      infoConfig: [
        {
          icon: <ArrowUp className="text-primary" size={24} />,
          label: '3.2x',
          text: 'ROAS in Week 1'
        },
        {
          icon: <Activity className="text-primary" size={24} />,
          label: 'Tools:',
          text: ['AI ad creator', 'custom brand templates']
        },
        {
          icon: <Lightbulb className="text-primary" size={24} />,
          label: 'Quote:',
          text: '"The whole process of ad creation feels like a real agency - but automated"'
        }
      ],
      title: 'Boutique & You'
    },
    {
      imageData: { alt: 'Travelify Digital', src: '/success-story-4.jpg' },
      infoConfig: [
        {
          icon: <ArrowUp className="text-primary" size={24} />,
          label: '80%',
          text: 'click-through rate'
        },
        {
          icon: <Activity className="text-primary" size={24} />,
          label: 'Tools:',
          text: ['ad design tool', 'guided content']
        },
        {
          icon: <Lightbulb className="text-primary" size={24} />,
          label: 'Quote:',
          text: '"Dunamis is not just a tool - it\'s a full-servise AI ad assistant"'
        }
      ],
      title: 'Travelify Digital'
    }
  ]
  return (
    <Section ariaLabel={'Success Stories with Dunamis'} id={'success-stories'}>
      <Container className={'flex flex-col items-center justify-center'}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gold">Case Studies</h2>
        <h4 className="text-lg mb-8 text-center">Real Growth with the Best AI Ad Generator</h4>
        <CaseCardMain imageData={mainCaseCardConfig.imageData} infoConfig={mainCaseCardConfig.infoConfig} title={mainCaseCardConfig.title} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {caseCardsConfig.map(({ imageData, infoConfig, title }, index) => (
            <CaseCard imageData={imageData} infoConfig={infoConfig} key={index} title={title} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
