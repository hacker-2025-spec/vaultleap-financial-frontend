import { call, delay, put, SagaGenerator } from 'typed-redux-saga'

import { userActions } from '@/store/user/user.slice'
import { ShareRolesManager__factory } from '@klydo-io/getrewards-contracts'
import { EvmTransactionSenderService, TRANSACTION_TYPE } from '@klydo-io/getrewards-backend-api'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'

import { SAGA_TRANSACTION_STATUS } from '../../transaction.types'
import { transactionActions, TransactionActions } from '../../transaction.slice'

async function sendTransactionSaga(
  config: UnitedWalletConfig,
  tokenId: number,
  tokenAddress: string,
): Promise<'success' | 'reverted'> {
  const address = config.wallet?.address

  await EvmTransactionSenderService.createTransaction(
    {
      transactionType: TRANSACTION_TYPE.CLAIM_USDC,
      to: tokenAddress,
      data: ShareRolesManager__factory.createInterface().encodeFunctionData("claim", [
        address as string, BigInt(tokenId)])
    })

  return 'success'
}

export function* processClaimUSDCSaga({ payload }: TransactionActions['processClaimUSDC']): SagaGenerator<void> {
  try {
    const { config, tokenId, tokenAddress, isNew } = payload

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    const status = yield* call(sendTransactionSaga, config, tokenId, tokenAddress)
    console.log('status', status)

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))

    yield* delay(4000)
    yield* put(transactionActions.closeModal())
    yield* put(userActions.toggleShowConfetti())

    if (isNew) {
      yield* put(userActions.fetchUserVaultsNew({ reset: false }))
    } else {
      yield* put(userActions.fetchUserVaults())
    }
  } catch (error) {
    console.log(error)
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      yield* put(transactionActions.setError(error.message))
    }
  }
}
