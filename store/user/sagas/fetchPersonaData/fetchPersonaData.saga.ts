import { put } from 'typed-redux-saga'
import type { SagaGenerator } from 'typed-redux-saga'

import { PersonaService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions } from '../../user.slice'

export function* fetchPersonaDataSaga(): SagaGenerator<void> {
  try {
    const personaData = yield* authorizedApiCall(PersonaService.createInquiryId)

    yield* put(userActions.fetchPersonaDataSuccess(personaData))
  } catch (error) {
    yield* put(userActions.fetchPersonaDataFailure())
  }
}
