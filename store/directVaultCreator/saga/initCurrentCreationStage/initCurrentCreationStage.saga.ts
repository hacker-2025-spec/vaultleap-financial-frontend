import { userSelectors } from '@/store/user/user.selectors'
import { all, call, put, select } from 'typed-redux-saga'
import { directVaultCreatorActions } from '../../directVaultCreator.slice'
import { CustomerType, DirectVaultCreatorStages, KYCVerificationServerStatus, KYCVerificationStatus } from '../../directVaultCreator.types'
import {
  BankingInfoEntity,
  BankingInfoService,
  CustomerEntity,
  LiquidationAddressEntity,
  LiquidationAddressesService,
} from '@klydo-io/getrewards-backend-api'
import { authorizedApiCall } from '@/utils/httpClient'

export function* initCurrentCreationStageSaga() {
  yield* put(directVaultCreatorActions.resetStore())

  try {
    const customer = yield* select(userSelectors.selectDirectVaultCustomer)
    const bridgeKYCEntity = yield* select(userSelectors.selectDirectVaultBridgeKYC)

    const results = yield* all([
      call(authorizedApiCall, LiquidationAddressesService.getLiquidationAddressByAuth0Id),
      call(authorizedApiCall, BankingInfoService.getBankingInfo),
    ])
    const [liquidationAddressesList, bankingInfoList] = results as [LiquidationAddressEntity[], BankingInfoEntity[]]

    if (!customer || !bridgeKYCEntity) {
      yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.PROVIDE_INFO))
    } else {
      yield* put(directVaultCreatorActions.setBridgeKYCEntity(bridgeKYCEntity))

      const customerInfo = {
        customerId: customer.bridgeCustomerId,
        type: customer.type === CustomerEntity.type.BUSINESS ? CustomerType.BUSINESS : CustomerType.INDIVIDUAL,
        fullName: bridgeKYCEntity.full_name,
        email: customer.email,
      }

      yield* put(directVaultCreatorActions.setCustomerInfo(customerInfo))

      if (bridgeKYCEntity.kyc_status !== KYCVerificationServerStatus.APPROVED) {
        yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.KYC))

        if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.REJECTED) {
          yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.FAILED))
        } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.NOT_STARTED) {
          yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.NOT_STARTED))
        } else if (bridgeKYCEntity.kyc_status === KYCVerificationServerStatus.INCOMPLETE) {
          yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.INCOMPLETE))
        } else {
          // Don't start polling on app load - only after KYC completion
          yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.PENDING))
        }
      } else {
        // Set KYC verification status to SUCCESS when kyc_status is APPROVED
        yield* put(directVaultCreatorActions.setKYCVerificationStatus(KYCVerificationStatus.SUCCESS))
        
        const updatedBankingInfoList = bankingInfoList.map((i) => ({
          ...i,
          hasLiquidationAddresses: liquidationAddressesList.some((liquidationAddress) => liquidationAddress.external_account_id === i.id),
        }))

        if (bankingInfoList) {
          yield* put(directVaultCreatorActions.setUserBankingAccounts(updatedBankingInfoList))
        }
        yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.BANK_ACCOUNT))
      }
    }

    yield* put(directVaultCreatorActions.setInitializedCurrentCreationStage())
  } catch (error) {
    console.error(error)
  }
}
