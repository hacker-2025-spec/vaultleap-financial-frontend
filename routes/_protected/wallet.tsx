import { createFileRoute } from '@tanstack/react-router'
import WalletPage from '@/views/Wallet/Wallet.page'

export const Route = createFileRoute('/_protected/wallet')({
  component: Wallet,
})

function Wallet() {
  return <WalletPage />
}
