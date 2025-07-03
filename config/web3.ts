export enum ChainsId {
  BASE_MAINNET = 8453,
  BASE_SEPOLIA_TESTNET = 84532,
}

export type BlockchaninNetwork = {
  name: string
  chainId: number
  isTestnet: boolean
  explorerUrl: string
}

export const SUPPORTED_NETWORKS: BlockchaninNetwork[] = [
  {
    name: 'Base Mainnet',
    isTestnet: false,
    explorerUrl: 'https://basescan.org/',
    chainId: ChainsId.BASE_MAINNET,
  },
  {
    name: 'Base Sepolia Testnet',
    isTestnet: true,
    explorerUrl: 'https://sepolia.basescan.org/',
    chainId: ChainsId.BASE_SEPOLIA_TESTNET,
  },
]

export const SUPPORTED_NETWORKS_IDS = SUPPORTED_NETWORKS.map((network) => network.chainId)
