// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import { Article, BeforeAfter, CaseStudies, Faq, HomeHero, HowItWorks, Pricing, Quiz, Reviews, WhyChooseUs } from '@/views'

export default function Home() {
  const { HOME } = folderPaths
  const { adsArticle, beforeAfter, caseStudies, faq, hero, howItWorks, pricing, quiz, reviews, seoArticle, whyChooseUs } = getDataAction(HOME)
  return (
    <>
      <HomeHero hero={hero} />

      <Reviews reviews={reviews} />

      <WhyChooseUs whyChooseUs={whyChooseUs} />

      <CaseStudies caseStudies={caseStudies} />

      <Pricing pricing={pricing} />

      <Quiz quiz={quiz} />

      <HowItWorks howItWorks={howItWorks} />

      <Faq faq={faq} />

      <Article article={seoArticle} />

      <BeforeAfter beforeAfter={beforeAfter} />

      <Article article={adsArticle} />
    </>
  )
}
