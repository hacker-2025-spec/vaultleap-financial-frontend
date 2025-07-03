import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Connector } from 'wagmi'

import type { WalletType, WalletStatus } from '@/client/types.gen'

export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

type WalletProviderStore = {
  // Connection state
  address?: string
  walletType?: WalletType
  connector?: Connector
  isConnected: boolean
  
  // Status tracking
  walletStatus?: WalletStatus
  checkingWalletStatus: RequestStatus
  fetchWalletsStatus: RequestStatus
  
  // User wallets
  userWallets: Array<{
    address: string
    walletType: WalletType
    auth0Id: string
    createdAt: Date
  }>
  
  // Actions
  actions: {
    // Connection actions
    setConnection: (address: string, walletType: WalletType, connector?: Connector) => void
    clearConnection: () => void
    setConnected: (connected: boolean) => void
    
    // Status actions
    setWalletStatus: (status: WalletStatus) => void
    setCheckingWalletStatus: (status: RequestStatus) => void
    setFetchWalletsStatus: (status: RequestStatus) => void
    resetWalletStatus: () => void
    
    // Wallet management
    setUserWallets: (wallets: Array<{
      address: string
      walletType: WalletType
      auth0Id: string
      createdAt: Date
    }>) => void
    addUserWallet: (wallet: {
      address: string
      walletType: WalletType
      auth0Id: string
      createdAt: Date
    }) => void
    
    // Reset all
    reset: () => void
  }
}

const initialState = {
  address: undefined,
  walletType: undefined,
  connector: undefined,
  isConnected: false,
  walletStatus: undefined,
  checkingWalletStatus: RequestStatus.Idle,
  fetchWalletsStatus: RequestStatus.Idle,
  userWallets: [],
}

const useWalletProviderStore = create<WalletProviderStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        setConnection: (address, walletType, connector) => {
          set({ 
            address, 
            walletType, 
            connector,
            isConnected: true 
          })
        },
        
        clearConnection: () => {
          set({ 
            address: undefined, 
            walletType: undefined, 
            connector: undefined,
            isConnected: false 
          })
        },
        
        setConnected: (connected) => {
          set({ isConnected: connected })
        },
        
        setWalletStatus: (status) => {
          set({ walletStatus: status })
        },
        
        setCheckingWalletStatus: (status) => {
          set({ checkingWalletStatus: status })
        },
        
        setFetchWalletsStatus: (status) => {
          set({ fetchWalletsStatus: status })
        },
        
        resetWalletStatus: () => {
          set({ 
            checkingWalletStatus: RequestStatus.Idle,
            walletStatus: undefined 
          })
        },
        
        setUserWallets: (wallets) => {
          set({ userWallets: wallets })
        },
        
        addUserWallet: (wallet) => {
          const { userWallets } = get()
          const exists = userWallets.some(w => w.address === wallet.address)
          if (!exists) {
            set({ userWallets: [...userWallets, wallet] })
          }
        },
        
        reset: () => {
          set(initialState)
        },
      },
    }),
    {
      name: 'walletProviderStore',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userWallets: state.userWallets,
        // Don't persist connection state as it should be fresh on each session
      }),
    }
  )
)

// Selector hooks
export const useWalletAddress = () => useWalletProviderStore((state) => state.address)
export const useWalletType = () => useWalletProviderStore((state) => state.walletType)
export const useWalletConnector = () => useWalletProviderStore((state) => state.connector)
export const useIsWalletConnected = () => useWalletProviderStore((state) => state.isConnected)
export const useWalletStatus = () => useWalletProviderStore((state) => state.walletStatus)
export const useCheckingWalletStatus = () => useWalletProviderStore((state) => state.checkingWalletStatus)
export const useFetchWalletsStatus = () => useWalletProviderStore((state) => state.fetchWalletsStatus)
export const useUserWallets = () => useWalletProviderStore((state) => state.userWallets)
export const useWalletProviderActions = () => useWalletProviderStore((state) => state.actions)

export default useWalletProviderStore
