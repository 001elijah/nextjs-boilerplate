import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { HowItWorks, Pricing, Quiz } from '@/views'
import { Reviews } from '@/views'
import { WhyChooseUs } from '@/views'
import { CaseStudies } from '@/views'
import { HomeHero } from '@/views'

export default function Home() {
  const { HOME } = folderPaths
  const { hero, howItWorks, pricing, quiz } = getDataAction(HOME)
  return (
    <>
      {/*@ts-expect-error TS2739: Type { [key: string]: any; } is missing the following properties from type*/}
      <HomeHero hero={hero} />

      <Reviews />

      <WhyChooseUs />

      <CaseStudies />

      {/*@ts-expect-error TS2739: Type { [key: string]: any; } is missing the following properties from type*/}
      <Pricing pricing={pricing} />

      {/*@ts-expect-error TS2739: Type { [key: string]: any; } is missing the following properties from type*/}
      <Quiz quiz={quiz} />

      {/*@ts-expect-error TS2739: Type { [key: string]: any; } is missing the following properties from type*/}
      <HowItWorks howItWorks={howItWorks} />
    </>
  )
}
