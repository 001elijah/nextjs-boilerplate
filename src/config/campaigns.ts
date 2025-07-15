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
  },
  {
    categories: [
      {
        icon: '',
        id: 'campaign-temperature',
        inputType: 'singleSelect',
        label: 'Select campaign audience temperature',
        options: [
          {
            icon: '',
            id: 'cold',
            label: 'Cold (never heard of you)',
            value: 'cold'
          },
          {
            icon: '',
            id: 'warm',
            label: 'Warm (familiar, not yet buying)',
            value: 'warm'
          },
          {
            icon: '',
            id: 'hot',
            label: 'Hot (already interacted or bought)',
            value: 'hot'
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
    id: 'temperature',
    question: 'What is your audience temperature?',
    step: 2,
    title: 'Audience Temperature'
  },
  {
    categories: [
      {
        icon: '',
        id: 'campaign-approach',
        inputType: 'singleSelect',
        label: 'Select campaign approach',
        options: [
          {
            icon: '',
            id: 'problem-focused',
            label: 'Problem-focused',
            value: 'problem-focused'
          },
          {
            icon: '',
            id: 'case-study',
            label: 'Case study / testimonial',
            value: 'case-study'
          },
          {
            icon: '',
            id: 'light',
            label: 'Humor / light tone',
            value: 'light'
          },
          {
            icon: '',
            id: 'expert',
            label: 'Expert authority',
            value: 'expert'
          },
          {
            icon: '',
            id: 'emotional',
            label: 'Emotional / storytelling',
            value: 'emotional'
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
    id: 'approach',
    question: 'What is your campaign approach?',
    step: 3,
    title: 'Campaign Angle / Approach'
  }
]
