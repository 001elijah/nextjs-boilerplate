export type BusinessType = 'both' | 'offline' | 'online'

export type BusinessTitle = string

export interface BusinessCategory {
  categoryOptions: BusinessSubcategory[]
  id: string
  maxSelections: never
  options: never
  title: string
  value: Exclude<BusinessType, 'both'>
}

export interface BusinessSubcategory {
  icon: string
  id: 'other' | string
  inputType: Exclude<InputType, 'fileUpload' | 'multiSelect'>
  maxSelections?: number
  options?: BusinessSubcategoryOption[]
  placeholder?: 'Enter your option' | string
  title: 'Other' | string
  value: '' | BusinessCategoryOfflineValues | BusinessCategoryOnlineValues
}

export interface BusinessSubcategoryOption {
  icon: string
  id: string
  label: string
  value:
    | BusinessCategoryOfflineAutoAndTransportValues
    | BusinessCategoryOfflineBeautyAndHealthValues
    | BusinessCategoryOfflineConstructionAndHomeServicesValues
    | BusinessCategoryOfflineEducationAndKidsValues
    | BusinessCategoryOfflineFitnessAndSportsValues
    | BusinessCategoryOfflineFoodAndHospitalityValues
    | BusinessCategoryOfflinePhotographyAndMediaValues
    | BusinessCategoryOfflineRealEstateAndServicesValues
    | BusinessCategoryOfflineRetailAndLocalShopsValues
    | BusinessCategoryOnlineCommerceValues
    | BusinessCategoryOnlineDigitalValues
    | BusinessCategoryOnlineEducationValues
    | BusinessCategoryOnlineEventsAndCommunitiesValues
    | BusinessCategoryOnlineFinanceAndCryptoValues
    | BusinessCategoryOnlinePersonalBrandValues
    | BusinessCategoryOnlineWellnessAndLifestyleValues
    | string
}

type BusinessCategoryOnlineValues =
  | 'digital services'
  | 'education'
  | 'events and communities'
  | 'finance and crypto'
  | 'online commerce'
  | 'other'
  | 'personal brands'
  | 'wellness and lifestyle'

type BusinessCategoryOfflineValues =
  | 'auto and transport'
  | 'beauty and health'
  | 'construction and home services'
  | 'education and kids'
  | 'fitness and sports'
  | 'food and hospitality'
  | 'other'
  | 'photography and media'
  | 'real estate and services'
  | 'retail and local shops'

type BusinessCategoryOnlineDigitalValues = 'copywriting' | 'email marketing' | 'online commerce' | 'seo' | 'smm' | 'support' | 'web design' | 'web development'

type BusinessCategoryOnlineCommerceValues = 'digital products' | 'dropshipping' | 'etsy amazon shopify' | 'stores' | 'subscriptions'

type BusinessCategoryOnlineEducationValues = 'courses' | 'language schools' | 'mentorship' | 'tutoring' | 'webinars'

type BusinessCategoryOnlinePersonalBrandValues = 'authors' | 'consultants' | 'influencers' | 'personal brands' | 'producers'

type BusinessCategoryOnlineFinanceAndCryptoValues =
  | 'analytics and signals and communities'
  | 'crypto projects and NFT'
  | 'financial advisors'
  | 'investment platforms'
  | 'trading courses'

type BusinessCategoryOnlineWellnessAndLifestyleValues =
  | 'dietitians and nutritionists'
  | 'mental health and meditation'
  | 'online fitness'
  | 'yoga and breathing practices'

type BusinessCategoryOnlineEventsAndCommunitiesValues = 'conferences and workshops' | 'online clubs' | 'paid zoom calls' | 'private communities'

type BusinessCategoryOfflineBeautyAndHealthValues =
  | 'aesthetic medicine'
  | 'beauty salon and spa'
  | 'cosmetic services'
  | 'dental clinic'
  | 'hair salon'
  | 'massage therapist'
  | 'nail studio'
  | 'physical therapy'
  | 'tattoo studio'

type BusinessCategoryOfflineFoodAndHospitalityValues =
  | 'bakery or pastry shop'
  | 'cafe'
  | 'catering service'
  | 'food truck'
  | 'local grocery or market'
  | 'restaurant'

