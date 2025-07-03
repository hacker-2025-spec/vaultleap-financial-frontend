import { SagaGenerator, select } from 'typed-redux-saga'

import { SumSubApplicantDetailDTO, SumSubService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { userSelectors } from '@/store/user/user.selectors'

export function* setApplicantDataSaga(): SagaGenerator<void> {
  try {
    const { applicantId, reviewStatus } = yield* select(userSelectors.selectApplicantData)

    if (applicantId) {
      const requestPayload: SumSubApplicantDetailDTO = { applicantId }
      if (reviewStatus) requestPayload.applicantStatus = reviewStatus

      const applicantData = yield* authorizedApiCall(SumSubService.addApplicant, requestPayload)

      console.log('applicantData', applicantData)
    }
  } catch (error) {
    console.log(error)
  }
}
