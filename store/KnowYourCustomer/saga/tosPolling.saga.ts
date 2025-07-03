import { delay, put, select, take, race, call } from "typed-redux-saga"
import { knowYourCustomerActions, TOSStatus, TOSServerStatus } from "../KnowYourCustomer"
import { checkTosStatus } from "./checkTosStatus.saga"

export function* startTosPolling() {
  try {
    // Get the current TOS status
    const tosStatus = yield* select(state => state.KnowYourCustomer.tosStatus)
    console.log("startTosPolling - Current TOS status:", tosStatus)

    // Get the polling interval
    const pollingInterval = yield* select(state => state.KnowYourCustomer.pollingInterval)
    console.log("startTosPolling - Polling interval:", pollingInterval)

    // Set polling flag to true
    yield* put(knowYourCustomerActions.setTosPolling(true))

    // Start polling loop
    while (true) {
      // Check if we should continue polling
      const isTosPolling = yield* select(state => state.KnowYourCustomer.isTosPolling)
      if (!isTosPolling) {
        console.log("startTosPolling - Polling stopped")
        break
      }

      // Check TOS status
      console.log("startTosPolling - Checking TOS status...")
      const updatedBridgeKYCEntity = yield* call(checkTosStatus)
      console.log(updatedBridgeKYCEntity, "KYC UPDATED STATUS", updatedBridgeKYCEntity?.tos_status, TOSServerStatus.APPROVED)

      // If TOS is accepted, stop polling and update status
      if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.APPROVED) {
        console.log("startTosPolling - TOS is ACCEPTED, stopping polling")
        // Set TOS status to ACCEPTED
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.ACCEPTED))
        // Reset localTosAccepted when server confirms TOS acceptance
        yield* put(knowYourCustomerActions.setLocalTosAccepted(false))
        // Stop polling
        yield* put(knowYourCustomerActions.setTosPolling(false))
        yield* put(knowYourCustomerActions.stopTosPolling())
        break
      }

      // Wait for the polling interval or for a stop polling action
      const { timeout } = yield* race({
        stopPolling: take(knowYourCustomerActions.stopTosPolling),
        timeout: delay(pollingInterval)
      })

      // If we received a stop polling action, break the loop
      if (!timeout) {
        console.log("startTosPolling - Received stop polling action")
        yield* put(knowYourCustomerActions.setTosPolling(false))
        break
      }
    }
  } catch (error) {
    console.error("Error in TOS polling saga:", error)
    yield* put(knowYourCustomerActions.setTosPolling(false))
  }
}
