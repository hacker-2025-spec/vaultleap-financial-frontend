import { call, put, SagaGenerator } from 'typed-redux-saga'

import { TaxFormsService } from '@klydo-io/getrewards-backend-api'

import { authorizedApiCall } from '@/utils/httpClient'

import { userActions, UserActions } from '../../user.slice'

async function getBlobSaga(downloadUrl: string) {
  return await fetch(downloadUrl).then(res => res.blob())
}

export function* downloadTaxDocumentSaga({ payload }: UserActions['downloadTaxDocument']): SagaGenerator<void> {
  const { taxFormId, securityCode } = payload

  let response
  try {
    response = yield* authorizedApiCall(TaxFormsService.accessTaxForm, taxFormId, { securityCode })
  } catch (error) {
    yield* put(userActions.downloadTaxDocumentFailed())
    console.error(error)
    return
  }

  if (!response.downloadUrl) return

  try {
    const blob = yield* call(getBlobSaga, response.downloadUrl)
    const data = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = data
    link.download = response.s3Key
    link.click()

    setTimeout(function () {
      window.URL.revokeObjectURL(data)
    }, 100)

    yield* authorizedApiCall(TaxFormsService.taxFormDownloaded, taxFormId)
    yield* put(userActions.downloadTaxDocumentSuccess())
  } catch (error) {
    console.log('error')
    yield* put(userActions.downloadTaxDocumentFailed())
    console.error(error)
  }
}