type BusinessCategoryOfflineFitnessAndSportsValues =
  | 'crossfit or bootcamp'
  | 'dance school'
  | 'gym'
  | 'martial arts school'
  | 'personal trainer'
  | 'yoga studio'

type BusinessCategoryOfflineConstructionAndHomeServicesValues =
  | 'electrician'
  | 'general contractor'
  | 'handyman'
  | 'HVAC services'
  | 'landscaping or gardening'
  | 'plumber'
  | 'roofer'
  | 'tiler or flooring'
  | 'window or door installation'

type BusinessCategoryOfflineAutoAndTransportValues =
  | 'auto dealership'
  | 'car repair shop'
  | 'car wash or detailing'
  | 'tire service'
  | 'tow truck or roadside assistance'

type BusinessCategoryOfflineRetailAndLocalShopsValues =
  | 'clothing boutique'
  | 'electronics store'
  | 'furniture or home goods'
  | 'gift shop or souvenirs'
  | 'mobile or tech accessories'
  | 'shoe store'

type BusinessCategoryOfflineRealEstateAndServicesValues =
  | 'mortgage broker'
  | 'moving company'
  | 'property management'
  | 'real estate agency'
  | 'storage services'

type BusinessCategoryOfflineEducationAndKidsValues =
  | 'activity center for children'
  | 'driving school'
  | 'kindergarten or preschool'
  | 'language school'
  | 'music or art school'
  | 'tutoring center'

type BusinessCategoryOfflinePhotographyAndMediaValues = 'design and branding studio' | 'photographer' | 'printing services' | 'videographer'

// Category structure for complex steps
export interface Category {
  categoryOptions?: Subcategory[]
  icon?: string
  id: string
  inputType?: InputType
  label?: string
  maxSelections?: number
  options?: Option[]
  placeholder?: string
  title?: string
  value?: string
}

export interface Subcategory {
  icon?: string
  id: string
  inputType: InputType
  maxSelections?: number
  options?: Option[]
  placeholder?: string
  title: string
  value: string
}

export interface CustomerData {
  demographics: string
  painPoint: string
  professionalType: string
}

export interface LocationData {
  city: string
  country: string
  region: string
  state: string
  zip: string
}

export type RegionsData = string[]

export type ChannelsData = string[]

export type LanguageData = string

export type ToneData = string

export type Option = SelectOption | TextInputOption

export interface PresetFormState {
  category: BusinessSubcategoryOption['value']
  channels: ChannelsData
  customer: CustomerData
  error: string
  language: LanguageData
  location: LocationData
  name: string
  regions: RegionsData
  tone: ToneData
  type: BusinessType
}

// Main export type
export interface PresetsProps {
  presets: PresetConfig
}

// Main step interface
export interface Step {
  // Complex steps with categories
  categories?: BusinessCategory[] | Category[]
  id: string
  inputType?: InputType
  maxSelections?: number

  // Simple steps with direct options
  options?: Option[]
  placeholder?: string
  question?: string

  step: number

  title: string

  // File upload specific
  uploads?: FileUploadOption[]
}

// Base types for common properties
interface BaseOption {
  icon?: string
  id: string
  label: string
  value: string
}

// File upload specific
interface FileUploadOption {
  accept: string
  id: string
  label: string
  maxSize?: string
  optional: boolean
  type: 'document' | 'image' | 'video'
}

// Input type definitions
type InputType = 'fileUpload' | 'multiSelect' | 'singleSelect' | 'textInput'

// Root configuration
interface PresetConfig {
  cancelButtonText: string
  cancelTransitionButtonText: string
  nextButtonText: string
  submitButtonText: string
  submitPendingButtonText: string
}

interface SelectOption extends BaseOption {
  inputType?: never
}

interface TextInputOption extends BaseOption {
  inputType: 'textInput'
  placeholder: string
  value: ''
}

// Type guards
export const isValidBusinessType = (value: string): value is BusinessType => {
  return ['both', 'offline', 'online'].includes(value)
}
