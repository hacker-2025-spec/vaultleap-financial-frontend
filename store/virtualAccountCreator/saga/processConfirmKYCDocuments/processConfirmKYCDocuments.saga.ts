import { delay, put } from 'typed-redux-saga'
import { VirtualAccountCreatorActions } from '../../virtualAccountCreator.slice'
import { knowYourCustomerActions } from '@/store/KnowYourCustomer/KnowYourCustomer'

export function* processConfirmKYCDocumentsSaga({ payload }: VirtualAccountCreatorActions['confirmKYCDocuments']) {
  try {
    console.log('processConfirmKYCDocumentsSaga - Starting with payload:', payload)
    yield* delay(3000)

    // Only start polling in the KnowYourCustomer store
    yield* put(knowYourCustomerActions.startPolling())
  } catch (error) {
    console.error('Error in processConfirmKYCDocumentsSaga:', error)
  }
}
