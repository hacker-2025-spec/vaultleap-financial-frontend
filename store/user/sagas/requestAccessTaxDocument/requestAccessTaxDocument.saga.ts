import { put, SagaGenerator } from 'typed-redux-saga'

import { TaxFormsService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions, UserActions } from '../../user.slice'

export function* requestAccessTaxDocumentSaga({ payload: taxFormId }: UserActions['requestAccessTaxDocument']): SagaGenerator<void> {
  try {
    yield* authorizedApiCall(TaxFormsService.requestTaxFormAccess, taxFormId)
    
    yield* put(userActions.requestAccessTaxDocumentSuccess())
  } catch (error) {
    yield* put(userActions.requestAccessTaxDocumentFailed())
    console.error(error)
  }
}
