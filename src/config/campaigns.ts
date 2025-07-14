import { ICampaignFormStep } from '@/types'

export const campaignFormConfig: ICampaignFormStep[] = [
  {
    categories: [
      {
        icon: '',
        id: 'campaign-goal',
        inputType: 'singleSelect',
        label: 'Select campaign goal',
        options: [
          {
            icon: '',
            id: 'attention',
            label: 'Grab attention',
            value: 'attention'
          },
          {
            icon: '',
            id: 'warm-up-audience',
            label: 'Warm up audience',
            value: 'warm up audience'
          },
          {
            icon: '',
            id: 'convert-to-sale',
            label: 'Convert to sale',
            value: 'convert to sale'
          },
          {
            icon: '',
            id: 'bring-back-past-clients',
            label: 'Bring back past clients',
            value: 'bring back past clients'
          },
          {
            icon: '',
            id: 'test-new-offer',
            label: 'Test new offer',
            value: 'test new offer'
          }
        ]
      },
      {
        icon: '✨',
        id: 'other',
        inputType: 'textInput',
        label: 'Other',
        placeholder: 'Enter custom promotion',
        value: ''
      }
    ],
    id: 'goal',
    question: 'What is your campaign goal?',
    step: 1,
    title: 'Campaign Goal'
  }
]
