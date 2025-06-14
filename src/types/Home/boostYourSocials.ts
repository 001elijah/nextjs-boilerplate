export interface BoostYourSocialsProps {
  boostYourSocials: {
    buttonText: string
    cases: CaseInterface[]
    concerns: ConcernInterface[]
    heading: string
    hook: string
  }
}

export interface CaseInterface {
  improvements: string[]
  title: string
}

export interface ConcernInterface {
  icon: 'Ban' | 'ChartNoAxesCombined' | 'MapPin'
  text: string | string[]
  title: string
}
