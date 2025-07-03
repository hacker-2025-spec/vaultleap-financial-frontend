import { delay, put, select } from "typed-redux-saga"
import { knowYourCustomerActions, KYCVerificationStatus, VaultType } from "../KnowYourCustomer"
import { authorizedApiCall } from '@/utils/httpClient'
import { DirectVaultsService } from '@klydo-io/getrewards-backend-api'
import { directVaultCreatorActions } from '@/store/directVaultCreator/directVaultCreator.slice'
import { virtualAccountCreatorActions } from '@/store/virtualAccountCreator/virtualAccountCreator.slice'
import { DirectVaultCreatorStages } from '@/store/directVaultCreator/directVaultCreator.types'
import { VirtualAccountCreatorStages } from '@/store/virtualAccountCreator/virtualAccountCreator.types'
import { knowYourCustomerSelectors } from '../KnowYourCustomer.selectors'

export function* retry() {
  console.log('KnowYourCustomer retry saga - Starting')
  const alreadyRetrying = yield* select(knowYourCustomerSelectors.selectIsKycRetrying)
  console.log('KnowYourCustomer retry saga - alreadyRetrying:', alreadyRetrying)

  if (!alreadyRetrying) {
    try {
      console.log('KnowYourCustomer retry saga - Setting retryingKYC flag')
      yield* put(knowYourCustomerActions.setRetryingKYC())

      // Get the vault type to determine which store to update
      const vaultType = yield* select(knowYourCustomerSelectors.selectVaultType)
      console.log('KnowYourCustomer retry saga - vaultType:', vaultType)

      // Set the current stage to KYC to ensure we're on the right step
      if (vaultType === VaultType.DIRECT) {
        yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.KYC))
      } else if (vaultType === VaultType.VIRTUAL) {
        yield* put(virtualAccountCreatorActions.setCurrentStage(VirtualAccountCreatorStages.KYC))
      }

      // Get the current bridgeKYCEntity to get the bridgeKycId
      const existingBridgeKYC = yield* select(knowYourCustomerSelectors.selectBridgeKYCEntity)
      const customerInfo = yield* select(knowYourCustomerSelectors.selectCustomerInfo)
      console.log('KnowYourCustomer retry saga - existingBridgeKYC:', existingBridgeKYC)
      console.log('KnowYourCustomer retry saga - customerInfo:', customerInfo)

      if (existingBridgeKYC && existingBridgeKYC.bridgeKycId) {
        // Call the API to get the latest KYC status and URL
        const bridgeKYCId = String(existingBridgeKYC.bridgeKycId)

        try {
          // Get the updated KYC entity with the latest URL
          const updatedBridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.checkKyc, {
            bridgeKYCId,
          })

          console.log('KnowYourCustomer retry saga - Updated KYC entity for retry:', updatedBridgeKYCEntity)

          if (!updatedBridgeKYCEntity.kyc_link && customerInfo) {
            console.error('KnowYourCustomer retry saga - KYC link is missing in the response')
            // If no KYC link is present, try to create a new KYC entity
            const newBridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.createCustom, {
              customer: {
                type: customerInfo.type === 'business' ? 'business' : 'individual',
                full_name: customerInfo.fullName,
                email: customerInfo.email,
              },
            })

            console.log('KnowYourCustomer retry saga - Created new KYC entity:', newBridgeKYCEntity)

            // Update the bridgeKYCEntity in the store with the new data
            yield* put(knowYourCustomerActions.setBridgeKYCEntity(newBridgeKYCEntity))
          } else {
            // Update the bridgeKYCEntity in the store with the latest data
            yield* put(knowYourCustomerActions.setBridgeKYCEntity(updatedBridgeKYCEntity))
          }

          // Set the KYC verification status to NOT_STARTED to trigger the BridgeKYC component
          console.log('KnowYourCustomer retry saga - Setting KYC status to NOT_STARTED')
          yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        } catch (apiError) {
          console.error('KnowYourCustomer retry saga - Error fetching updated KYC entity:', apiError)
          // If the API call fails, still set the status to NOT_STARTED as a fallback
          yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        }
      } else {
        console.error('KnowYourCustomer retry saga - Cannot retry KYC: Missing required data', {
          hasBridgeKYCEntity: !!existingBridgeKYC,
          hasBridgeKycId: !!(existingBridgeKYC && existingBridgeKYC.bridgeKycId),
        })
        yield* delay(2000)
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      }
    } catch (error) {
      console.error('KnowYourCustomer retry saga - Error in retry saga:', error)
    } finally {
      console.log('KnowYourCustomer retry saga - Clearing retryingKYC flag')
      yield* put(knowYourCustomerActions.clearRetryingKYC())
    }
  }
}