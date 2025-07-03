import { delay, put, select, take, race, call } from "typed-redux-saga"
import { knowYourCustomerActions, KYCVerificationServerStatus, KYCVerificationStatus } from "../KnowYourCustomer"
import { authorizedApiCall } from "@/utils/httpClient"
import { UserService } from "@klydo-io/getrewards-backend-api"
import { checkKycStatus } from "./checkKycStatus.saga"

export function* startPolling() {
  try {
    // Get the bridgeKYCEntity from the KnowYourCustomer store
    let existingBridgeKYC = yield* select(state => state.KnowYourCustomer.bridgeKYCEntity)
    console.log("startPolling - Current bridgeKYCEntity:", existingBridgeKYC)

    // If we don't have a bridgeKYCEntity or bridgeKycId, try to fetch it from the API
    if (!existingBridgeKYC || !existingBridgeKYC.bridgeKycId) {
      console.log("startPolling - No bridgeKYCEntity or bridgeKycId found, trying to fetch from API")
      try {
        // First try to get it from the user data
        const userDataResponse = yield* authorizedApiCall(UserService.getMe)
        existingBridgeKYC = userDataResponse.bridgeKyc
        console.log("startPolling - Fetched bridgeKYCEntity from user data:", existingBridgeKYC)

        // If we got a bridgeKYCEntity, store it
        if (existingBridgeKYC && existingBridgeKYC.bridgeKycId) {
          yield* put(knowYourCustomerActions.setBridgeKYCEntity(existingBridgeKYC))
        }
      } catch (fetchError) {
        console.error("startPolling - Error fetching user data:", fetchError)
      }

      // Check if we now have a valid bridgeKYCEntity
      if (!existingBridgeKYC || !existingBridgeKYC.bridgeKycId) {
        console.error("Cannot start polling: No bridgeKYCEntity or bridgeKycId found or could be fetched")
        yield* put(knowYourCustomerActions.setPolling(false))
        return
      }
    }

    // Set the polling flag to true
    yield* put(knowYourCustomerActions.setPolling(true))

    // Set status to PENDING while we're polling
    yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))

    // Get the polling interval from the store
    const pollingInterval = yield* select(state => state.KnowYourCustomer.pollingInterval)

    // Start the polling loop
    console.log("startPolling - Beginning polling loop with interval:", pollingInterval)
    while (true) {
      console.log("startPolling - Checking KYC status in polling loop")
      // Race between checking KYC status and stopping the polling
      const { stopped, result } = yield* race({
        result: call(checkKycStatus),
        stopped: take(knowYourCustomerActions.stopPolling.match),
        timeout: delay(pollingInterval)
      })

      console.log("startPolling - Race result:", { stopped: !!stopped, hasResult: !!result })

      // If stopPolling action was dispatched, exit the loop
      if (stopped) {
        yield* put(knowYourCustomerActions.setPolling(false))
        break
      }

      // If we got a result from checkKycStatus
      if (result) {
        console.log("startPolling - Received KYC status:", result.kyc_status)
        // If KYC is approved or rejected, stop polling
        if (result.kyc_status === KYCVerificationServerStatus.APPROVED ||
            result.kyc_status === KYCVerificationServerStatus.REJECTED) {
          console.log("startPolling - KYC process completed with status:", result.kyc_status, "- stopping polling")
          yield* put(knowYourCustomerActions.setPolling(false))
          break
        } else {
          console.log("startPolling - KYC still in progress with status:", result.kyc_status, "- continuing polling")
        }
      } else {
        console.log("startPolling - No result from checkKycStatus, continuing polling")
      }

      // Wait for the polling interval before checking again
      yield* delay(pollingInterval)
    }
  } catch (error) {
    console.error("Error in KYC polling saga:", error)
    yield* put(knowYourCustomerActions.setPolling(false))
  }
}