import { delay, put, select } from 'typed-redux-saga'
import { virtualAccountCreatorSelectors } from '../../virtualAccountCreator.selectors'
import { virtualAccountCreatorActions } from '../../virtualAccountCreator.slice'
import { VirtualAccountCreatorStages } from '../../virtualAccountCreator.types'
import { KYCVerificationStatus } from '@/store/directVaultCreator/directVaultCreator.types'
import { authorizedApiCall } from '@/utils/httpClient'
import { DirectVaultsService } from '@klydo-io/getrewards-backend-api'

export function* processRetryKYCVerificationSaga() {
  console.log('processRetryKYCVerificationSaga - Starting')
  const alreadyRetrying = yield* select(virtualAccountCreatorSelectors.selectIsRetryingKYC)
  console.log('processRetryKYCVerificationSaga - alreadyRetrying:', alreadyRetrying)

  if (!alreadyRetrying) {
    try {
      console.log('processRetryKYCVerificationSaga - Setting retryingKYC flag')
      yield* put(virtualAccountCreatorActions.setRetryingKYC())

      // Get the current bridgeKYCEntity to get the bridgeKycId
      const existingBridgeKYC = yield* select(virtualAccountCreatorSelectors.selectBridgeKYCEntity)
      const customerInfo = yield* select(virtualAccountCreatorSelectors.selectCustomerInfo)
      console.log('processRetryKYCVerificationSaga - existingBridgeKYC:', existingBridgeKYC)
      console.log('processRetryKYCVerificationSaga - customerInfo:', customerInfo)

      if (existingBridgeKYC && existingBridgeKYC.bridgeKycId && customerInfo) {
        // Call the API to get the latest KYC status and URL
        const bridgeKYCId = String(existingBridgeKYC.bridgeKycId)

        try {
          // Get the updated KYC entity with the latest URL
          const updatedBridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.checkKyc, {
            bridgeKYCId,
          })

          console.log('Updated KYC entity for retry:', updatedBridgeKYCEntity)

          if (!updatedBridgeKYCEntity.kyc_link) {
            console.error('KYC link is missing in the response')
            // If no KYC link is present, try to create a new KYC entity
            const newBridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.createCustom, {
              customer: {
                type: customerInfo.type === 'business' ? 'business' : 'individual',
                full_name: customerInfo.fullName,
                email: customerInfo.email,
              },
            })

            console.log('Created new KYC entity:', newBridgeKYCEntity)

            // Update the bridgeKYCEntity in the store with the new data
            yield* put(virtualAccountCreatorActions.setBridgeKYCEntity(newBridgeKYCEntity))
          } else {
            // Update the bridgeKYCEntity in the store with the latest data
            yield* put(virtualAccountCreatorActions.setBridgeKYCEntity(updatedBridgeKYCEntity))
          }

          // Set the KYC verification status to NOT_STARTED to trigger the BridgeKYC component
          console.log('processRetryKYCVerificationSaga - Setting KYC status to NOT_STARTED')
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))

          // Set the current stage to KYC to ensure we're on the right step
          console.log('processRetryKYCVerificationSaga - Setting current stage to KYC')
          yield* put(virtualAccountCreatorActions.setCurrentStage(VirtualAccountCreatorStages.KYC))
        } catch (apiError) {
          console.error('Error fetching updated KYC entity:', apiError)
          // If the API call fails, still set the status to NOT_STARTED as a fallback
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        }
      } else {
        console.error('Cannot retry KYC: Missing required data', {
          hasBridgeKYCEntity: !!existingBridgeKYC,
          hasBridgeKycId: !!(existingBridgeKYC && existingBridgeKYC.bridgeKycId),
          hasCustomerInfo: !!customerInfo
        })
        yield* delay(2000)
        yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      }
    } catch (error) {
      console.error('Error in retryKYCVerification saga:', error)
    } finally {
      console.log('processRetryKYCVerificationSaga - Clearing retryingKYC flag')
      yield* put(virtualAccountCreatorActions.clearRetryingKYC())
    }
  }
}
