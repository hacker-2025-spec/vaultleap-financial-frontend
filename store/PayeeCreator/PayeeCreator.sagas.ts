import {
    AccountType,
    BankAccountType,
    CreateLiquidationAddressModalFormFields,
} from '@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal.types'
import { DIRECT_VAULT_FEE_PERCENT_NORMAL, DIRECT_VAULT_FEE_PERCENT_PREMIUM } from '@/config/config'
import { userSelectors } from '@/store/user/user.selectors'
import { authorizedApiCall } from '@/utils/httpClient'
import { CreateUsExternalAccountDTO } from '@klydo-io/getrewards-backend-api'
import { CreateIbanExternalAccountDTO } from '@klydo-io/getrewards-backend-api/dist/models/CreateIbanExternalAccountDTO'
import { DirectVaultsService } from '@klydo-io/getrewards-backend-api/dist/services/DirectVaultsService'
import { put, select, takeLatest } from 'typed-redux-saga'
import { selectData } from './PayeeCreator.selectors'
import {
    CREATE_LIQUIDATION_ADDRESS_FAILURE,
    CREATE_LIQUIDATION_ADDRESS_REQUEST,
    CREATE_LIQUIDATION_ADDRESS_SUCCESS,
} from './PayeeCreator.types'

function* createLiquidationAddressSaga() {
  try {
    const customer = yield* select(userSelectors.selectDirectVaultCustomer)
    const isPremium = yield* select(userSelectors.selectIsPremiumAccount)
  
    if (!customer) {
      throw new Error('Customer info does not exist in store')
    }

    const data: CreateLiquidationAddressModalFormFields = yield select(selectData)

    const bankingInfo = ((isIndividual) => data.type === BankAccountType.IBAN
        ? {
            iban: {
              account_number: data.iban!,
              bic: data.bankId,
              country: data.bankCountry,
            },
            account_type: CreateIbanExternalAccountDTO.account_type.IBAN,
            account_owner_name: data.accountOwnerName,
            currency: CreateIbanExternalAccountDTO.currency.EUR,
            account_owner_type: isIndividual
              ? CreateIbanExternalAccountDTO.account_owner_type.INDIVIDUAL
              : CreateIbanExternalAccountDTO.account_owner_type.BUSINESS,
            first_name: isIndividual ? data.holderFirstName! : undefined,
            last_name: isIndividual ? data.holderLastName! : undefined,
            business_name: !isIndividual ? data.businessName! : undefined,
            bank_name: data.bankName,
            address: {
              street_line_1: data.addressLine1,
              street_line_2: data.addressLine2,
              city: data.city,
              state: data.state || '',
              country: data.country!,
              postal_code: data.zip,
            },
          }
        : {
            account: {
              account_number: data.accountNumber!,
              routing_number: data.routingNumber!,
            },
            currency: CreateUsExternalAccountDTO.currency.USD,
            account_owner_name: data.accountOwnerName,
            bank_name: data.bankName,
            address: {
              street_line_1: data.addressLine1,
              street_line_2: data.addressLine2,
              city: data.city,
              country: 'USA',
              state: data.state || '',
              postal_code: data.zip,
            },
        }
    )(data.accountType === AccountType.INDIVIDUAL)

    const bankingInfoResponse = yield* authorizedApiCall(DirectVaultsService.createBankingInfo, {
      bridgeCustomerId: customer.bridgeCustomerId,
      bankingInfo: bankingInfo,
    })

    const feePercentage = isPremium ? DIRECT_VAULT_FEE_PERCENT_PREMIUM : DIRECT_VAULT_FEE_PERCENT_NORMAL

    yield* authorizedApiCall(DirectVaultsService.createLiquidationAddress, {
      percentage: feePercentage.toString(),
      vaultName: data.payeeName,
      bridgeExternalAccountId: bankingInfoResponse.id,
    })

    yield put({ type: CREATE_LIQUIDATION_ADDRESS_SUCCESS })
  } catch (error) {
    yield put({
      type: CREATE_LIQUIDATION_ADDRESS_FAILURE,
      error: error instanceof Error ? error : new Error('Failed to create liquidation address')
    })
  }
}

export default function* PayeeCreatorSaga() {
  yield takeLatest(CREATE_LIQUIDATION_ADDRESS_REQUEST, createLiquidationAddressSaga)
}
