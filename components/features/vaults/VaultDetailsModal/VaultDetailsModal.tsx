'use client'

import { UserVaultDto } from '@/store/user/user.types'
import { useVaultDetails } from '@/hooks/useVaultDetails'
import { VaultDetailsModalSection } from '../VaultDetailsModalSection/VaultDetailsModalSection'
import { VaultDetailsModalSummarySection } from '../VaultDetailsModalSummarySection/VaultDetailsModalSummarySection'
import { VaultDetailsModalRecipientsSection } from '../VaultDetailsModalRecipientsSection/VaultDetailsModalRecipientsSection'
import { VaultDetailsModalActivitySection } from '../VaultDetailsModalActivitySection/VaultDetailsModalActivitySection'
import { Loader } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  vault: UserVaultDto
  close: () => void
  open?: boolean
}

export const VaultDetailsModal = ({ vault: { id, projectName }, close, open = true }: Props) => {
  const { vaultDetails, isLoading, isUpdating } = useVaultDetails(id)

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{projectName} Details</DialogTitle>
          {isUpdating && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader className="h-3 w-3 animate-spin" />
              Updating vault details
            </div>
          )}
        </DialogHeader>

        {isLoading && !isUpdating ? (
          <div className="flex items-center justify-center h-[500px] text-muted-foreground">
            <Loader className="h-12 w-12 animate-spin" />
          </div>
        ) : (
          <div className="py-4">
            <VaultDetailsModalSection title="Vault Summary">
              <VaultDetailsModalSummarySection vault={vaultDetails} />
            </VaultDetailsModalSection>
            <VaultDetailsModalSection title="Recipients">
              <VaultDetailsModalRecipientsSection vault={vaultDetails} />
            </VaultDetailsModalSection>
            <VaultDetailsModalSection title="Recent Activity">
              <VaultDetailsModalActivitySection vault={vaultDetails} />
            </VaultDetailsModalSection>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
