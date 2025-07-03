import { put, select, call } from "typed-redux-saga"
import { knowYourCustomerActions, TOSStatus, TOSServerStatus } from "../KnowYourCustomer"
import { authorizedApiCall } from "@/utils/httpClient"
import { BridgeKYCEntity, DirectVaultsService, UserService } from "@klydo-io/getrewards-backend-api"

export function* checkTosStatus() {
  try {
    // Get the bridgeKYCEntity from the KnowYourCustomer store
    let bridgeKYCEntity = yield* select(state => state.KnowYourCustomer.bridgeKYCEntity)
    console.log("checkTosStatus - Current bridgeKYCEntity:", bridgeKYCEntity)

    // If we don't have a bridgeKYCEntity or bridgeKycId, try to fetch it from the API
    if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
      console.log("checkTosStatus - No bridgeKYCEntity or bridgeKycId found, trying to fetch from API")
      try {
        // First try to get it from the user data
        const userDataResponse = yield* authorizedApiCall(UserService.getMe)
        bridgeKYCEntity = userDataResponse.bridgeKyc
        console.log("checkTosStatus - Fetched bridgeKYCEntity from user data:", bridgeKYCEntity)

        // If we got a bridgeKYCEntity, store it
        if (bridgeKYCEntity && bridgeKYCEntity.bridgeKycId) {
          yield* put(knowYourCustomerActions.setBridgeKYCEntity(bridgeKYCEntity))
        }
      } catch (fetchError) {
        console.error("checkTosStatus - Error fetching user data:", fetchError)
      }

      // Check if we now have a valid bridgeKYCEntity
      if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
        console.log("Cannot check TOS status: bridgeKYCEntity or bridgeKycId is undefined and could not be fetched")
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

    console.log("checkTosStatus - Received TOS status:", updatedBridgeKYCEntity.tos_status)
    console.log("checkTosStatus - TOS link:", updatedBridgeKYCEntity.tos_link)

    // Update the TOS status based on the response
    if (updatedBridgeKYCEntity.tos_status === TOSServerStatus.APPROVED) {
      console.log("checkTosStatus - TOS is ACCEPTED, setting status to ACCEPTED")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.ACCEPTED))
      // Stop polling if it's running
      yield* put(knowYourCustomerActions.setTosPolling(false))
      yield* put(knowYourCustomerActions.stopTosPolling())
    } else if (updatedBridgeKYCEntity.tos_status === TOSServerStatus.PENDING) {
      console.log("checkTosStatus - TOS is PENDING, setting status to PENDING")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
      // Continue polling as this is a pending state
    } else if (!updatedBridgeKYCEntity.tos_status) {
      // If TOS status is undefined or null, set to PENDING as a safe default
      console.log("checkTosStatus - TOS status is undefined or null, setting status to PENDING")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
    } else {
      // For any other unexpected statuses, set to PENDING as a safe default
      console.log("checkTosStatus - TOS has unexpected status", updatedBridgeKYCEntity.tos_status, "setting status to PENDING")
      yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
    }

    return updatedBridgeKYCEntity
  } catch (error) {
    console.error("Error checking TOS status:", error)
  }
}
