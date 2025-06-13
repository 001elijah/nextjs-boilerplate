export interface ActionCallInterface {
  buttonText: string
  icon: 'ChartNoAxesCombined' | 'CircleDollarSign' | 'HomeIcon'
  text: string | string[]
}

export interface CallToActionProps {
  callToAction: {
    actionCalls: ActionCallInterface[]
    buttonText: string
    heading: string
    hook: string
  }
}
