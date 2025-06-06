export interface CaseStudiesInterface {
  cases: CaseStudyInterface[]
  heading: string
  mainCase: CaseStudyInterface
}

export interface CaseStudiesProps {
  caseStudies: CaseStudiesInterface
}

export interface CaseStudyInfoInterafce {
  icon: 'Activity' | 'ArrowUp' | 'Lightbulb'
  label: string
  text: string | string[]
}

export interface CaseStudyInterface {
  imageData: {
    alt: string
    src: string
  }
  infoConfig: CaseStudyInfoInterafce[]
  title: string
}
