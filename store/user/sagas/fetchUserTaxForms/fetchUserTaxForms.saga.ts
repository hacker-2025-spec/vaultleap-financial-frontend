import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { TaxFormsService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions } from '../../user.slice'

export function* fetchUserTaxFormsSaga(): SagaGenerator<void> {
  try {
    const userTaxFormsResponse = yield* authorizedApiCall(TaxFormsService.getAllForms)

    yield* put(userActions.fetchUserTaxFormsSuccess(userTaxFormsResponse))
  } catch (error) {
    console.log(error)
    yield* put(userActions.fetchUserTaxFormsFailed())
  }
}
