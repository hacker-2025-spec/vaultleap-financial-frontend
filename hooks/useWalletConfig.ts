import { UnitedWalletConfig } from "@/helpers/united-wallet-config.helper"
import { usePrivy } from "@privy-io/react-auth"
import { useConfig } from "wagmi"
import { usePrivySmartWallet } from "./usePrivySmartWallet"
import { useMemo } from "react"

export const useWalletConfig = (): UnitedWalletConfig => {
  const wagmiConfig = useConfig()
  const privy = usePrivy()
  const { smartWalletAddress } = usePrivySmartWallet()

  // Create a wallet object that uses ONLY smart wallet address
  const wallet = useMemo(() => {
    if (!privy.ready || !privy.user?.wallet) return undefined

    return {
      ...privy.user.wallet,
      // Always use smart wallet address - no fallback
      address: smartWalletAddress
    }
  }, [privy.ready, privy.user?.wallet, smartWalletAddress])

  const chain = wagmiConfig.chains[0]

  return {
    wagmiConfig,
    privy,
    wallet,
    chain,
  }
}