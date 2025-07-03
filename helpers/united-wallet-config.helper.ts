import { PrivyInterface, Wallet } from "@privy-io/react-auth"
import { Chain } from "viem"
import { Config } from "wagmi"

export type UnitedWalletConfig = {
  wagmiConfig: Config,
  privy: PrivyInterface,
  wallet?: Wallet,
  chain: Chain,
}