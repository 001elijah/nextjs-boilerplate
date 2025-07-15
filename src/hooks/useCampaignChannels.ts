'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import { ICampaignChannelsStepProps } from '@/types'

export const useCampaignChannels = ({ defaultValue, error, isLoading }: Omit<ICampaignChannelsStepProps, 'step'>) => {
  const [channelsData, setChannelsData] = useState<ICampaignChannelsStepProps['defaultValue']>(defaultValue)
  const [customChannel, setCustomChannel] = useState<string>('')

  useEffect(() => {
    setChannelsData(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!isLoading && !error) {
      setChannelsData(defaultValue)
      setCustomChannel('')
    }
  }, [isLoading, error, defaultValue])

  const addChannel = (channel: string) => {
    if (channel.trim() && !channelsData.includes(channel.trim())) {
      setChannelsData(prev => [...prev, channel.trim()])
    }
  }

  const removeChannel = (channelToRemove: string) => {
    setChannelsData(prev => prev.filter(channel => channel !== channelToRemove))
  }

  const toggleChannel = (channel: string) => {
    setChannelsData(prev => (prev.includes(channel) ? prev.filter(r => r !== channel) : [...prev, channel]))
  }

  const resetChannelsState = () => {
    setChannelsData(defaultValue)
    setCustomChannel('')
  }

  const handleCustomChannelAdd = () => {
    if (customChannel.trim() && !channelsData.includes(customChannel.trim())) {
      addChannel(customChannel.trim().toLowerCase())
      setCustomChannel('')
    }
  }

  const handleCustomChannelKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCustomChannelAdd()
    }
  }

  return {
    addChannel,
    channelsData,
    customChannel,
    handleCustomChannelAdd,
    handleCustomChannelKeyPress,
    removeChannel,
    resetChannelsState,
    setChannelsData,
    setCustomChannel,
    toggleChannel
  }
}
