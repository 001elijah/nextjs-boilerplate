'use client'

import { size } from 'lodash'
import { Megaphone, Plus } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { deleteContent, getUserContents } from '@/actions/content'
import { Button, Container, ContentPresetCard, LoadingSpinner, Section, SectionTitle, toast } from '@/components'
import { routes } from '@/config'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { IContentData } from '@/types'

export const ContentPresets = () => {
  const [deletingKey, setDeletingKey] = useState<null | string>(null)

  const fetchContentData = useCallback(async () => {
    const { contents, error, needsAuth } = await getUserContents()
    return { data: contents, error, needsAuth }
  }, [])

  const { data: contents, loading } = useFetchUserPresets<IContentData>(fetchContentData, {
    errorMessage: 'Something went wrong while loading contents.',
    errorTitle: 'Error Loading Contents',
    unauthorizedMessage: 'You need to be logged in to view your contents.',
    unauthorizedTitle: 'Unauthorized'
  })

  const handleDelete = async (businessId: string, campaignId: string) => {
    // Create a unique key for the item being deleted to manage the UI state
    const currentDeletingKey = `${businessId}-${campaignId}`
    setDeletingKey(currentDeletingKey)

    try {
      await deleteContent(businessId, campaignId)
      toast({
        message: '',
        title: `Content ${currentDeletingKey} Deleted Successfully.`,
        type: 'success'
      })
    } catch {
      toast({
        message: 'Something went wrong.',
        title: 'Error Deleting Content',
        type: 'error'
      })
    } finally {
      setDeletingKey(null)
    }
  }

  if (loading) {
    return (
      <Section ariaLabel="Contents" className="py-8" id="contents">
        <Container>
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size={48} />
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section ariaLabel="Contents" className="py-8" id="contents">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Content Presets" sectionTitle="Content Presets" />
          <Link href={routes.profile.presets.new.content}>
            <Button className="border-gold font-bold text-foreground hover:bg-gold" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              New Content
            </Button>
          </Link>
        </div>
        {size(contents) === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-foreground/60">
            <Megaphone className="mb-4 size-16 text-gold" />
            <h3 className="text-xl font-bold">{'No Content Presets Found'}</h3>
            <p className="mt-2">{"It looks like you haven't created any content presets yet."}</p>

            <p>
              <Link href={routes.profile.presets.new.content}>
                <Button size="sm" variant="link">
                  {'Add New Content'}
                </Button>
              </Link>
              {'to get started!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {contents.map((content, index) => (
              <ContentPresetCard contentPresetData={content} deletingKey={deletingKey} key={index} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
