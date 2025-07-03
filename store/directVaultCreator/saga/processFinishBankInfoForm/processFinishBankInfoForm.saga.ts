import { put, select } from 'typed-redux-saga'
import { DirectVaultCreatorActions, directVaultCreatorActions } from '../../directVaultCreator.slice'
import { BankAccountType, DirectVaultCreatorStages, IbanAccountOwnerType } from '../../directVaultCreator.types'
import { authorizedApiCall } from '@/utils/httpClient'
import {
  CreateBankingInfoDto,
  CreateIbanExternalAccountDTO,
  CreateUsExternalAccountDTO,
  DirectVaultsService,
} from '@klydo-io/getrewards-backend-api'
import { directVaultCreatorSelectors } from '../../directVaultCreator.selectors'

export function* processFinishBankInfoForm({ payload }: DirectVaultCreatorActions['createBankingInfo']) {
  try {
    yield* put(directVaultCreatorActions.setNextStepLoading())

    const customer = yield* select(directVaultCreatorSelectors.selectCustomerInfo)

    if (!customer) {
      throw new Error('Customer info does not exist in store')
    }

    const bankingInfo: CreateBankingInfoDto['bankingInfo'] = (() => {
      if (payload.type === BankAccountType.IBAN) {
        const isAccountOwnerIndividual = payload.ibanAccountOwnerType === IbanAccountOwnerType.INDIVIDUAL
        return {
          iban: {
            account_number: payload.iban!,
            bic: payload.ibanBankIdentifierCode!,
            country: payload.ibanCountryCode!,
          },
          account_type: CreateIbanExternalAccountDTO.account_type.IBAN,
          account_owner_name: payload.accountOwnerName,
          currency: CreateIbanExternalAccountDTO.currency.EUR,
          account_owner_type: isAccountOwnerIndividual
            ? CreateIbanExternalAccountDTO.account_owner_type.INDIVIDUAL
            : CreateIbanExternalAccountDTO.account_owner_type.BUSINESS,

          first_name: isAccountOwnerIndividual ? payload.ibanHolderFirstName! : undefined,
          last_name: isAccountOwnerIndividual ? payload.ibanHolderLastName! : undefined,
          business_name: !isAccountOwnerIndividual ? payload.ibanBusinessName! : undefined,

          bank_name: payload.bankName,

          address: {
            street_line_1: payload.addressLine1,
            street_line_2: payload.addressLine2,
            city: payload.city,
            state: payload.state || '',
            country: payload.countryCode!,
            postal_code: payload.zip,
          },
        }
      }

      return {
        account: {
          account_number: payload.usAccountNumber!,
          routing_number: payload.usRoutingNumber!,
        },
        currency: CreateUsExternalAccountDTO.currency.USD,
        account_owner_name: payload.accountOwnerName,
        bank_name: payload.bankName,

        address: {
          street_line_1: payload.addressLine1,
          street_line_2: payload.addressLine2,
          city: payload.city,
          country: 'USA',
          state: payload.state || '',
          postal_code: payload.zip,
        },
      }
    })()

    const bankingInfoEntity = yield* authorizedApiCall(DirectVaultsService.createBankingInfo, {
      bridgeCustomerId: customer.customerId,
      bankingInfo: bankingInfo,
    })

    yield* put(directVaultCreatorActions.selectBankinInfo({ 
      ...bankingInfoEntity, 
      hasLiquidationAddresses: false,
      destinationPaymentRail: payload.type === BankAccountType.US_ACCOUNT ? payload.destinationPaymentRail : undefined
    }))

    yield* put(directVaultCreatorActions.setCurrentStage(DirectVaultCreatorStages.LIQUIDATION_ADDRESS))
  } catch (error) {
    console.error(error)
  } finally {
    yield* put(directVaultCreatorActions.clearNextStepLoading())
  }
}
