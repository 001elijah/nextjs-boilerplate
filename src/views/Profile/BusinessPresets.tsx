'use client'

import { size } from 'lodash'
import { Megaphone, Plus } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { getUserBusinesses } from '@/actions/business'
import { deleteBusiness } from '@/actions/business'
import { BusinessPresetCard, Button, Container, LoadingSpinner, Section, SectionTitle, toast } from '@/components'
import { routes } from '@/config'
import { useFetchUserPresets } from '@/hooks/useFetchUserPresets'
import { IBusinessResponseItem } from '@/types'

export const BusinessPresets = () => {
  const [deletingId, setDeletingId] = useState<null | string>(null)

  const fetchBusinessData = useCallback(async () => {
    const { businesses, error, needsAuth } = await getUserBusinesses()
    return { data: businesses, error, needsAuth }
  }, [])

  const { data: businesses, loading } = useFetchUserPresets<IBusinessResponseItem>(fetchBusinessData, {
    errorMessage: 'Something went wrong while loading businesses.',
    errorTitle: 'Error Loading Businesses',
    unauthorizedMessage: 'You need to be logged in to view your businesses.',
    unauthorizedTitle: 'Unauthorized'
  })

  const handleDelete = async (businessId: string) => {
    setDeletingId(businessId)

    try {
      await deleteBusiness(businessId)
      toast({
        message: '',
        title: `Business ${businessId} Deleted Successfully.`,
        type: 'success'
      })
    } catch {
      toast({
        message: 'Something went wrong.',
        title: 'Error Deleting Business',
        type: 'error'
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <Section ariaLabel="Businesses" className="py-8" id="businesses">
        <Container>
          <div className="flex items-center justify-center p-8">
            <LoadingSpinner size={48} />
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section ariaLabel="Business Presets" className="py-8" id="business-presets">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Business Presets" sectionTitle="Business Presets" />
          <Link href={routes.profile.presets.new.business}>
            <Button className="border-gold font-bold text-foreground hover:bg-gold" type="submit" variant="outline">
              <Plus className="-ml-1 mr-2 size-4" />
              Create Business Preset
            </Button>
          </Link>
        </div>

        {size(businesses) === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-foreground/60">
            <Megaphone className="mb-4 size-16 text-gold" />
            <h3 className="text-xl font-bold">{'No Business Presets Found'}</h3>
            <p className="mt-2">{"It looks like you haven't created any business presets yet."}</p>

            <p>
              <Link href={routes.profile.presets.new.business}>
                <Button size="sm" variant="link">
                  {'Add New Business'}
                </Button>
              </Link>
              {'to get started!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {businesses.map((presetData, index) => (
              <BusinessPresetCard businessPresetData={presetData} deletingId={deletingId} key={index} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
