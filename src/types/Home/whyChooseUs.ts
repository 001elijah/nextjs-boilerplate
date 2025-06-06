export interface FeatureItemInterface {
  description: string
  icon: 'BrainIcon' | 'GraduationCapIcon' | 'RocketIcon' | 'ShieldCheck' | 'TargetIcon' | 'UserRoundCog'
  title: string
}

export interface WhyChooseUsProps {
  whyChooseUs: {
    features: FeatureItemInterface[]
  }
}
