import { all, call, put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import {
  BankingInfoEntity,
  BankingInfoService,
  DirectVaultsService,
  GetLiqAddressDrainHistoryResponseDTO,
  LiquidationAddressEntity,
  LiquidationAddressesService,
} from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { UserActions, userActions } from '../../user.slice'

type TxHistoryItem = {
  date: string
  amount: number
}

export type LiquidationAddressDetails = LiquidationAddressEntity & {
  bankingInfo: BankingInfoEntity
  txHistory: TxHistoryItem[]
  totalAmount: number
}

export function* fetchUserLiquidationAddressSaga({ payload }: UserActions['fetchUserLiquidationAddress']): SagaGenerator<void> {
  try {
    const results = yield* all([
      call(authorizedApiCall, LiquidationAddressesService.getLiquidationAddressById, payload.id),
      call(authorizedApiCall, BankingInfoService.getBankingInfoById, payload.bankingInfoId),
      call(authorizedApiCall, DirectVaultsService.getLiqAddressDrainHistory, { liqAddressId: payload.id }),
    ])

    const [liquidationAddress, bankingInfo, historyInfoResponse] = results as [
      LiquidationAddressEntity,
      BankingInfoEntity,
      GetLiqAddressDrainHistoryResponseDTO,
    ]

    // @ts-expect-error No type declarations for now
    const liqAddressTxHistory = historyInfoResponse.list as LiqAddressTxHistoryItem[]

    // @ts-expect-error No type declarations for now
    const liqAddressTotalAmount = historyInfoResponse.totalTransferred as number

    yield* put(
      userActions.fetchUserLiquidationAddressSuccess({
        ...liquidationAddress,
        bankingInfo,
        txHistory: liqAddressTxHistory,
        totalAmount: liqAddressTotalAmount,
      })
    )
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserVaultFailed())
  }
}
