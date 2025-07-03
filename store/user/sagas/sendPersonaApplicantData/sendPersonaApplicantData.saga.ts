import { SagaGenerator, select } from 'typed-redux-saga'

import { PersonaApplicantDetailDTO, PersonaService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { userSelectors } from '@/store/user/user.selectors'

export function* setPersonaApplicantDataSaga(): SagaGenerator<void> {
  try {
    const { reviewStatus } = yield* select(userSelectors.selectPersonaApplicantData)

    if (reviewStatus) {
      const requestPayload: PersonaApplicantDetailDTO = { applicantStatus: reviewStatus }
  
      const applicantData = yield* authorizedApiCall(PersonaService.updateApplicant, requestPayload)
  
      console.log('applicantData', applicantData)
    }
  } catch (error) {
    console.log(error)
  }
}
