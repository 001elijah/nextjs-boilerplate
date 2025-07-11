import { Step } from '@/types'

export const presetFormConfig: Step[] = [
  {
    id: 'type',
    inputType: 'singleSelect',
    options: [
      {
        icon: '',
        id: 'online',
        label: 'Online only',
        value: 'online'
      },
      {
        icon: '',
        id: 'offline',
        label: 'Local / Offline only',
        value: 'offline'
      },
      {
        icon: '',
        id: 'both',
        label: 'Both online and offline',
        value: 'both'
      }
    ],
    question: 'Which best describes your business?',
    step: 1,
    title: 'Business Type'
  },
  {
    id: 'name',
    inputType: 'textInput',
    placeholder: 'Enter your business name',
    question: 'What is your business name?',
    step: 2,
    title: 'Business Name'
  },

  {
    categories: [
      {
        categoryOptions: [
          {
            icon: '',
            id: 'digital',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'smm',
                label: 'SMM / Targeting',
                value: 'smm'
              },
              {
                icon: '',
                id: 'seo',
                label: 'SEO / PPC Advertising',
                value: 'seo'
              },
              {
                icon: '',
                id: 'web-design',
                label: 'Web Design / UI/UX',
                value: 'web design'
              },
              {
                icon: '',
                id: 'web-dev',
                label: 'Website & App Development',
                value: 'web development'
              },
              {
                icon: '',
                id: 'email-marketing',
                label: 'Email Marketing / CRM Automation',
                value: 'email marketing'
              },
              {
                icon: '',
                id: 'copywriting',
                label: 'Copywriting / Content Writing',
                value: 'copywriting'
              },
              {
                icon: '',
                id: 'support',
                label: 'Tech Support / Outsourcing',
                value: 'support'
              }
            ],
            title: 'Digital Services',
            value: 'digital services'
          },
          {
            icon: '',
            id: 'e-commerce',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'stores',
                label: 'Online Stores (clothing, cosmetics, electronics)',
                value: 'stores'
              },
              {
                icon: '',
                id: 'dropshipping',
                label: 'Dropshipping',
                value: 'dropshipping'
              },

              {
                icon: '',
                id: 'etsy-amazon-shopify',
                label: 'Etsy / Amazon / Shopify Brands',
                value: 'etsy amazon shopify'
              },
              {
                icon: '',
                id: 'digital-products',
                label: 'Digital Products (templates, music, icons)',
                value: 'digital products'
              },
              {
                icon: '',
                id: 'subscriptions',
                label: 'Subscriptions & Paid Access',
                value: 'subscriptions'
              }
            ],
            title: 'Online Commerce',
            value: 'online commerce'
          },
          {
            icon: '',
            id: 'education',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'courses',
                label: 'Online Courses (professions, hobbies, creativity)',
                value: 'courses'
              },
              {
                icon: '',
                id: 'language-schools',
                label: 'Language Schools',
                value: 'language schools'
              },
              {
                icon: '',
                id: 'mentorship',
                label: 'Mentors & Coaches (finance, business, personal growth)',
                value: 'mentorship'
              },
              {
                icon: '',
                id: 'tutoring',
                label: 'Tutors (school subjects, test prep)',
                value: 'tutoring'
              },
              {
                icon: '',
                id: 'webinars',
                label: 'Webinars / Intensives / Challenges',
                value: 'webinars'
              }
            ],
            title: 'Education & Coaching',
            value: 'education'
          },
          {
            icon: '',
            id: 'personal-brands-experts',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'influencers',
                label: 'Influencers / Bloggers',
                value: 'influencers'
              },
              {
                icon: '',
                id: 'personal-brands',
                label: 'Personal Brands (astrology, psychology, nutrition)',
                value: 'personal brands'
              },
              {
                icon: '',
                id: 'authors',
                label: 'Authors (books, guides, methods)',
                value: 'authors'
              },

              {
                icon: '',
                id: 'producers',
                label: 'Producers / Media Managers',
                value: 'producers'
              },
              {
                icon: '',
                id: 'consultants',
                label: 'Online Consultants (lawyers, therapists, stylists)',
                value: 'consultants'
              }
            ],
            title: 'Personal Brands & Experts',
            value: 'personal brands'
          },
          {
            icon: '',
            id: 'finance-crypto',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'crypto-nft',
                label: 'Crypto Projects / NFT',
                value: 'crypto projects and NFT'
              },
              {
                icon: '',
                id: 'investment-platforms',
                label: 'Investment Platforms',
                value: 'investment platforms'
              },
              {
                icon: '',
                id: 'financial-advisors',
                label: 'Financial Advisors',
                value: 'financial advisors'
              },
              {
                icon: '',
                id: 'trading-courses',
                label: 'Trading Courses',
                value: 'trading courses'
              },
              {
                icon: '',
                id: 'analytics-signals-communities',
                label: 'Signals / Analytics / Communities',
                value: 'analytics and signals and communities'
              }
            ],
            title: 'Finance & Crypto',
            value: 'finance and crypto'
          },
          {
            icon: '',
            id: 'wellness-lifestyle',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'online-fitness',
                label: 'Online Fitness',
                value: 'online fitness'
              },
              {
                icon: '',
                id: 'yoga-and-breathing',
                label: 'Yoga & Breathing Practices',
                value: 'yoga and breathing practices'
              },
              {
                icon: '',
                id: 'dietitians-and-nutritionists',
                label: 'Dietitians / Nutritionists',
                value: 'dietitians and nutritionists'
              },
              {
                icon: '',
                id: 'mental-health-and-meditation',
                label: 'Mental Health & Meditation',
                value: 'mental health and meditation'
              }
            ],
            title: 'Wellness & Lifestyle',
            value: 'wellness and lifestyle'
          },
          {
            icon: '',
            id: 'events-communities',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'online-clubs',
                label: 'Online Clubs',
                value: 'online clubs'
              },
              {
                icon: '',
                id: 'private-communities',
                label: 'Private Communities',
                value: 'private communities'
              },
              {
                icon: '',
                id: 'paid-zoom-calls',
                label: 'Paid Zoom Calls',
                value: 'paid zoom calls'
              },
              {
                icon: '',
                id: 'conferences-and-workshops',
                label: 'Conferences & Workshops',
                value: 'conferences and workshops'
              }
            ],
            title: 'Events & Communities',
            value: 'events and communities'
          },
          {
            icon: '✨',
            id: 'other',
            inputType: 'textInput',
            placeholder: 'Enter your option',
            title: 'Other',
            value: ''
          }
        ],
        id: 'online',
        title: 'Online Categories',
        value: 'online'
      },
      {
        categoryOptions: [
          {
            icon: '',
            id: 'beauty-health',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'hair-salon',
                label: 'Hair Salon',
                value: 'hair salon'
              },
              {
                icon: '',
                id: 'nail-studio',
                label: 'Nail Studio',
                value: 'nail studio'
              },
              {
                icon: '',
                id: 'beauty-and-spa',
                label: 'Beauty Salon / Spa',
                value: 'beauty salon and spa'
              },
              {
                icon: '',
                id: 'massage-therapist',
                label: 'Massage Therapist',
                value: 'massage therapist'
              },
              {
                icon: '',
                id: 'cosmetic-services',
                label: 'Cosmetic Services',
                value: 'cosmetic services'
              },
              {
                icon: '',
                id: 'tattoo-studio',
                label: 'Tattoo Studio',
                value: 'tattoo studio'
              },
              {
                icon: '',
                id: 'dental-clinic',
                label: 'Dental Clinic',
                value: 'dental clinic'
              },
              {
                icon: '',
                id: 'physical-therapy',
                label: 'Physical Therapy',
                value: 'physical therapy'
              },
              {
                icon: '',
                id: 'aesthetic-medicine',
                label: 'Aesthetic Medicine',
                value: 'aesthetic medicine'
              }
            ],
            title: 'Beauty & Health',
            value: 'beauty and health'
          },
          {
            icon: '️',
            id: 'food-hospitality',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'cafe',
                label: 'Café',
                value: 'cafe'
              },
              {
                icon: '',
                id: 'restaurant',
                label: 'Restaurant',
                value: 'restaurant'
              },
              {
                icon: '',
                id: 'food-truck',
                label: 'Food Truck',
                value: 'food truck'
              },
              {
                icon: '',
                id: 'catering-service',
                label: 'Catering Service',
                value: 'catering service'
              },
              {
                icon: '',
                id: 'bakery-or-pastry',
                label: 'Bakery / Pastry Shop',
                value: 'bakery or pastry shop'
              },
              {
                icon: '',
                id: 'local-grocery-or-market',
                label: 'Local Grocery / Market',
                value: 'local grocery or market'
              }
            ],
            title: 'Food & Hospitality',
            value: 'food and hospitality'
          },
          {
            icon: '️',
            id: 'fitness-sports',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'gym',
                label: 'Gym',
                value: 'gym'
              },
              {
                icon: '',
                id: 'personal-trainer',
                label: 'Personal Trainer',
                value: 'personal trainer'
              },
              {
                icon: '',
                id: 'yoga-studio',
                label: 'Yoga Studio',
                value: 'yoga studio'
              },
              {
                icon: '',
                id: 'dance-school',
                label: 'Dance School',
                value: 'dance school'
              },
              {
                icon: '',
                id: 'martial-arts-school',
                label: 'Martial Arts School',
                value: 'martial arts school'
              },
              {
                icon: '',
                id: 'crossfit-or-bootcamp',
                label: 'CrossFit / Bootcamp',
                value: 'crossfit or bootcamp'
              }
            ],
            title: 'Fitness & Sports',
            value: 'fitness and sports'
          },
          {
            icon: '',
            id: 'home-construction',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'general-contractor',
                label: 'General Contractor',
                value: 'general contractor'
              },
              {
                icon: '',
                id: 'electrician',
                label: 'Electrician',
                value: 'electrician'
              },
              {
                icon: '',
                id: 'plumber',
                label: 'Plumber',
                value: 'plumber'
              },

              {
                icon: '',
                id: 'tiler-or-flooring',
                label: 'Tiler / Flooring',
                value: 'tiler or flooring'
              },
              {
                icon: '',
                id: 'roofer',
                label: 'Roofer',
                value: 'roofer'
              },
              {
                icon: '',
                id: 'landscaping-or-gardening',
                label: 'Landscaping / Gardening',
                value: 'landscaping or gardening'
              },
              {
                icon: '',
                id: 'hvac-services',
                label: 'HVAC Services',
                value: 'HVAC services'
              },
              {
                icon: '',
                id: 'handyman',
                label: 'Handyman',
                value: 'handyman'
              },
              {
                icon: '',
                id: 'window-or-door',
                label: 'Window / Door Installation',
                value: 'window or door installation'
              }
            ],
            title: 'Construction & Home Services',
            value: 'construction and home services'
          },
          {
            icon: '',
            id: 'transport',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'car-repair-shop',
                label: 'Car Repair Shop',
                value: 'car repair shop'
              },
              {
                icon: '',
                id: 'car-wash-or-detailing',
                label: 'Car Wash / Detailing',
                value: 'car wash or detailing'
              },
              {
                icon: '',
                id: 'auto-dealership',
                label: 'Auto Dealership',
                value: 'auto dealership'
              },
              {
                icon: '',
                id: 'tire-service',
                label: 'Tire Service',
                value: 'tire service'
              },
              {
                icon: '',
                id: 'tow-truck-or-roadside-assistance',
                label: 'Tow Truck / Roadside Assistance',
                value: 'tow truck or roadside assistance'
              }
            ],
            title: 'Auto & Transport',
            value: 'auto and transport'
          },
          {
            icon: '️',
            id: 'retail',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'clothing-boutique',
                label: 'Clothing Boutique',
                value: 'clothing boutique'
              },
              {
                icon: '',
                id: 'shoe-store',
                label: 'Shoe Store',
                value: 'shoe store'
              },
              {
                icon: '',
                id: 'electronics-store',
                label: 'Electronics Store',
                value: 'electronics store'
              },

              {
                icon: '',
                id: 'furniture-or-home-goods',
                label: 'Furniture / Home Goods',
                value: 'furniture or home goods'
              },
              {
                icon: '',
                id: 'gift-shop-or-souvenirs',
                label: 'Gift Shop / Souvenirs',
                value: 'gift shop or souvenirs'
              },
              {
                icon: '',
                id: 'mobile-or-tech-accessories',
                label: 'Mobile / Tech Accessories',
                value: 'mobile or tech accessories'
              }
            ],
            title: 'Retail & Local Shops',
            value: 'retail and local shops'
          },
          {
            icon: '',
            id: 'real-estate',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'real-estate-agency',
                label: 'Real Estate Agency',
                value: 'real estate agency'
              },
              {
                icon: '',
                id: 'mortgage-broker',
                label: 'Mortgage Broker',
                value: 'mortgage broker'
              },
              {
                icon: '',
                id: 'property-management',
                label: 'Property Management',
                value: 'property management'
              },
              {
                icon: '',
                id: 'moving-company',
                label: 'Moving Company',
                value: 'moving company'
              },
              {
                icon: '',
                id: 'storage-services',
                label: 'Storage Services',
                value: 'storage services'
              }
            ],
            title: 'Real Estate & Services',
            value: 'real estate and services'
          },
          {
            icon: '',
            id: 'kids-education',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'kindergarten-or-preschool',
                label: 'Kindergarten / Preschool',
                value: 'kindergarten or preschool'
              },
              {
                icon: '',
                id: 'activity-center-for-children',
                label: "Children's Activity Center",
                value: 'activity center for children'
              },
              {
                icon: '',
                id: 'tutoring-center',
                label: 'Tutoring Center',
                value: 'tutoring center'
              },

              {
                icon: '',
                id: 'language-school',
                label: 'Language School',
                value: 'language school'
              },
              {
                icon: '',
                id: 'driving-school',
                label: 'Driving School',
                value: 'driving school'
              },
              {
                icon: '',
                id: 'music-or-art-school',
                label: 'Music / Art School',
                value: 'music or art school'
              }
            ],
            title: 'Education & Kids',
            value: 'education and kids'
          },
          {
            icon: '',
            id: 'media',
            inputType: 'singleSelect',
            options: [
              {
                icon: '',
                id: 'photographer',
                label: 'Photographer (studio or event)',
                value: 'photographer'
              },
              {
                icon: '',
                id: 'videographer',
                label: 'Videographer',
                value: 'videographer'
              },
              {
                icon: '',
                id: 'printing-services',
                label: 'Printing Services',
                value: 'printing services'
              },
              {
                icon: '',
                id: 'design-and-branding-studio',
                label: 'Design & Branding Studio',
                value: 'design and branding studio'
              }
            ],
            title: 'Photography & Media',
            value: 'photography and media'
          },
          {
            icon: '✨',
            id: 'other',
            inputType: 'textInput',
            placeholder: 'Enter your option',
            title: 'Other',
            value: ''
          }
        ],
        id: 'offline',
        title: 'Offline Categories',
        value: 'offline'
      }
    ],
    id: 'category',
    question: 'Select your business category and subcategory',
    step: 3,
    title: 'Business Category'
  },
  {
    categories: [
      {
        id: 'demographics',
        inputType: 'singleSelect',
        options: [
          {
            icon: '',
            id: 'f-18-25',
            label: 'Women 18–25',
            value: 'female 18 to 25'
          },
          {
            icon: '‍',
            id: 'f-26-40',
            label: 'Women 26–40',
            value: 'female 26 to 40'
          },
          {
            icon: '',
            id: 'f-40-plus',
            label: 'Women 40+',
            value: 'female 40 and older'
          },
          {
            icon: '',
            id: 'm-18-25',
            label: 'Men 18–25',
            value: 'male 18 to 25'
          },
          {
            icon: '‍',
            id: 'm-26-40',
            label: 'Men 26–40',
            value: 'male 26 to 40'
          },
          {
            icon: '',
            id: 'm-40-plus',
            label: 'Men 40+',
            value: 'male 40 and older'
          },
          {
            icon: '‍‍‍',
            id: 'families-with-kids',
            label: 'Families with kids',
            value: 'families with kids'
          },
          {
            icon: '',
            id: 'seniors-65-plus',
            label: 'Seniors (65+)',
            value: 'seniors 65 and older'
          },
          {
            icon: '',
            id: 'teens-or-students',
            label: 'Teens / Students',
            value: 'teens or students'
          },
          {
            icon: '✨',
            id: 'other',
            inputType: 'textInput',
            label: 'Other',
            placeholder: 'Enter your option',
            value: ''
          }
        ],
        title: 'Demographics',
        value: 'demographics'
      },
      {
        id: 'professionalType',
        inputType: 'singleSelect',
        options: [
          {
            icon: '',
            id: 'small-business-owners',
            label: 'Small business owners',
            value: 'small business owners'
          },
          {
            icon: '',
            id: 'freelancers',
            label: 'Freelancers',
            value: 'freelancers'
          },
          {
            icon: '',
            id: 'working-professionals',
            label: 'Working professionals',
            value: 'working professionals'
          },
          {
            icon: '',
            id: 'company-decision-makers-B2B',
            label: 'Company decision-makers (B2B)',
            value: 'company decision-makers B2B'
          },
          {
            icon: '',
            id: 'recruiters',
            label: 'HR / Recruiters',
            value: 'recruiters'
          },
          {
            icon: '',
            id: 'coaches-or-experts',
            label: 'Coaches / Experts',
            value: 'coaches or experts'
          },
          {
            icon: '‍‍‍',
            id: 'parents-managing-home-purchases',
            label: 'Parents managing home purchases',
            value: 'parents managing home purchases'
          },
          {
            icon: '✨',
            id: 'other',
            inputType: 'textInput',
            label: 'Other',
            placeholder: 'Enter your option',
            value: ''
          }
        ],
        title: 'Professional Role / Buyer Type',
        value: 'buyer type'
      },
      {
        id: 'painPoint',
        inputType: 'multiSelect',
        maxSelections: 2,
        options: [
          {
            icon: '',
            id: 'looking-for-a-service-like-yours',
            label: 'Looking for a service like yours',
            value: 'looking for a service like yours'
          },
          {
            icon: '⏰',
            id: 'save-time',
            label: 'Want to save time',
            value: 'save time'
          },
          {
            icon: '',
            id: 'save-money',
            label: 'Want to save money',
            value: 'save money'
          },
          {
            icon: '',
            id: 'expert-guidance',
            label: 'Need expert guidance',
            value: 'expert guidance'
          },
          {
            icon: '',
            id: 'feel-frustrated-or-stuck',
            label: 'Feel frustrated or stuck',
            value: 'feel frustrated or stuck'
          },
          {
            icon: '',
            id: 'searching-for-better-alternatives',
            label: 'Searching for better alternatives',
            value: 'searching for better alternatives'
          },
          {
            icon: '',
            id: 'curious-but-not-ready-to-buy',
            label: 'Curious but not ready to buy',
            value: 'curious but not ready to buy'
          },
          {
            icon: '✨',
            id: 'other',
            inputType: 'textInput',
            label: 'Other',
            placeholder: 'Enter your option',
            value: ''
          }
        ],
        title: 'Buying Intent or Pain Point',
        value: 'pain point'
      }
    ],
    id: 'customer',
    question: 'Who is your ideal customer?',
    step: 4,
    title: 'Ideal Customer'
  },
  {
    categories: [
      {
        id: 'country',
        inputType: 'textInput',
        placeholder: 'Enter country',
        title: 'Country'
      },
      {
        id: 'state',
        inputType: 'textInput',
        placeholder: 'Enter state / province',
        title: 'State / Province'
      },
      {
        id: 'region',
        inputType: 'textInput',
        placeholder: 'Enter region',
        title: 'Region'
      },
      {
        id: 'city',
        inputType: 'textInput',
        placeholder: 'Enter city',
        title: 'City'
      },
      {
        id: 'zip',
        inputType: 'textInput',
        placeholder: 'Enter ZIP / Postal Code',
        title: 'ZIP / Postal Code'
      }
    ],
    id: 'location',
    question: 'Where is your business located?',
    step: 5,
    title: 'Business Location'
  },
  {
    categories: [
      {
        icon: '',
        id: 'target-regions',
        inputType: 'multiSelect',
        label: 'Select regions',
        options: [
          {
            icon: '🇺🇸',
            id: 'USA',
            label: 'United States',
            value: 'united states'
          },
          {
            icon: '🇨🇦',
            id: 'CAN',
            label: 'Canada',
            value: 'canada'
          },
          {
            icon: '🇬🇧',
            id: 'GBR',
            label: 'United Kingdom',
            value: 'united kingdom'
          },
          {
            icon: '🇩🇪',
            id: 'DEU',
            label: 'Germany',
            value: 'germany'
          },
          {
            icon: '🇫🇷',
            id: 'FRA',
            label: 'France',
            value: 'france'
          },
          {
            icon: '🇮🇹',
            id: 'ITA',
            label: 'Italy',
            value: 'italy'
          },
          {
            icon: '🇪🇸',
            id: 'ESP',
            label: 'Spain',
            value: 'spain'
          },
          {
            icon: '🇳🇱',
            id: 'NLD',
            label: 'Netherlands',
            value: 'netherlands'
          },
          {
            icon: '🇸🇪',
            id: 'SWE',
            label: 'Sweden',
            value: 'sweden'
          },
          {
            icon: '🇳🇴',
            id: 'NOR',
            label: 'Norway',
            value: 'norway'
          },
          {
            icon: '🇩🇰',
            id: 'DNK',
            label: 'Denmark',
            value: 'denmark'
          },
          {
            icon: '🇫🇮',
            id: 'FIN',
            label: 'Finland',
            value: 'finland'
          },
          {
            icon: '🇨🇭',
            id: 'CHE',
            label: 'Switzerland',
            value: 'switzerland'
          },
          {
            icon: '🇦🇹',
            id: 'AUT',
            label: 'Austria',
            value: 'austria'
          },
          {
            icon: '🇧🇪',
            id: 'BEL',
            label: 'Belgium',
            value: 'belgium'
          },
          {
            icon: '🇮🇪',
            id: 'IRL',
            label: 'Ireland',
            value: 'ireland'
          },
          {
            icon: '🇵🇹',
            id: 'PRT',
            label: 'Portugal',
            value: 'portugal'
          },
          {
            icon: '🇬🇷',
            id: 'GRC',
            label: 'Greece',
            value: 'greece'
          },
          {
            icon: '🇵🇱',
            id: 'POL',
            label: 'Poland',
            value: 'poland'
          },
          {
            icon: '🇨🇿',
            id: 'CZE',
            label: 'Czech Republic',
            value: 'czech republic'
          },
          {
            icon: '🇭🇺',
            id: 'HUN',
            label: 'Hungary',
            value: 'hungary'
          },
          {
            icon: '🇸🇰',
            id: 'SVK',
            label: 'Slovakia',
            value: 'slovakia'
          },
          {
            icon: '🇸🇮',
            id: 'SVN',
            label: 'Slovenia',
            value: 'slovenia'
          },
          {
            icon: '🇭🇷',
            id: 'HRV',
            label: 'Croatia',
            value: 'croatia'
          },
          {
            icon: '🇷🇴',
            id: 'ROU',
            label: 'Romania',
            value: 'romania'
          },
          {
            icon: '🇧🇬',
            id: 'BGR',
            label: 'Bulgaria',
            value: 'bulgaria'
          },
          {
            icon: '🇷🇺',
            id: 'RUS',
            label: 'Russia',
            value: 'russia'
          },
          {
            icon: '🇺🇦',
            id: 'UKR',
            label: 'Ukraine',
            value: 'ukraine'
          },
          {
            icon: '🇧🇾',
            id: 'BLR',
            label: 'Belarus',
            value: 'belarus'
          },
          {
            icon: '🇱🇹',
            id: 'LTU',
            label: 'Lithuania',
            value: 'lithuania'
          },
          {
            icon: '🇱🇻',
            id: 'LVA',
            label: 'Latvia',
            value: 'latvia'
          },
          {
            icon: '🇪🇪',
            id: 'EST',
            label: 'Estonia',
            value: 'estonia'
          },
          {
            icon: '🇮🇸',
            id: 'ISL',
            label: 'Iceland',
            value: 'iceland'
          },
          {
            icon: '🇦🇺',
            id: 'AUS',
            label: 'Australia',
            value: 'australia'
          },
          {
            icon: '🇳🇿',
            id: 'NZL',
            label: 'New Zealand',
            value: 'new zealand'
          },
          {
            icon: '🇯🇵',
            id: 'JPN',
            label: 'Japan',
            value: 'japan'
          },
          {
            icon: '🇰🇷',
            id: 'KOR',
            label: 'South Korea',
            value: 'south korea'
          },
          {
            icon: '🇨🇳',
            id: 'CHN',
            label: 'China',
            value: 'china'
          },
          {
            icon: '🇮🇳',
            id: 'IND',
            label: 'India',
            value: 'india'
          },
          {
            icon: '🇸🇬',
            id: 'SGP',
            label: 'Singapore',
            value: 'singapore'
          },
          {
            icon: '🇭🇰',
            id: 'HKG',
            label: 'Hong Kong',
            value: 'hong kong'
          },
          {
            icon: '🇹🇼',
            id: 'TWN',
            label: 'Taiwan',
            value: 'taiwan'
          },
          {
            icon: '🇹🇭',
            id: 'THA',
            label: 'Thailand',
            value: 'thailand'
          },
          {
            icon: '🇻🇳',
            id: 'VNM',
            label: 'Vietnam',
            value: 'vietnam'
          },
          {
            icon: '🇵🇭',
            id: 'PHL',
            label: 'Philippines',
            value: 'philippines'
          },
          {
            icon: '🇮🇩',
            id: 'IDN',
            label: 'Indonesia',
            value: 'indonesia'
          },
          {
            icon: '🇲🇾',
            id: 'MYS',
            label: 'Malaysia',
            value: 'malaysia'
          },
          {
            icon: '🇧🇷',
            id: 'BRA',
            label: 'Brazil',
            value: 'brazil'
          },
          {
            icon: '🇦🇷',
            id: 'ARG',
            label: 'Argentina',
            value: 'argentina'
          },
          {
            icon: '🇲🇽',
            id: 'MEX',
            label: 'Mexico',
            value: 'mexico'
          },
          {
            icon: '🇨🇱',
            id: 'CHL',
            label: 'Chile',
            value: 'chile'
          },
          {
            icon: '🇨🇴',
            id: 'COL',
            label: 'Colombia',
            value: 'colombia'
          },
          {
            icon: '🇵🇪',
            id: 'PER',
            label: 'Peru',
            value: 'peru'
          },
          {
            icon: '🇺🇾',
            id: 'URY',
            label: 'Uruguay',
            value: 'uruguay'
          },
          {
            icon: '🇿🇦',
            id: 'ZAF',
            label: 'South Africa',
            value: 'south africa'
          },
          {
            icon: '🇳🇬',
            id: 'NGA',
            label: 'Nigeria',
            value: 'nigeria'
          },
          {
            icon: '🇪🇬',
            id: 'EGY',
            label: 'Egypt',
            value: 'egypt'
          },
          {
            icon: '🇰🇪',
            id: 'KEN',
            label: 'Kenya',
            value: 'kenya'
          },
          {
            icon: '🇲🇦',
            id: 'MAR',
            label: 'Morocco',
            value: 'morocco'
          },
          {
            icon: '🇹🇷',
            id: 'TUR',
            label: 'Turkey',
            value: 'turkey'
          },
          {
            icon: '🇮🇱',
            id: 'ISR',
            label: 'Israel',
            value: 'israel'
          },
          {
            icon: '🇸🇦',
            id: 'SAU',
            label: 'Saudi Arabia',
            value: 'saudi arabia'
          },
          {
            icon: '🇦🇪',
            id: 'ARE',
            label: 'United Arab Emirates',
            value: 'united arab emirates'
          }
        ]
      },
      {
        icon: '✨',
        id: 'other',
        inputType: 'textInput',
        label: 'Other',
        placeholder: 'Enter custom region',
        value: ''
      }
    ],
    id: 'regions',
    question: 'What regions or countries do you want to target?',
    step: 6,
    title: 'Target Regions'
  },
  {
    categories: [
      {
        icon: '',
        id: 'audience-language',
        inputType: 'singleSelect',
        label: 'Select language',
        options: [
          {
            id: 'lang-en',
            label: 'English',
            value: 'en'
          },
          {
            id: 'lang-es',
            label: 'Spanish',
            value: 'es'
          },
          {
            id: 'lang-fr',
            label: 'French',
            value: 'fr'
          },
          {
            id: 'lang-de',
            label: 'German',
            value: 'de'
          },
          {
            id: 'lang-zh',
            label: 'Chinese (Simplified)',
            value: 'zh'
          },
          {
            id: 'lang-ja',
            label: 'Japanese',
            value: 'ja'
          },
          {
            id: 'lang-ru',
            label: 'Russian',
            value: 'ru'
          },
          {
            id: 'lang-pt',
            label: 'Portuguese',
            value: 'pt'
          },
          {
            id: 'lang-it',
            label: 'Italian',
            value: 'it'
          },
          {
            id: 'lang-ko',
            label: 'Korean',
            value: 'ko'
          },
          {
            id: 'lang-hi',
            label: 'Hindi',
            value: 'hi'
          },
          {
            id: 'lang-ar',
            label: 'Arabic',
            value: 'ar'
          },
          {
            id: 'lang-tr',
            label: 'Turkish',
            value: 'tr'
          },
          {
            id: 'lang-pl',
            label: 'Polish',
            value: 'pl'
          },
          {
            id: 'lang-nl',
            label: 'Dutch',
            value: 'nl'
          },
          {
            id: 'lang-sv',
            label: 'Swedish',
            value: 'sv'
          },
          {
            id: 'lang-no',
            label: 'Norwegian',
            value: 'no'
          },
          {
            id: 'lang-da',
            label: 'Danish',
            value: 'da'
          },
          {
            id: 'lang-fi',
            label: 'Finnish',
            value: 'fi'
          },
          {
            id: 'lang-el',
            label: 'Greek',
            value: 'el'
          },
          {
            id: 'lang-id',
            label: 'Indonesian',
            value: 'id'
          },
          {
            id: 'lang-ms',
            label: 'Malay',
            value: 'ms'
          },
          {
            id: 'lang-th',
            label: 'Thai',
            value: 'th'
          },
          {
            id: 'lang-vi',
            label: 'Vietnamese',
            value: 'vi'
          },
          {
            id: 'lang-he',
            label: 'Hebrew',
            value: 'he'
          },
          {
            id: 'lang-fa',
            label: 'Persian',
            value: 'fa'
          },
          {
            id: 'lang-bn',
            label: 'Bengali',
            value: 'bn'
          },
          {
            id: 'lang-ur',
            label: 'Urdu',
            value: 'ur'
          },
          {
            id: 'lang-am',
            label: 'Amharic',
            value: 'am'
          },
          {
            id: 'lang-af',
            label: 'Afrikaans',
            value: 'af'
          },
          {
            id: 'lang-sq',
            label: 'Albanian',
            value: 'sq'
          },
          {
            id: 'lang-hy',
            label: 'Armenian',
            value: 'hy'
          },
          {
            id: 'lang-az',
            label: 'Azerbaijani',
            value: 'az'
          },
          {
            id: 'lang-be',
            label: 'Belarusian',
            value: 'be'
          },
          {
            id: 'lang-bs',
            label: 'Bosnian',
            value: 'bs'
          },
          {
            id: 'lang-bg',
            label: 'Bulgarian',
            value: 'bg'
          },
          {
            id: 'lang-my',
            label: 'Burmese',
            value: 'my'
          },
          {
            id: 'lang-km',
            label: 'Khmer',
            value: 'km'
          },
          {
            id: 'lang-hr',
            label: 'Croatian',
            value: 'hr'
          },
          {
            id: 'lang-cs',
            label: 'Czech',
            value: 'cs'
          },
          {
            id: 'lang-et',
            label: 'Estonian',
            value: 'et'
          },
          {
            id: 'lang-fil',
            label: 'Filipino',
            value: 'fil'
          },
          {
            id: 'lang-ka',
            label: 'Georgian',
            value: 'ka'
          },
          {
            id: 'lang-hu',
            label: 'Hungarian',
            value: 'hu'
          },
          {
            id: 'lang-is',
            label: 'Icelandic',
            value: 'is'
          },
          {
            id: 'lang-ga',
            label: 'Irish',
            value: 'ga'
          },
          {
            id: 'lang-kk',
            label: 'Kazakh',
            value: 'kk'
          },
          {
            id: 'lang-lo',
            label: 'Lao',
            value: 'lo'
          },
          {
            id: 'lang-lv',
            label: 'Latvian',
            value: 'lv'
          },
          {
            id: 'lang-lt',
            label: 'Lithuanian',
            value: 'lt'
          },
          {
            id: 'lang-mk',
            label: 'Macedonian',
            value: 'mk'
          },
          {
            id: 'lang-mg',
            label: 'Malagasy',
            value: 'mg'
          },
          {
            id: 'lang-mt',
            label: 'Maltese',
            value: 'mt'
          },
          {
            id: 'lang-mn',
            label: 'Mongolian',
            value: 'mn'
          },
          {
            id: 'lang-ne',
            label: 'Nepali',
            value: 'ne'
          },
          {
            id: 'lang-ro',
            label: 'Romanian',
            value: 'ro'
          },
          {
            id: 'lang-sr',
            label: 'Serbian',
            value: 'sr'
          },
          {
            id: 'lang-sk',
            label: 'Slovak',
            value: 'sk'
          },
          {
            id: 'lang-sl',
            label: 'Slovenian',
            value: 'sl'
          },
          {
            id: 'lang-so',
            label: 'Somali',
            value: 'so'
          },
          {
            id: 'lang-ss',
            label: 'Swati',
            value: 'ss'
          },
          {
            id: 'lang-tg',
            label: 'Tajik',
            value: 'tg'
          },
          {
            id: 'lang-sw',
            label: 'Swahili',
            value: 'sw'
          },
          {
            id: 'lang-uk',
            label: 'Ukrainian',
            value: 'uk'
          },
          {
            id: 'lang-uz',
            label: 'Uzbek',
            value: 'uz'
          },
          {
            id: 'lang-sn',
            label: 'Shona',
            value: 'sn'
          },
          {
            id: 'lang-zu',
            label: 'Zulu',
            value: 'zu'
          },
          {
            id: 'lang-eu',
            label: 'Basque',
            value: 'eu'
          },
          {
            id: 'lang-gu',
            label: 'Gujarati',
            value: 'gu'
          },
          {
            id: 'lang-kn',
            label: 'Kannada',
            value: 'kn'
          },
          {
            id: 'lang-ml',
            label: 'Malayalam',
            value: 'ml'
          },
          {
            id: 'lang-mr',
            label: 'Marathi',
            value: 'mr'
          },
          {
            id: 'lang-pa',
            label: 'Punjabi',
            value: 'pa'
          },
          {
            id: 'lang-ta',
            label: 'Tamil',
            value: 'ta'
          },
          {
            id: 'lang-te',
            label: 'Telugu',
            value: 'te'
          },
          {
            id: 'lang-as',
            label: 'Assamese',
            value: 'as'
          },
          {
            id: 'lang-iu',
            label: 'Inuktitut',
            value: 'iu'
          },
          {
            id: 'lang-mi',
            label: 'Maori',
            value: 'mi'
          },
          {
            id: 'lang-si',
            label: 'Sinhala',
            value: 'si'
          },
          {
            id: 'lang-cy',
            label: 'Welsh',
            value: 'cy'
          },
          {
            id: 'lang-gaa',
            label: 'Ga',
            value: 'gaa'
          },
          {
            id: 'lang-ha',
            label: 'Hausa',
            value: 'ha'
          },
          {
            id: 'lang-ig',
            label: 'Igbo',
            value: 'ig'
          },
          {
            id: 'lang-yo',
            label: 'Yoruba',
            value: 'yo'
          },
          {
            id: 'lang-ak',
            label: 'Akan',
            value: 'ak'
          },
          {
            id: 'lang-dz',
            label: 'Dzongkha',
            value: 'dz'
          },
          {
            id: 'lang-fj',
            label: 'Fijian',
            value: 'fj'
          },
          {
            id: 'lang-ht',
            label: 'Haitian Creole',
            value: 'ht'
          },
          {
            id: 'lang-ik',
            label: 'Inupiaq',
            value: 'ik'
          },
          {
            id: 'lang-kl',
            label: 'Kalaallisut',
            value: 'kl'
          },
          {
            id: 'lang-ky',
            label: 'Kyrgyz',
            value: 'ky'
          },
          {
            id: 'lang-lb',
            label: 'Luxembourgish',
            value: 'lb'
          },
          {
            id: 'lang-ln',
            label: 'Lingala',
            value: 'ln'
          },
          {
            id: 'lang-lu',
            label: 'Luba-Katanga',
            value: 'lu'
          },
          {
            id: 'lang-lg',
            label: 'Ganda',
            value: 'lg'
          },
          {
            id: 'lang-na',
            label: 'Nauru',
            value: 'na'
          },
          {
            id: 'lang-oc',
            label: 'Occitan',
            value: 'oc'
          },
          {
            id: 'lang-om',
            label: 'Oromo',
            value: 'om'
          },
          {
            id: 'lang-ps',
            label: 'Pashto',
            value: 'ps'
          },
          {
            id: 'lang-qu',
            label: 'Quechua',
            value: 'qu'
          },
          {
            id: 'lang-sg',
            label: 'Sango',
            value: 'sg'
          },
          {
            id: 'lang-tl',
            label: 'Tagalog',
            value: 'tl'
          },
          {
            id: 'lang-tk',
            label: 'Turkmen',
            value: 'tk'
          },
          {
            id: 'lang-ts',
            label: 'Tsonga',
            value: 'ts'
          },
          {
            id: 'lang-wo',
            label: 'Wolof',
            value: 'wo'
          },
          {
            id: 'lang-xh',
            label: 'Xhosa',
            value: 'xh'
          },
          {
            id: 'lang-yi',
            label: 'Yiddish',
            value: 'yi'
          }
        ]
      },
      {
        icon: '✨',
        id: 'other',
        inputType: 'textInput',
        label: 'Other',
        placeholder: 'Enter custom language',
        value: ''
      }
    ],
    id: 'language',
    question: 'What is the main language your audience speaks?',
    step: 7,
    title: 'Audience Language'
  },

  {
    categories: [
      {
        icon: '',
        id: 'promotion-channels',
        inputType: 'multiSelect',
        label: '',
        options: [
          {
            icon: '',
            id: 'instagram',
            label: 'Instagram',
            value: 'instagram'
          },
          {
            icon: '',
            id: 'facebook',
            label: 'Facebook',
            value: 'facebook'
          },
          {
            icon: '',
            id: 'tiktok',
            label: 'TikTok',
            value: 'tiktok'
          },
          {
            icon: '',
            id: 'youtube',
            label: 'YouTube',
            value: 'youtube'
          },
          {
            icon: '',
            id: 'linkedin',
            label: 'LinkedIn',
            value: 'linkedin'
          },
          {
            icon: '',
            id: 'email',
            label: 'Email',
            value: 'email'
          },
          {
            icon: '',
            id: 'website',
            label: 'Website',
            value: 'website'
          }
        ]
      },
      {
        icon: '✨',
        id: 'other',
        inputType: 'textInput',
        label: 'Other',
        placeholder: 'Enter custom region',
        value: ''
      }
    ],
    id: 'channels',
    question: 'What platforms or channels do you primarily use for promotion?',
    step: 8,
    title: 'Promotion Channels'
  },
  {
    categories: [
      {
        icon: '',
        id: '',
        inputType: 'singleSelect',
        label: '',
        options: [
          {
            icon: '',
            id: 'expert',
            label: 'Expert',
            value: 'expert'
          },
          {
            icon: '',
            id: 'friendly',
            label: 'Friendly',
            value: 'friendly'
          },
          {
            icon: '',
            id: 'bold',
            label: 'Bold',
            value: 'bold'
          },
          {
            icon: '',
            id: '',
            label: 'Premium',
            value: 'premium'
          },
          {
            icon: '❤️',
            id: 'emotional',
            label: 'Emotional',
            value: 'emotional'
          }
        ]
      },
      {
        icon: '✨',
        id: 'other',
        inputType: 'textInput',
        label: 'Other',
        placeholder: 'Enter custom region',
        value: ''
      }
    ],
    id: 'tone',
    question: 'Brand tone / communication style:',
    step: 9,
    title: 'Brand Tone'
  },
  {
    id: 'promotion',
    inputType: 'multiSelect',
    options: [
      {
        icon: '',
        id: 'product',
        label: 'Product',
        value: 'product'
      },
      {
        icon: '️',
        id: 'service',
        label: 'Service',
        value: 'service'
      },
      {
        icon: '',
        id: 'event',
        label: 'Event',
        value: 'event'
      },
      {
        icon: '️',
        id: 'promo-or-discount',
        label: 'Promo/Discount',
        value: 'promo or discount'
      },
      {
        icon: '',
        id: 'brand-awareness',
        label: 'Brand Awareness',
        value: 'brand awareness'
      },
      {
        icon: '✨',
        id: 'other',
        inputType: 'textInput',
        label: 'Other',
        placeholder: 'Enter your option',
        value: ''
      }
    ],
    question: 'What are you promoting right now?',
    step: 10,
    title: 'Current Promotion'
  },
  {
    id: 'visuals',
    inputType: 'fileUpload',
    question: 'Do you want to upload brand visuals for content generation?',
    step: 11,
    title: 'Brand Visuals',
    uploads: [
      {
        accept: 'image/*',
        id: 'photo',
        label: 'Upload face photo',
        maxSize: '5Mb',
        optional: true,
        type: 'image'
      },
      {
        accept: 'image/*',
        id: 'photo',
        label: 'Upload brand photo',
        maxSize: '5Mb',
        optional: true,
        type: 'image'
      },
      {
        accept: 'image/*',
        id: 'photo',
        label: 'Upload banner or ad image',
        maxSize: '5Mb',
        optional: true,
        type: 'image'
      }
    ]
  }
]
