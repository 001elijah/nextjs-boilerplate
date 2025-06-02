import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { CaseStudies, Faq, HomeHero, HowItWorks, Pricing, Quiz, Reviews, WhyChooseUs } from '@/views'

export default function Home() {
  const { HOME } = folderPaths
  const { faq, hero, howItWorks, pricing, quiz } = getDataAction(HOME)
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

      {/*@ts-expect-error TS2739: Type { [key: string]: any; } is missing the following properties from type*/}
      <Faq faq={faq} />
    </>
  )
}
