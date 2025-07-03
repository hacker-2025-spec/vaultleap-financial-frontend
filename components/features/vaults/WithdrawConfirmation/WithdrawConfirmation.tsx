import React from 'react'


import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DollarSign } from 'lucide-react'
import { transactionActions } from '@/store/transaction/transaction.slice'
import { useDispatch } from 'react-redux'
import { useWalletConfig } from '@/hooks/useWalletConfig'

interface Props {
  amount?: string
  walletAddress?: string
  close: () => void
}

export const WithdrawConfirmationComponent = ({ close, amount, walletAddress }: Props) => {
  const dispatch = useDispatch()
  const config = useWalletConfig()

  const sendFunds = () => {
    if (amount && walletAddress) {
      dispatch(transactionActions.processWithdrawUSDC({ config, amount: Number(amount), transferAddress: walletAddress, isNew: true }))
      close()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">
          Please take a moment to carefully verify the address you have entered. Confirm that you are sending USDC to an Ethereum ERC-20 address.
        </p>
        <p className="mb-2">
          Once the withdrawal is confirmed, it cannot be reversed, and sending funds to an incorrect address may result in the permanent
          loss of your USDC.
        </p>
        <p>
          By proceeding with the confirmation, you acknowledge that you have thoroughly checked the withdrawal address and accept full
          responsibility for the transaction.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fundsModalAmount">Amount to Send (USDC)</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="fundsModalAmount"
              disabled
              value={amount}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destinationAddress">Destination Address</Label>
          <Input
            id="destinationAddress"
            disabled
            value={walletAddress}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={sendFunds}
          disabled={!amount || !walletAddress}
        >
          Send
        </Button>
      </div>
    </div>
  )
}
