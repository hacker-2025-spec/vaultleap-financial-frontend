import { call, delay, put, SagaGenerator, select } from 'typed-redux-saga'

import { waitForTransactionReceipt } from '@wagmi/core'
import { ShareHolderVault__factory } from '@klydo-io/getrewards-contracts'
import { vaultSelectors } from '@/store/vault/vault.selectors'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'

import { SAGA_TRANSACTION_STATUS } from '../../transaction.types'
import { transactionActions, TransactionActions } from '../../transaction.slice'

async function sendTransactionSaga(config: UnitedWalletConfig, shareHolderVaultAddress: string): Promise<'success' | 'reverted'> {
  const { wagmiConfig, privy: { sendTransaction } } = config

  const { hash: resultAddress } = await sendTransaction({
    to: shareHolderVaultAddress as `0x${string}`,
    data: ShareHolderVault__factory.createInterface().encodeFunctionData('claimAdmin')
  })

  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: resultAddress })
  return receipt.status
}

export function* processReclaimVaultKeySaga({ payload }: TransactionActions['processReclaimVaultKeys']): SagaGenerator<void> {
  try {
    const { router, config, address } = payload
    const vaultId = yield* select(vaultSelectors.selectVaultId)

    if (!vaultId) {
      throw new Error('Vault ID not found')
    }

    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    yield* put(transactionActions.nextStage())

    const status = yield* call(sendTransactionSaga, config, address)
    if (status === 'reverted') {
      throw new Error('Transaction reverted')
    }
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))

    yield* delay(8000)
    router.push('/dashboard')
    yield* put(transactionActions.closeModal())
  } catch (error) {
    console.log(error)
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      yield* put(transactionActions.setError(error.message))
    }
  }
}
