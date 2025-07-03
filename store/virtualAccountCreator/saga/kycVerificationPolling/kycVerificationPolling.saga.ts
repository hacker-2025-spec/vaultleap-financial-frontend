import { delay, put, select } from 'typed-redux-saga'
import { authorizedApiCall } from '@/utils/httpClient'
import { DirectVaultsService } from '@klydo-io/getrewards-backend-api'
import { virtualAccountCreatorActions } from '../../virtualAccountCreator.slice'
import { knowYourCustomerActions, KYCVerificationStatus, KYCVerificationServerStatus } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { knowYourCustomerSelectors } from '@/store/KnowYourCustomer/KnowYourCustomer.selectors'

export function* kycVerificationPollingSaga() {
  try {
    console.log('kycVerificationPollingSaga - Starting')
    // Use the KnowYourCustomer store for KYC status and entity
    const kycVerificationStatus = yield* select(knowYourCustomerSelectors.selectKycVerificationStatus)
    const existingBridgeKYC = yield* select(knowYourCustomerSelectors.selectBridgeKYCEntity)

    console.log('kycVerificationPollingSaga - kycVerificationStatus:', kycVerificationStatus)
    console.log('kycVerificationPollingSaga - existingBridgeKYC:', existingBridgeKYC)

    if (existingBridgeKYC && existingBridgeKYC.bridgeKycId && kycVerificationStatus !== KYCVerificationStatus.PENDING) {
      // Update both stores
      yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))

      while (true) {
        // Ensure bridgeKYCId is a string as required by the API
        const bridgeKYCId = String(existingBridgeKYC.bridgeKycId)

        const bridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.checkKyc, {
          bridgeKYCId,
        })

        let shouldExit = false

        console.log('kycVerificationPollingSaga - Received KYC status:', bridgeKYCEntity.kyc_status)

        if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.APPROVED) {
          // Update both stores
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
          yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
          shouldExit = true
        } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.REJECTED) {
          // Update both stores
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
          yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
          shouldExit = true
        }

        if (shouldExit) {
          break
        }

        yield* delay(3000)
        break
      }
    }
  } catch (error) {
    console.error(error)
  }
}
