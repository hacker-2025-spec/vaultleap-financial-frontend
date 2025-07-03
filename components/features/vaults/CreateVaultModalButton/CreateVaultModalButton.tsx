import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateVaultModal } from '@/components/features/vaults/CreateVaultModal/CreateVaultModal'

export const CreateVaultModalButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <Button onClick={openModal} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Create New Vault
      </Button>

      <CreateVaultModal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
