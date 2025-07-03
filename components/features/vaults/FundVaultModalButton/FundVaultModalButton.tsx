import { Button } from '@/components/ui/button'
import { FundVaultModal } from '@/components/features/vaults/FundVaultModal/FundVaultModal'
import { UserVaultDto } from '@/store/user/user.types'
import { usePrivySmartWallet } from '@/hooks/usePrivySmartWallet'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardActions } from '@/store/dashboard/dashboard.slice'
import { dashboardSelectors } from '@/store/dashboard/dashboard.selectors'
import { Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Props {
  vault: UserVaultDto
}

export const FundVaultModalButton = ({ vault }: Props) => {
  const dispatch = useDispatch()
  const { getUsdcBalance, isReady: isSmartWalletReady } = usePrivySmartWallet()

  // State for USDC balance from smart wallet
  const [balance, setBalance] = useState<number>(0)

  // Fetch USDC balance when smart wallet is ready
  useEffect(() => {
    const fetchBalance = async () => {
      if (!isSmartWalletReady || !getUsdcBalance) {
        return
      }

      try {
        const balanceData = await getUsdcBalance()
        if (balanceData) {
          setBalance(balanceData.decimal)
        }
      } catch (error) {
        console.error('Failed to fetch USDC balance:', error)
      }
    }

    fetchBalance()
  }, [isSmartWalletReady, getUsdcBalance])

  const sendFundsModalInfo = useSelector(dashboardSelectors.selectSendFundsModalInfo)
  const open = () => dispatch(dashboardActions.openSendFundsModal({ vaultId: vault.id }))
  const close = () => dispatch(dashboardActions.closeSendFundsModal())

  const isOpen = sendFundsModalInfo?.vaultId === vault.id
  return (
    <>
      <Button variant="outline" onClick={open} className="flex items-center gap-1">
        <Wallet className="h-4 w-4" />
        Fund Vault
      </Button>
      {isOpen && <FundVaultModal vault={vault} close={close} balance={balance} />}
    </>
  )
}
