import { put, call, select } from 'typed-redux-saga'
import { knowYourCustomerActions, KYCVerificationServerStatus, KYCVerificationStatus, TOSStatus, TOSServerStatus } from '../KnowYourCustomer'
import { authorizedApiCall } from '@/utils/httpClient'
import { UserService } from '@klydo-io/getrewards-backend-api'
import { checkKycStatus } from './checkKycStatus.saga'
import { checkTosStatus } from './checkTosStatus.saga'
import { directVaultCreatorSelectors } from '@/store/directVaultCreator/directVaultCreator.selectors'
import { virtualAccountCreatorSelectors } from '@/store/virtualAccountCreator/virtualAccountCreator.selectors'

export function* init() {
  try {
    // First get user data from /api/me to get the bridgeKYCEntity
    const userDataResponse = yield* authorizedApiCall(UserService.getMe)
    const bridgeKYCEntity = userDataResponse.bridgeKyc

    if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      return
    }

    // Store the bridgeKYCEntity in the redux store
    yield* put(knowYourCustomerActions.setBridgeKYCEntity(bridgeKYCEntity))

    // Check if customerInfo exists in either directVaultCreator or virtualAccountCreator store
    const directVaultCustomerInfo = yield* select(directVaultCreatorSelectors.selectCustomerInfo)
    const virtualAccountCustomerInfo = yield* select(virtualAccountCreatorSelectors.selectCustomerInfo)

    // Use whichever customerInfo is available
    if (directVaultCustomerInfo) {
      console.log('KYC init saga - Using customerInfo from directVaultCreator:', directVaultCustomerInfo)
      yield* put(knowYourCustomerActions.setCustomerInfo(directVaultCustomerInfo))
    } else if (virtualAccountCustomerInfo) {
      console.log('KYC init saga - Using customerInfo from virtualAccountCreator:', virtualAccountCustomerInfo)
      yield* put(knowYourCustomerActions.setCustomerInfo(virtualAccountCustomerInfo))
    }

    // Now check the actual KYC status using the direct-vaults/check-kyc-status endpoint
    // but don't start polling - we only want to poll after the user completes KYC with Persona
    yield* call(checkKycStatus)

    // Also check TOS status
    const updatedBridgeKYCEntity = yield* call(checkTosStatus)

    // Update TOS status based on the response
    if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.APPROVED) {
      console.log("init saga - TOS is ACCEPTED, setting status to ACCEPTED")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.ACCEPTED))
    } else if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.PENDING) {
      console.log("init saga - TOS is PENDING, setting status to PENDING and starting polling")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
      // Start polling for TOS status if it's pending
      yield* put(knowYourCustomerActions.startTosPolling())
    } else {
      // Default to pending for any other status or if undefined
      console.log("init saga - TOS status is unknown or undefined, defaulting to PENDING")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
      // Start polling for TOS status
      yield* put(knowYourCustomerActions.startTosPolling())
    }
  } catch (error) {
    console.error("Error in KYC init saga:", error)
    // Fallback to using the status from /api/me if the check-kyc-status fails
    const userDataResponse = yield* authorizedApiCall(UserService.getMe)
    const bridgeKYCEntity = userDataResponse.bridgeKyc

    if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      return
    }

    switch (bridgeKYCEntity.kyc_status) {
      case KYCVerificationServerStatus.APPROVED:
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
        break
      case KYCVerificationServerStatus.REJECTED:
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
        break
      case KYCVerificationServerStatus.NOT_STARTED:
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        break
      default:
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
        // Don't start polling here - we only want to poll after the user completes KYC with Persona
    }
  }
}