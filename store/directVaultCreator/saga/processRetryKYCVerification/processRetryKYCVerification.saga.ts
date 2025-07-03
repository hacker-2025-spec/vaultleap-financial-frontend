import { delay, put, select } from "typed-redux-saga"
import { directVaultCreatorSelectors } from "../../directVaultCreator.selectors"
import { directVaultCreatorActions } from "../../directVaultCreator.slice"
import { DirectVaultCreatorStages, KYCVerificationStatus } from "../../directVaultCreator.types"
import { authorizedApiCall } from '@/utils/httpClient'
import { DirectVaultsService } from '@klydo-io/getrewards-backend-api'

export function* processRetryKYCVerificationSaga() {
  const alreadyRetrying = yield* select(directVaultCreatorSelectors.selectIsRetryingKYC)

  if (!alreadyRetrying) {
    try {
      yield* put(directVaultCreatorActions.setRetryingKYC())

      // Get the current bridgeKYCEntity to get the bridgeKycId
      const existingBridgeKYC = yield* select(directVaultCreatorSelectors.selectBridgeKYCEntity)
      const customerInfo = yield* select(directVaultCreatorSelectors.selectCustomerInfo)

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
            yield* put(directVaultCreatorActions.setBridgeKYCEntity(newBridgeKYCEntity))
          } else {
            // Update the bridgeKYCEntity in the store with the latest data
            yield* put(directVaultCreatorActions.setBridgeKYCEntity(updatedBridgeKYCEntity))
          }

          // Set the KYC verification status to NOT_STARTED to trigger the BridgeKYC component
          yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))

          // Set the current stage to KYC to ensure we're on the right step
          yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.KYC))
        } catch (apiError) {
          console.error('Error fetching updated KYC entity:', apiError)
          // If the API call fails, still set the status to NOT_STARTED as a fallback
          yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        }
      } else {
        console.error('Cannot retry KYC: Missing required data', {
          hasBridgeKYCEntity: !!existingBridgeKYC,
          hasBridgeKycId: !!(existingBridgeKYC && existingBridgeKYC.bridgeKycId),
          hasCustomerInfo: !!customerInfo
        })
        yield* delay(2000)
        yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      }
    } catch (error) {
      console.error('Error in retryKYCVerification saga:', error)
    } finally {
      yield* put(directVaultCreatorActions.clearRetryingKYC())
    }
  }
}