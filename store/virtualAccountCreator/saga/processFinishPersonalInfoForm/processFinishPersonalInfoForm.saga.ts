import { put, call } from 'typed-redux-saga'
import { authorizedApiCall } from '@/utils/httpClient'
import { CustomerEntity, DirectVaultsService } from '@klydo-io/getrewards-backend-api'
import { pushNotification } from '@/utils/toast'
import { VirtualAccountCreatorActions, virtualAccountCreatorActions } from '../../virtualAccountCreator.slice'
import { CustomerType } from '@/store/directVaultCreator/directVaultCreator.types'
import { VirtualAccountCreatorStages } from '../../virtualAccountCreator.types'
import { knowYourCustomerActions, KYCVerificationStatus, KYCVerificationServerStatus, TOSStatus, TOSServerStatus, VaultType } from '@/store/KnowYourCustomer/KnowYourCustomer'
import { checkTosStatus } from '@/store/KnowYourCustomer/saga/checkTosStatus.saga'

export function* processFinishPersonalInfoFormSaga({ payload }: VirtualAccountCreatorActions['finishPersonalInfoForm']) {
  try {
    const { type, fullName, email } = payload

    yield* put(virtualAccountCreatorActions.setNextStepLoading())

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
    yield* put(knowYourCustomerActions.setVaultType(VaultType.VIRTUAL))

    const customerInfo = {
      customerId: bridgeKYCEntity.customer_id,
      type,
      fullName,
      email,
    }

    yield* put(virtualAccountCreatorActions.setCustomerInfo(customerInfo))
    yield* put(knowYourCustomerActions.setCustomerInfo(customerInfo))

    // Also update the virtualAccountCreator store for backward compatibility
    yield* put(virtualAccountCreatorActions.setBridgeKYCEntity(bridgeKYCEntity))

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
      yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
    } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.REJECTED) {
      yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
    } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.NOT_STARTED) {
      yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
    } else {
      // Don't start polling on form submission - only after KYC completion
      yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
      yield* put(knowYourCustomerActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
    }

    yield* put(virtualAccountCreatorActions.setCurrentStage(VirtualAccountCreatorStages.KYC))
  } catch (error) {
    console.error(error)
  } finally {
    yield* put(virtualAccountCreatorActions.clearNextStepLoading())
  }
}
