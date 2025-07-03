import { userSelectors } from '@/store/user/user.selectors'
import { put, select } from 'typed-redux-saga'
import { CustomerEntity } from '@klydo-io/getrewards-backend-api'
import { virtualAccountCreatorActions } from '../../virtualAccountCreator.slice'
import { VirtualAccountCreatorStages } from '../../virtualAccountCreator.types'
import { CustomerType, KYCVerificationServerStatus, KYCVerificationStatus } from '@/store/directVaultCreator/directVaultCreator.types'

export function* initCurrentCreationStageSaga() {
  yield* put(virtualAccountCreatorActions.resetStore())

  try {
    const customer = yield* select(userSelectors.selectDirectVaultCustomer)
    const bridgeKYCEntity = yield* select(userSelectors.selectDirectVaultBridgeKYC)

    console.log("initCurrentCreationStageSaga - customer:", customer)
    console.log("initCurrentCreationStageSaga - bridgeKYCEntity:", bridgeKYCEntity)

    if (!customer || !bridgeKYCEntity) {
      yield* put(virtualAccountCreatorActions.setCurrentStage(VirtualAccountCreatorStages.PROVIDE_INFO))
    } else {
      yield* put(virtualAccountCreatorActions.setBridgeKYCEntity(bridgeKYCEntity))

      const customerInfo = {
        customerId: customer.bridgeCustomerId,
        type: customer.type === CustomerEntity.type.BUSINESS ? CustomerType.BUSINESS : CustomerType.INDIVIDUAL,
        fullName: bridgeKYCEntity.full_name,
        email: customer.email,
      }

      yield* put(virtualAccountCreatorActions.setCustomerInfo(customerInfo))

      if (bridgeKYCEntity.kyc_status !== KYCVerificationServerStatus.APPROVED) {
        yield* put(virtualAccountCreatorActions.setCurrentStage(VirtualAccountCreatorStages.KYC))

        if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.REJECTED) {
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
        } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.INCOMPLETE) {
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.INCOMPLETE))
        } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.NOT_STARTED) {
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        } else {
          // Don't start polling on app load - only after KYC completion
          yield* put(virtualAccountCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
        }
      } else {
        yield* put(virtualAccountCreatorActions.setCurrentStage(VirtualAccountCreatorStages.CONFIRM))
      }
    }

    yield* put(virtualAccountCreatorActions.setInitializedCurrentCreationStage())
  } catch (error) {
    console.error(error)
  }
}
