import { Button } from '@/components/ui/button'
import { ConnectKitButton } from 'connectkit'
import { ReactNode } from 'react'

interface Props {
  isWalletConnected: boolean
  handleWalletCreation: () => void
  children: ReactNode,
}

export const ConfirmVaultCreationButtons = ({ isWalletConnected, children, handleWalletCreation }: Props) =>
  isWalletConnected ? (
    <>{children}</>
  ) : (
    <div className="w-full flex items-center justify-center flex-wrap gap-x-6 gap-y-4 pt-4 lg:pt-0">
      <ConnectKitButton.Custom>
        {({ show }) => (
          <Button
            variant="default"
            onClick={show}
            className="w-full sm:w-auto uppercase"
          >
            CONNECT WALLET
          </Button>
        )}
      </ConnectKitButton.Custom>
      <Button
        variant="default"
        onClick={handleWalletCreation}
        className="w-full sm:w-auto uppercase"
      >
        CREATE WALLET
      </Button>
    </div>
  )
