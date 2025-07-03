import { delay, put, call, select } from "typed-redux-saga"
import { knowYourCustomerActions, KnowYourCustomerActions, KYCVerificationServerStatus } from "../KnowYourCustomer"
import { checkKycStatus } from "./checkKycStatus.saga"
import { authorizedApiCall } from "@/utils/httpClient"
import { UserService, DirectVaultsService } from "@klydo-io/getrewards-backend-api"
import { KYCVerificationStatus } from '@/store/directVaultCreator/directVaultCreator.types'

export function* confirm({ payload }: KnowYourCustomerActions["confirm"]) {
  try {
    console.log("KYC confirm saga: Starting polling after Persona KYC completion with inquiryId:", payload.inquiryId)

    // Short delay to allow the KYC process to be registered on the server
    yield* delay(3000)

    // First, check if we already have a bridgeKYCEntity
    let bridgeKYCEntity = yield* select(state => state.KnowYourCustomer.bridgeKYCEntity)
    console.log("KYC confirm saga: Current bridgeKYCEntity:", bridgeKYCEntity)

    // If we don't have a bridgeKYCEntity or bridgeKycId, fetch it from the API
    if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
      console.log("KYC confirm saga: No bridgeKYCEntity or bridgeKycId found, fetching from API")
      try {
        // First try to get it from the user data
        const userDataResponse = yield* authorizedApiCall(UserService.getMe)
        bridgeKYCEntity = userDataResponse.bridgeKyc
        console.log("KYC confirm saga: Fetched bridgeKYCEntity from user data:", bridgeKYCEntity)

        // If we got a bridgeKYCEntity, store it
        if (bridgeKYCEntity && bridgeKYCEntity.bridgeKycId) {
          yield* put(knowYourCustomerActions.setBridgeKYCEntity(bridgeKYCEntity))
        } else {
          console.log("KYC confirm saga: No bridgeKYCEntity found in user data")
          // If we still don't have a bridgeKYCEntity, we can't proceed with polling
          // Try to get customer info to create a new KYC entity
          const customerInfo = yield* select(state => state.KnowYourCustomer.customerInfo)
          if (customerInfo) {
            console.log("KYC confirm saga: Creating new KYC entity with customer info:", customerInfo)
            try {
              // Create a new KYC entity
              const newBridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.createCustom, {
                customer: {
                  type: customerInfo.type === 'business' ? 'business' : 'individual',
                  full_name: customerInfo.fullName,
                  email: customerInfo.email,
                },
              })
              console.log("KYC confirm saga: Created new KYC entity:", newBridgeKYCEntity)
              // Store the new bridgeKYCEntity
              yield* put(knowYourCustomerActions.setBridgeKYCEntity(newBridgeKYCEntity))
              bridgeKYCEntity = newBridgeKYCEntity
            } catch (createError) {
              console.error("KYC confirm saga: Error creating new KYC entity:", createError)
            }
          } else {
            console.error("KYC confirm saga: No customer info found, cannot create new KYC entity")
          }
        }
      } catch (fetchError) {
        console.error("KYC confirm saga: Error fetching user data:", fetchError)
      }
    }

    // Check if we now have a valid bridgeKYCEntity
    if (!bridgeKYCEntity || !bridgeKYCEntity.bridgeKycId) {
      console.error("KYC confirm saga: Still no valid bridgeKYCEntity, cannot start polling")
      return
    }

    // Now check the current KYC status
    const result = yield* call(checkKycStatus)

    // If the KYC is already approved or rejected, don't start polling
    if (result && (result.kyc_status === KYCVerificationServerStatus.APPROVED ||
                  result.kyc_status === KYCVerificationServerStatus.REJECTED)) {
      console.log(`KYC confirm saga: KYC already ${result.kyc_status}, not starting polling`)
      return
    }

    // Start polling to continuously check for status updates
    console.log("KYC confirm saga: Starting polling for status updates")
    try {
      // Set polling flag to true to ensure UI shows loading state
      yield* put(knowYourCustomerActions.setPolling(true))
      // Set status to PENDING while we're polling
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
      // Start the polling saga
      yield* put(knowYourCustomerActions.startPolling())
      console.log("KYC confirm saga: Successfully dispatched startPolling action")
    } catch (pollingError) {
      console.error("KYC confirm saga: Error starting polling:", pollingError)
      // If there's an error, make sure we're not stuck in polling state
      yield* put(knowYourCustomerActions.setPolling(false))
    }
  } catch (error) {
    console.error("Error in KYC confirm saga:", error)
  }
}