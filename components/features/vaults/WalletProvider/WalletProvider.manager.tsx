'use client'

import React, { useCallback, useEffect } from 'react'
import { Connector, useDisconnect, useAccountEffect, useAccount } from 'wagmi'

import { useIsLoggedIn } from '@/stores/userStore'
import {
  useWalletProviderActions,
  useWalletAddress,
  useWalletType,
  useWalletStatus,
  useCheckingWalletStatus,
  RequestStatus,
} from '@/stores/walletProviderStore'
import { useUserWallets, useCheckWalletStatus } from '@/api/wallet/walletQueries'
import { useCreateWallet } from '@/api/wallet/walletMutations'
import type { WalletType } from '@/client/types.gen'

import { WalletProviderProps } from './WalletProvider.types'

const parseConnectorIdToWalletType = (connectorId: string): WalletType | null => {
  switch (connectorId) {
    case 'coinbaseWalletSDK':
    case 'com.coinbase.wallet':
      return 'coinbase'
    case 'io.metamask':
      return 'metamask'
    default:
      return null
  }
}

export const WalletProviderManager: React.FC<WalletProviderProps> = React.memo(
  ({ children }) => {
    const { disconnect } = useDisconnect()
    const { status, address: recAddress, connector: recConnector } = useAccount()

    // Store state
    const isLoggedIn = useIsLoggedIn()
    const address = useWalletAddress()
    const walletType = useWalletType()
    const walletStatus = useWalletStatus()
    const checkingWalletStatus = useCheckingWalletStatus()
    const actions = useWalletProviderActions()

    // API hooks
    const { data: userWallets } = useUserWallets()
    const createWallet = useCreateWallet()

    // Check wallet status when we have address and walletType
    const walletToCheck = address && walletType ? { address, walletType } : null
    const { data: walletStatusData } = useCheckWalletStatus(walletToCheck)

    const onConnect = useCallback(
      (address: `0x${string}`, connector: Connector) => {
        actions.resetWalletStatus()
        const walletType = parseConnectorIdToWalletType(connector.id)
        if (!walletType) return

        actions.setConnection(address, walletType, connector)
      },
      [actions]
    )

    useAccountEffect({
      onConnect: ({ address, connector }) => onConnect(address, connector),
      onDisconnect: () => {
        actions.clearConnection()
      },
    })

    // Update wallet status when we get data from the API
    useEffect(() => {
      if (walletStatusData?.status) {
        actions.setWalletStatus(walletStatusData.status)
        actions.setCheckingWalletStatus(RequestStatus.Succeeded)
      }
    }, [walletStatusData, actions])

    // Update user wallets in store when fetched
    useEffect(() => {
      if (userWallets) {
        actions.setUserWallets(userWallets)
      }
    }, [userWallets, actions])

    // Handle reconnection
    useEffect(() => {
      if (
        isLoggedIn &&
        (status === 'reconnecting' || status === 'connected') &&
        !!recAddress &&
        recAddress !== address &&
        !!recConnector &&
        checkingWalletStatus === RequestStatus.Idle
      ) {
        onConnect(recAddress, recConnector)
      }
    }, [isLoggedIn, status, recAddress, recConnector, checkingWalletStatus, onConnect, address])

    // Handle wallet status results
    useEffect(() => {
      if (checkingWalletStatus === RequestStatus.Succeeded && walletStatus) {
        if (walletStatus === 'WALLET_NOT_ASSIGNED') {
          if (address && walletType) {
            createWallet.mutate(
              { address, walletType },
              {
                onSuccess: () => {
                  actions.clearConnection()
                },
                onError: (error) => {
                  console.error('Failed to save wallet:', error)
                },
              }
            )
          }
        } else if (walletStatus === 'WALLET_BELONGS_TO_SOMEONE_ELSE') {
          disconnect()
          actions.clearConnection()
        }
      }
    }, [address, checkingWalletStatus, disconnect, walletStatus, walletType, createWallet, actions])

    return children
  },
  () => true // Always return true to prevent re-renders when parent re-renders
)
