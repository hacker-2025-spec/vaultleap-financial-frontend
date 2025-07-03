import {
    CreateVirtualAccountModalFormFields,
} from '@/components/features/vaults/CreateVirtualAccountModal/CreateVirtualAccountModal.types'
import { VIRTUAL_ACCOUNT_FEE_PERCENT_NORMAL, VIRTUAL_ACCOUNT_FEE_PERCENT_PREMIUM } from '@/config/config'
import { userSelectors } from '@/store/user/user.selectors'
import { CurrencyCode } from '@/types/currency'
import { authorizedApiCall } from '@/utils/httpClient'
import { VirtualAccountsService } from '@klydo-io/getrewards-backend-api'
import { put, select, takeLatest } from 'typed-redux-saga'
import { selectData } from './VACreator.selectors'
import {
    CREATE_VIRTUAL_ACCOUNT_FAILURE,
    CREATE_VIRTUAL_ACCOUNT_REQUEST,
    CREATE_VIRTUAL_ACCOUNT_SUCCESS,
    FETCH_VIRTUAL_ACCOUNT_REQUEST,
    FETCH_VIRTUAL_ACCOUNT_SUCCESS,
    FETCH_VIRTUAL_ACCOUNT_FAILURE
} from './VACreator.types'

function* createVirtualAccountSaga() {
  try {
    const customer = yield* select(userSelectors.selectDirectVaultCustomer)
    const isPremium = yield* select(userSelectors.selectIsPremiumAccount)

    if (!customer) {
      throw new Error('Customer info does not exist in store')
    }

    const data: CreateVirtualAccountModalFormFields = yield select(selectData)

    const virtualAccountData = (() => ({
      source: {
        currency: data.currency
      },
      destination: {
        payment_rail: 'base',
        address: data.address,
        currency: (CurrencyCode.EUR === data.currency ? CurrencyCode.EURC : CurrencyCode.USDC).toLowerCase()
        ,
      },
      developer_fee_percent: (isPremium ? VIRTUAL_ACCOUNT_FEE_PERCENT_PREMIUM : VIRTUAL_ACCOUNT_FEE_PERCENT_NORMAL).toString()
    }))()

    yield* authorizedApiCall(VirtualAccountsService.createVirtualAccount, {
      // @ts-expect-error fix on BE or/and change rail to make EUR work
      virtualAccountData,
      vaultName: data.name,
      bridgeCustomerId: customer.bridgeCustomerId,
    })

    yield put({ type: CREATE_VIRTUAL_ACCOUNT_SUCCESS })
  } catch (error) {
    yield put({
      type: CREATE_VIRTUAL_ACCOUNT_FAILURE,
      error: error instanceof Error ? error : new Error('Failed to create virtual account')
    })
  }
}

function* fetchVirtualAccounts () {
  try {
    // // First try to get accounts from the new /virtual-accounts endpoint
    // try {
    //   const accounts = yield* authorizedApiCall(VirtualAccountsService.getVirtualAccountsByAuth0Id)
    //   yield put({ type: FETCH_VIRTUAL_ACCOUNT_SUCCESS, payload: accounts })
    //   return
    // } catch (endpointError) {
    //   console.error('Error fetching from /virtual-accounts endpoint:', endpointError)
    //   // If the new endpoint fails, fall back to the old method
    // }

    // Fallback to the original method
    const accounts = yield* authorizedApiCall(VirtualAccountsService.getVirtualAccountsByAuth0Id)
  console.log("accounts", accounts)
    yield put({ type: FETCH_VIRTUAL_ACCOUNT_SUCCESS, payload: accounts })
  } catch (error) {
    yield put({
      type: FETCH_VIRTUAL_ACCOUNT_FAILURE,
      error: error instanceof Error ? error : new Error('Failed to fetch virtual accounts')
    })
  }
}

export default function* VACreatorSaga() {
  yield takeLatest(CREATE_VIRTUAL_ACCOUNT_REQUEST, createVirtualAccountSaga),
  yield takeLatest(FETCH_VIRTUAL_ACCOUNT_REQUEST, fetchVirtualAccounts)
}
