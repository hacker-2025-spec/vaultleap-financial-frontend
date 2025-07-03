import { call, delay, put, SagaGenerator } from 'typed-redux-saga'

import { DeployedChain, getDeployments, TestTokenUSDC__factory, FundsDistributor__factory } from '@klydo-io/getrewards-contracts'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { UnitedWalletConfig } from '@/helpers/united-wallet-config.helper'

import { SAGA_TRANSACTION_STATUS } from '@/store/transaction/transaction.types'
import { transactionActions, TransactionActions } from '@/store/transaction/transaction.slice'
import { NotesService } from '@klydo-io/getrewards-backend-api'
import { pushNotification } from '@/utils/toast'
import { dashboardActions } from '@/store/dashboard/dashboard.slice'
import { userActions } from '@/store/user/user.slice'

async function checkAllowanceSaga(config: UnitedWalletConfig, fundsDistributionAddress: string): Promise<string> {
  const { wallet, chain, wagmiConfig } = config

  const address = wallet?.address
  const chainId = chain.id

  const allowance = await readContract(wagmiConfig, {
    abi: TestTokenUSDC__factory.abi,
    address: getDeployments(Number(chainId!) as DeployedChain).USDC,
    functionName: 'allowance',
    args: [address as `0x${string}`, fundsDistributionAddress as `0x${string}`],
  })

  return allowance.toString()
}

async function approveFundsSaga(config: UnitedWalletConfig, amount: number, fundsDistributionAddress: string): Promise<'success' | 'reverted'> {
  const { chain, wagmiConfig, privy: { sendTransaction } } = config

  const chainId = chain.id

  const amountWithDecimals = BigInt(amount * 1000000)

  const { hash: resultAddress } = await sendTransaction({
    to: getDeployments(Number(chainId!) as DeployedChain).USDC,
    data: TestTokenUSDC__factory.createInterface().encodeFunctionData('approve', [fundsDistributionAddress as `0x${string}`, amountWithDecimals])
  })

  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: resultAddress })
  return receipt.status
}

async function sendFundsSaga(
  config: UnitedWalletConfig,
  amount: number,
  fundsDistributionAddress: string
): Promise<{ status: 'success' | 'reverted'; transactionHash: string }> {
  const { wagmiConfig, privy: { sendTransaction } } = config

  const amountWithDecimals = BigInt(amount * 1000000)

  const { hash: resultAddress } = await sendTransaction({
    to: fundsDistributionAddress as `0x${string}`,
    data: FundsDistributor__factory.createInterface().encodeFunctionData('sendFunds', [amountWithDecimals])
  })

  const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: resultAddress })

  return { status: receipt.status, transactionHash: receipt.transactionHash }
}

export function* processSendFundsToVaultSaga({ payload }: TransactionActions['processSendFundsToVault']): SagaGenerator<void> {
  const { router, amount, config, vaultAddress, refresh, vaultId, note } = payload
  const isNew = Boolean(!router) // define if saga is used in the new UI

  try {
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.PENDING))
    yield* put(transactionActions.nextStage())

    const allowance = yield* call(checkAllowanceSaga, config, vaultAddress)

    yield* put(transactionActions.nextStage())

    if (Number(allowance) < amount) {
      yield* put(transactionActions.nextStage())
      const approveStatus = yield* call(approveFundsSaga, config, amount, vaultAddress)

      if (approveStatus === 'reverted') {
        throw new Error('Transaction reverted')
      }
    } else {
      yield* put(transactionActions.nextStage())
    }
    yield* put(transactionActions.nextStage())

    const results = yield* call(sendFundsSaga, config, amount, vaultAddress)
    const transactionHash = results.transactionHash

    if (results.status === 'reverted') {
      throw new Error('Transaction reverted')
    }

    yield* call(NotesService.createFundingNote, {
      transactionHash,
      vaultId,
      note,
    })

    yield* delay(3000)
    if (isNew) {
      yield* put(dashboardActions.closeSendFundsModal())
      yield* put(userActions.fetchUserVaultsNew({ reset: false }))
    }
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.SUCCESS))

    if (refresh) {
      location.reload()
    } else if (router) {
      router.push('/dashboard')
    }
    pushNotification('Funds have been sent successfully', { variant: 'success' })
    yield* put(transactionActions.closeModal())
  } catch (error) {
    if (isNew) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = (error as any).details ?? 'Something went wrong during transaction'
      pushNotification(err, { variant: 'error' })
    }

    console.log(error)
    yield* put(transactionActions.changeSagaTransactionStatus(SAGA_TRANSACTION_STATUS.FAILURE))
    if (error instanceof Error) {
      yield* put(transactionActions.setError(error.message))
    }
  }
}
