import { put, call } from 'typed-redux-saga'
import { directVaultCreatorActions, DirectVaultCreatorActions } from '../../directVaultCreator.slice'
import { CustomerType, DirectVaultCreatorStages } from '../../directVaultCreator.types'
import { authorizedApiCall } from '@/utils/httpClient'
import { CustomerEntity, DirectVaultsService, UserService } from '@klydo-io/getrewards-backend-api'
import { pushNotification } from '@/utils/toast'
import { userActions } from '@/store/user/user.slice'
import { knowYourCustomerActions, KYCVerificationStatus, KYCVerificationServerStatus, TOSStatus, TOSServerStatus, VaultType } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { checkTosStatus } from '@/store/KnowYourCustomer/saga/checkTosStatus.saga'

export function* processFinishPersonalInfoFormSaga({ payload }: DirectVaultCreatorActions['finishPersonalInfoForm']) {
  try {
    const { type, fullName, email, isNew } = payload
    if (isNew) {
      const bridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.createCustom, {
        customer: {
          type: type === CustomerType.BUSINESS ? CustomerEntity.type.BUSINESS : CustomerEntity.type.INDIVIDUAL,
          full_name: fullName,
          email: email
        },
      })

      pushNotification('Info saved!')

      // Update the KnowYourCustomer store with the bridgeKYCEntity and customerInfo
      yield* put(knowYourCustomerActions.setBridgeKYCEntity(bridgeKYCEntity))
      yield* put(knowYourCustomerActions.setVaultType(VaultType.DIRECT))

      const customerInfo = {
        customerId: bridgeKYCEntity.customer_id,
        type,
        fullName,
        email,
      }

      yield* put(directVaultCreatorActions.setCustomerInfo(customerInfo))
      yield* put(knowYourCustomerActions.setCustomerInfo(customerInfo))

      // Also update the directVaultCreator store for backward compatibility
      yield* put(directVaultCreatorActions.setBridgeKYCEntity(bridgeKYCEntity))
      const userDataResponse = yield* authorizedApiCall(UserService.getMe)
      yield* put(userActions.updateUserData(userDataResponse))

      // Check TOS status and start polling if needed
      const updatedBridgeKYCEntity = yield* call(checkTosStatus)

      if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.APPROVED) {
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.ACCEPTED))
      } else if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.PENDING) {
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
        // Start polling for TOS status
        yield* put(knowYourCustomerActions.startTosPolling())
      } else {
        // Default to pending for any other status
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
        // Start polling for TOS status
        yield* put(knowYourCustomerActions.startTosPolling())
      }
    } else {
      yield* put(directVaultCreatorActions.setNextStepLoading())

      const bridgeKYCEntity = yield* authorizedApiCall(DirectVaultsService.createCustom, {
        customer: {
          type: type === CustomerType.BUSINESS ? CustomerEntity.type.BUSINESS : CustomerEntity.type.INDIVIDUAL,
          full_name: fullName,
          email: email,
        },
      })

      pushNotification('Customer successfully created')

      // Update the KnowYourCustomer store with the bridgeKYCEntity and customerInfo
      yield* put(knowYourCustomerActions.setBridgeKYCEntity(bridgeKYCEntity))
      yield* put(knowYourCustomerActions.setVaultType(VaultType.DIRECT))

      const customerInfo = {
        customerId: bridgeKYCEntity.customer_id,
        type,
        fullName,
        email,
      }

      yield* put(directVaultCreatorActions.setCustomerInfo(customerInfo))
      yield* put(knowYourCustomerActions.setCustomerInfo(customerInfo))

      // Also update the directVaultCreator store for backward compatibility
      yield* put(directVaultCreatorActions.setBridgeKYCEntity(bridgeKYCEntity))

      // Check TOS status and start polling if needed
      const updatedBridgeKYCEntity = yield* call(checkTosStatus)

      if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.APPROVED) {
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.ACCEPTED))
      } else if (updatedBridgeKYCEntity?.tos_status === TOSServerStatus.PENDING) {
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
        // Start polling for TOS status
        yield* put(knowYourCustomerActions.startTosPolling())
      } else {
        // Default to pending for any other status
        yield* put(knowYourCustomerActions.setTOSStatus(TOSStatus.PENDING))
        // Start polling for TOS status
        yield* put(knowYourCustomerActions.startTosPolling())
      }

      if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.APPROVED) {
        yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
      } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.REJECTED) {
        yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
      } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.NOT_STARTED) {
        yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      } else {
        // Don't start polling on form submission - only after KYC completion
        yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
        yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
      }

      yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.KYC))
    }
  } catch (error) {
    console.error(error)
  } finally {
    yield* put(directVaultCreatorActions.clearNextStepLoading())
  }
}
