import { put, type SagaGenerator, select } from 'typed-redux-saga'

import { TaxInfoCreationDto, TaxInfoService, TaxFormType } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'
import { userSelectors } from '@/store/user/user.selectors'

import { userActions, UserActions } from '../../user.slice'

export function* sendUserInfoSaga({ payload }: UserActions['sendUserInfo']): SagaGenerator<void> {
  try {
    const { formType, email, vaultId, tokenAddress } = payload
    let requestPayload: TaxInfoCreationDto = {
      vaultId,
      email,
      formType,
      shareHolderRoleAddress: tokenAddress,
    }
    if (formType === TaxFormType.W9) {
      const userInfo = yield* select(userSelectors.selectFormattedUserInfoW9)
      requestPayload = { ...requestPayload, w9FormDetails: userInfo }
    }
    if (formType === TaxFormType.W8_BEN) {
      const userInfo = yield* select(userSelectors.selectFormattedUserInfoW8Ben)
      requestPayload = { ...requestPayload, w8BenFormDetails: userInfo }
    }
    if (formType === TaxFormType.W8_BEN_E) {
      const userInfo = yield* select(userSelectors.selectFormattedUserInfoW8BenE)
      requestPayload = { ...requestPayload, w8BenEFormDetails: userInfo }
    }

    yield* authorizedApiCall(TaxInfoService.createTaxInfo, requestPayload)

    yield* put(userActions.sendUserInfoSuccess())
  } catch (error) {
    console.error(error)
    yield* put(userActions.sendUserInfoFailed())
  }
}
