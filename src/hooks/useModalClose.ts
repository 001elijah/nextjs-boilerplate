import { useState } from 'react'

export const useModalClose = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return { closeModal, isModalOpen, openModal }
}
