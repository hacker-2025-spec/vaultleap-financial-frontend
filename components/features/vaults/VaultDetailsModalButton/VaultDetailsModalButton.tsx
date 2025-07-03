import { Button } from '@/components/ui/button'
import { UserVaultDto } from '@/store/user/user.types'
import { VaultDetailsModal } from '../VaultDetailsModal/VaultDetailsModal'
import { Info } from 'lucide-react'
import { useVaultDetailsInfoModal } from '@/hooks/useVaultDetailsInfoModal'
import { useVaultDetails } from '@/hooks/useVaultDetails'

interface Props {
  vault: UserVaultDto
}

export const VaultDetailsModalButton = ({ vault }: Props) => {
  const { modalInfo, close, open } = useVaultDetailsInfoModal()
  const { fetchVaultDetails } = useVaultDetails(vault.id)

  const isOpen = modalInfo?.vaultId === vault.id

  const handleOpenModal = () => {
    fetchVaultDetails(vault.roleRelativeToUser)
    open(vault.id)
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleOpenModal}
        className="py-2 sm:py-2.5"
      >
        <span className="hidden sm:inline">Details</span>
        <Info className="h-4 w-4 sm:hidden" />
      </Button>

      {isOpen && <VaultDetailsModal vault={vault} close={close} />}
    </>
  )
}
