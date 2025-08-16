'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { routes } from '@/config'
import { ContentService } from '@/services/contentService'
import { IContentFormState } from '@/types'
import { createContentFormState, createEmptyContentFormState } from '@/utils/formHelpers'

const ExtractFormData = (formData: FormData): Omit<IContentFormState, 'error'> => {
  const business_id = formData.get('business_id') as string
  const campaign_id = formData.get('campaign_id') as string
  return { business_id, campaign_id }
}

export async function cancelContentForm() {
  redirect(routes.profile.presets.root)
}

export async function deleteContent(businessId: string, campaignId: string) {
  const contentService = new ContentService()

  try {
    const user = await contentService.getCurrentUser()

    if (!user) {
      console.error('Unauthorized deletion attempt: User not authenticated.')
      return
    }

    await contentService.deleteContent(businessId, campaignId)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Content deletion error:', errorMessage)
    throw error
  } finally {
    revalidatePath(routes.profile.presets.root)
  }
}

export async function getUserContents() {
  const contentService = new ContentService()

  try {
    const contents = await contentService.getUserContents()
    return { contents, error: null }
  } catch (error) {
    console.error('Error fetching user contents:', error)
    return {
      contents: [],
      error: error instanceof Error ? error.message : 'Failed to fetch contents',
      needsAuth: false
    }
  }
}

export const submitContentForm = async (previousState: IContentFormState, formData: FormData): Promise<IContentFormState> => {
  const formValues = ExtractFormData(formData)
  const contentService = new ContentService()

  try {
    await contentService.createContent(formValues)
    return createEmptyContentFormState()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Content submission error:', errorMessage)
    return createContentFormState(formValues, errorMessage)
  } finally {
    redirect(routes.profile.presets.root)
  }
}
