import { all, call, put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { VirtualAccountActivityItem, VirtualAccountEntity, VirtualAccountsService } from '@klydo-io/getrewards-backend-api'
import { authorizedApiCall } from '@/utils/httpClient'
import { UserActions, userActions } from '../../user.slice'

const getAmountSummary = (events: VirtualAccountActivityItem[]): [dailySummaries: TxHistoryItem[], totalAmount: number] => {
  let totalAmount = 0
  const dailyMap: Map<string, number> = new Map()

  events.forEach((event) => {
    const amount = parseFloat(event.amount) // Преобразуем строку в число
    if (isNaN(amount)) {
      throw new Error(`Invalid amount value: ${event.amount}`)
    }

    totalAmount += amount

    const date = event.created_at.split('T')[0]

    if (dailyMap.has(date)) {
      dailyMap.set(date, dailyMap.get(date)! + amount)
    } else {
      dailyMap.set(date, amount)
    }
  })

  const dailySummaries: TxHistoryItem[] = Array.from(dailyMap.entries()).map(([date, amount]) => ({
    date,
    amount,
  }))

  return [dailySummaries, totalAmount]
}

type TxHistoryItem = {
  date: string
  amount: number
}

export type VirtualAccountDetails = VirtualAccountEntity & {
  activity: TxHistoryItem[]
  totalAmount: number
}

export function* fetchUserVirtualAccountSaga({ payload }: UserActions['fetchUserVirtualAccount']): SagaGenerator<void> {
  try {
    const results = yield* all([
      call(authorizedApiCall, VirtualAccountsService.getVirtualAccountById, payload.id),
      call(authorizedApiCall, VirtualAccountsService.getVirtualAccountActvity, payload.id, payload.customerId, 'funds_received'),
    ])

    const [virtualAccount, virtualAccountActivity] = results as [VirtualAccountEntity, VirtualAccountActivityItem[]]

    const [activity, totalAmount] = getAmountSummary(virtualAccountActivity)

    console.log("activity", totalAmount, virtualAccount, activity)
    yield* put(
      userActions.fetchUserVirtualAccountSuccess({
        ...virtualAccount,
        activity,
        totalAmount,
      })
    )
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserVaultFailed())
  }
}
