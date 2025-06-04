// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { BeforeAfter, CaseStudies, Faq, HomeHero, HowItWorks, Pricing, Quiz, Reviews, SeoArticle, WhyChooseUs } from '@/views'

export default function Home() {
  const { HOME } = folderPaths
  const { beforeAfter, faq, hero, howItWorks, pricing, quiz, seoArticle } = getDataAction(HOME)
  return (
    <>
      <HomeHero hero={hero} />

      <Reviews />

      <WhyChooseUs />

      <CaseStudies />

      <Pricing pricing={pricing} />

      <Quiz quiz={quiz} />

      <HowItWorks howItWorks={howItWorks} />

      <Faq faq={faq} />

      <SeoArticle seoArticle={seoArticle} />

      <BeforeAfter beforeAfter={beforeAfter} />
    </>
  )
}
