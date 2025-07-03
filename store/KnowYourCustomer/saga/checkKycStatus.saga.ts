import { put, select, call } from "typed-redux-saga"
import { knowYourCustomerActions, KYCVerificationServerStatus, KYCVerificationStatus } from "../KnowYourCustomer"
import { authorizedApiCall } from "@/utils/httpClient"
import { BridgeKYCEntity, DirectVaultsService, UserService } from "@klydo-io/getrewards-backend-api"

export function* checkKycStatus() {
  try {
    // Get the bridgeKYCEntity from the KnowYourCustomer store
    let bridgeKYCEntity = yield* select(state => state.KnowYourCustomer.bridgeKYCEntity)
    console.log("checkKycStatus - Current bridgeKYCEntity:", bridgeKYCEntity)

    // If we don't have a bridgeKYCEntity or bridgeKycId, try to fetch it from the API
    if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
      console.log("checkKycStatus - No bridgeKYCEntity or bridgeKycId found, trying to fetch from API")
      try {
        // First try to get it from the user data
        const userDataResponse = yield* authorizedApiCall(UserService.getMe)
        bridgeKYCEntity = userDataResponse.bridgeKyc
        console.log("checkKycStatus - Fetched bridgeKYCEntity from user data:", bridgeKYCEntity)

        // If we got a bridgeKYCEntity, store it
        if (bridgeKYCEntity && bridgeKYCEntity.bridgeKycId) {
          yield* put(knowYourCustomerActions.setBridgeKYCEntity(bridgeKYCEntity))
        }
      } catch (fetchError) {
        console.error("checkKycStatus - Error fetching user data:", fetchError)
      }

      // Check if we now have a valid bridgeKYCEntity
      if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
        console.log("Cannot check KYC status: bridgeKYCEntity or bridgeKycId is undefined and could not be fetched")
        return
      }
    }

    // Call the direct-vaults/check-kyc-status endpoint
    // Ensure bridgeKYCId is a string as required by the API
    const bridgeKYCId = String(bridgeKYCEntity.bridgeKycId)

    const updatedBridgeKYCEntity = (yield* call(authorizedApiCall, DirectVaultsService.checkKyc, {
      bridgeKYCId,
    })) as BridgeKYCEntity

    // Update the bridgeKYCEntity in the store
    yield* put(knowYourCustomerActions.setBridgeKYCEntity(updatedBridgeKYCEntity))

    console.log("checkKycStatus - Received KYC status:", updatedBridgeKYCEntity.kyc_status)

    // Update the KYC verification status based on the response
    if (updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.APPROVED) {
      console.log("checkKycStatus - KYC is APPROVED, setting status to SUCCESS")
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
      // Stop polling if it's running
      yield* put(knowYourCustomerActions.setPolling(false))
      yield* put(knowYourCustomerActions.stopPolling())
    } else if (updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.REJECTED) {
      console.log("checkKycStatus - KYC is REJECTED, setting status to FAILED")
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
      // Stop polling if it's running
      yield* put(knowYourCustomerActions.setPolling(false))
      yield* put(knowYourCustomerActions.stopPolling())
    } else if (updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.NOT_STARTED || updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.INCOMPLETE) {
      console.log("checkKycStatus - KYC is NOT_STARTED, setting status to NOT_STARTED")
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
    } else if (
      // All these statuses are considered pending and should continue polling

      updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.PENDING ||
      updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.AWAITING_UBO ||
      updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.MANUAL_REVIEW ||
      updatedBridgeKYCEntity.kyc_status === KYCVerificationServerStatus.UNDER_REVIEW
    ) {
      console.log("checkKycStatus - KYC is in a pending state:", updatedBridgeKYCEntity.kyc_status, "setting status to PENDING")
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
      // Continue polling as this is a pending state
    } else {
      // For any other unexpected statuses, set to PENDING as a safe default
      console.log("checkKycStatus - KYC has unexpected status", updatedBridgeKYCEntity.kyc_status, "setting status to PENDING")
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
    }

    return updatedBridgeKYCEntity
  } catch (error) {
    console.error("Error checking KYC status:", error)
  }
}
