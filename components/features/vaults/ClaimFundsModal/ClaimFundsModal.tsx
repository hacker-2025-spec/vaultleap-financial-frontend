import { UserVaultDto } from '@/store/user/user.types'
import { transactionActions } from '@/store/transaction/transaction.slice'
import { useDispatch } from 'react-redux'
import { useConfig } from 'wagmi'
import { ClaimFundsItem } from '@/components/features/vaults/ClaimFundsItem/ClaimFundsItem'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Download } from 'lucide-react'

interface Props {
  vault: UserVaultDto
  close: () => void
}

export const ClaimFundsModal = ({ vault, close }: Props) => {
  const config = useConfig()
  const dispatch = useDispatch()

  const handleClaimUSDC = (tokenId: number, tokenAddress: string) => {
    dispatch(transactionActions.processClaimUSDC({
      config: config as unknown as UnitedWalletConfig,
      tokenId,
      tokenAddress,
      isNew: true
    }))
  }

  const claimFunds = () => {
    if (vault.tokenId && vault.tokenAddress) {
      handleClaimUSDC(Number(vault.tokenId), vault.tokenAddress)
    }
  }

  const isLoading = false
  const isSubmitDisabled = true
  const transactionsToClaim = [
    {
      projectName: 'Project Alpha Payment',
      amount: '$950.00',
      sender: 'John Doe',
    },
  ]

  return (
    <Dialog open={true} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim Funds - {vault.projectName}</DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-2.5">
          {transactionsToClaim.map((info) => (
            <ClaimFundsItem key={info.projectName} txInfo={info} />
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={claimFunds}
            disabled={isSubmitDisabled}
            className="flex items-center gap-1"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Download className="h-4 w-4 mr-1" />
            )}
            Claim all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
