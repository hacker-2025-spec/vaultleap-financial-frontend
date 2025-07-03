import { useModal } from '@/hooks/useModal'
import { Button } from '@/components/ui/button'
import { UserVaultDto } from '@/store/user/user.types'
import { ClaimFundsModal } from '@/components/features/vaults/ClaimFundsModal/ClaimFundsModal'
import { useAccount, useConfig } from 'wagmi'
import { transactionActions } from '@/store/transaction/transaction.slice'
import { useDispatch } from 'react-redux'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'
import { Download } from 'lucide-react'

interface Props {
  vault: UserVaultDto
}

export const ClaimFundsModalButton = ({ vault }: Props) => {
  const [isOpen, close] = useModal()
  const { address } = useAccount()
  const config = useConfig()
  const dispatch = useDispatch()

  const handleClaimUSDC = (tokenId: number, tokenAddress: string) => {
    dispatch(transactionActions.processClaimUSDC({ config: config as unknown as UnitedWalletConfig, tokenId, tokenAddress, isNew: true }))
  }
  const claimFunds = () => vault.tokenId && vault.tokenAddress && handleClaimUSDC(Number(vault.tokenId), vault.tokenAddress)

  const vaultConnectedWithAnotherWallet = address?.toLowerCase() !== vault.walletAddress?.toLowerCase()
  const noFundsToClaim = vault.claimable === '0'
  const buttonDisabled =
    vault.id === '' || noFundsToClaim || vaultConnectedWithAnotherWallet || vault.tokenId === undefined || vault.tokenAddress === undefined

  const tooltipContent = vaultConnectedWithAnotherWallet
    ? 'Another wallet is connected to the vault'
    : noFundsToClaim
      ? 'No funds available for claim'
      : ''

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                variant="outline"
                onClick={claimFunds}
                disabled={buttonDisabled}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Claim Funds
              </Button>
            </div>
          </TooltipTrigger>
          {tooltipContent && <TooltipContent>{tooltipContent}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
      {isOpen && <ClaimFundsModal vault={vault} close={close} />}
    </>
  )
}
