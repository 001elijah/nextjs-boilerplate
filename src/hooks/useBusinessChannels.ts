'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import { ChannelsData } from '@/types'

export const useBusinessChannels = ({ defaultValue }: { defaultValue: ChannelsData }) => {
  const [channelsData, setChannelsData] = useState<ChannelsData>(defaultValue)
  const [customChannel, setCustomChannel] = useState<string>('')

  useEffect(() => {
    setChannelsData(defaultValue)
  }, [defaultValue])

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
