import { useIsLoginModalOpen, useUserActions } from '@/stores/userStore'

export const useCustomLoginModal = () => {
  const isOpen = useIsLoginModalOpen()
  const { setLoginModalOpen } = useUserActions()

  const openModal = () => setLoginModalOpen(true)
  const closeModal = () => setLoginModalOpen(false)

  return {
    isOpen,
    openModal,
    closeModal
  }
}
