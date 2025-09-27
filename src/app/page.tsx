// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getDataAction } from '@/lib/getDataAction'
import { folderPaths } from '@/utils/folderPaths'
import {
  Article,
  BeforeAfter,
  BoostYourSocials,
  CallToAction,
  CaseStudies,
  Faq,
  HomeHero,
  HowItWorks,
  Pricing,
  Quiz,
  Reviews,
  TrustBlock,
  WhyChooseUs
} from '@/views'
import { getStripeProductsAndPrices } from '@/utils/stripe/getStripeProductsAndPrices'

export default async function Home() {
  const { products, productsError, prices, pricesError } = await getStripeProductsAndPrices()

  const { HOME } = folderPaths
  const {
    adsArticle,
    beforeAfter,
    boostYourSocials,
    callToAction,
    caseStudies,
    faq,
    hero,
    howItWorks,
    pricing,
    quiz,
    reviews,
    seoArticle,
    trustBlock,
    whyChooseUs
  } = getDataAction(HOME)
  return (
    <>
      <HomeHero hero={hero} />

      <Reviews reviews={reviews} />

      <WhyChooseUs whyChooseUs={whyChooseUs} />

      <CaseStudies caseStudies={caseStudies} />

      <Pricing prices={prices ?? []} pricesError={pricesError} pricing={pricing} products={products ?? []} productsError={productsError} />

      <Quiz quiz={quiz} />

      <HowItWorks howItWorks={howItWorks} />

      <BoostYourSocials boostYourSocials={boostYourSocials} />

      <Faq faq={faq} />

      <Article article={seoArticle} />

      <BeforeAfter beforeAfter={beforeAfter} />

      <Article article={adsArticle} />

      <CallToAction callToAction={callToAction} />

      <TrustBlock trustBlock={trustBlock} />
    </>
  )
}
