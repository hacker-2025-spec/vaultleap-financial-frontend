// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options, formDataBodySerializer } from '@hey-api/client-axios'
import type {
  UpdateUserDetailsData,
  UpdateUserDetailsResponse,
  UpdatePrivyWalletAddressesData,
  UpdatePrivyWalletAddressesResponse,
  UploadAvatarData,
  UploadAvatarResponse,
  UploadAvatarFileData,
  UploadAvatarFileResponse,
  DeleteAvatarData,
  DeleteAvatarResponse,
  GetMeData,
  GetMeResponse,
  GetAllFormsData,
  GetAllFormsResponse,
  RequestTaxFormAccessData,
  RequestTaxFormAccessResponse,
  AccessTaxFormData,
  AccessTaxFormResponse,
  TaxFormDownloadedData,
  CreateTaxInfoData,
  CreateTaxInfoResponse,
  GetLatestVaultOwnerTaxInfoData,
  GetLatestVaultOwnerTaxInfoResponse,
  ProcessCreatorConfigData,
  ProcessCreatorConfigResponse,
  CreateTransactionData,
  CreateTransactionResponse,
  GetCurrentUserWalletsData,
  GetCurrentUserWalletsResponse,
  CheckWalletData,
  CheckWalletResponse,
  CreateWalletData,
  CreateWalletResponse,
  GetTokenData,
  GetTokenResponse,
  AddApplicantData,
  AddApplicantResponse,
  CreateVaultsData,
  CreateVaultsResponse,
  GetVaultsCreationStatusData,
  GetVaultsCreationStatusResponse,
  GetVaultsInfoData,
  GetVaultsInfoResponse,
  PaymasterData,
  PaymasterResponse,
  CreateFundingNoteData,
  CreateCustomData,
  CreateCustomResponse,
  CreateBankingInfoData,
  CreateBankingInfoResponse,
  CheckKycData,
  CheckKycResponse,
  CreateLiquidationAddressData,
  CreateLiquidationAddressResponse,
  GetLiqAddressDrainHistoryData,
  GetLiqAddressDrainHistoryResponse,
  GetBankingInfoData,
  GetBankingInfoResponse,
  GetBankingInfoByIdData,
  GetBankingInfoByIdResponse,
  GetLiquidationAddressByAuth0IdData,
  GetLiquidationAddressByAuth0IdResponse,
  GetLiquidationAddressByIdData,
  GetLiquidationAddressByIdResponse,
  GetVirtualAccountsByAuth0IdData,
  GetVirtualAccountsByAuth0IdResponse,
  CreateVirtualAccountData,
  CreateVirtualAccountResponse,
  GetUnifiedAccountsData,
  GetUnifiedAccountsResponse,
  CreateUnifiedAccountData,
  CreateUnifiedAccountResponse,
  GetVirtualAccountByIdData,
  GetVirtualAccountByIdResponse,
  UpdateVirtualAccountData,
  UpdateVirtualAccountResponse,
  GetVirtualAccountActvityData,
  GetVirtualAccountActvityResponse,
  GetVirtualAccountActivityPaginatedData,
  GetVirtualAccountActivityPaginatedResponse,
  GetDirectRecipientsData,
  GetDirectRecipientsResponse,
  GetDirectRecipientByIdData,
  GetDirectRecipientByIdResponse,
  GetAllUserVaultsData,
  GetAllUserVaultsResponse,
  GetVaultByIdData,
  GetVaultByIdResponse,
  GetVaultInfoByIdData,
  GetVaultInfoByIdResponse,
  GetVaultInfoByIdAndTokenIdData,
  GetVaultInfoByIdAndTokenIdResponse,
  GetVaultTransactionStatusData,
  GetVaultTransactionStatusResponse,
  GetSelfManagedVaultTransactionStatusData,
  GetSelfManagedVaultTransactionStatusResponse,
  CreateVaultData,
  CreateVaultResponse,
  UpdateRoleEmailData,
  UpdateRoleEmailResponse,
  FinishSelfManagedVaultClaimData,
  FinishSelfManagedVaultClaimResponse,
  UnwatchVaultData,
  UnwatchVaultResponse,
  WatchAllVaultsData,
  WatchAllVaultsResponse,
  GetVaultKeysData,
  GetVaultKeysResponse,
  CreateSelfManagedVaultData,
  CreateSelfManagedVaultResponse,
  SignVaultTransactionData,
  SignVaultTransactionResponse,
  CreateInquiryIdData,
  CreateInquiryIdResponse,
  UpdateApplicantData,
  UpdateApplicantResponse,
  CreateData,
  FindData,
  HandleAlchemyWebhookData,
  FileTicketData,
  GetTransactionItemsData,
  GetTransactionItemsResponse,
  GetTransactionItemByIdData,
  GetTransactionItemByIdResponse,
  GetTransactionItemsByVirtualAccountIdData,
  GetTransactionItemsByVirtualAccountIdResponse,
  TestUpsertData,
  GetForexRatesData,
  GetUserForexRatesData,
  GetUserForexRatesResponse,
  FetchForexRatesData,
  CheckData,
  TestData,
} from './types.gen'
import {
  getCurrentUserWalletsResponseTransformer,
  createWalletResponseTransformer,
  getUnifiedAccountsResponseTransformer,
  getDirectRecipientsResponseTransformer,
  getDirectRecipientByIdResponseTransformer,
  getTransactionItemsResponseTransformer,
  getTransactionItemByIdResponseTransformer,
  getTransactionItemsByVirtualAccountIdResponseTransformer,
} from './transformers.gen'

export const client = createClient(createConfig())

export const updateUserDetails = <ThrowOnError extends boolean = false>(options: Options<UpdateUserDetailsData, ThrowOnError>) => {
  return (options?.client ?? client).post<UpdateUserDetailsResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/users/update-details',
  })
}

export const updatePrivyWalletAddresses = <ThrowOnError extends boolean = false>(
  options: Options<UpdatePrivyWalletAddressesData, ThrowOnError>
) => {
  return (options?.client ?? client).post<UpdatePrivyWalletAddressesResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/users/update-privy-wallets',
  })
}

export const uploadAvatar = <ThrowOnError extends boolean = false>(options: Options<UploadAvatarData, ThrowOnError>) => {
  return (options?.client ?? client).post<UploadAvatarResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/users/me/upload-avatar',
  })
}

export const uploadAvatarFile = <ThrowOnError extends boolean = false>(options: Options<UploadAvatarFileData, ThrowOnError>) => {
  return (options?.client ?? client).post<UploadAvatarFileResponse, unknown, ThrowOnError>({
    ...options,
    ...formDataBodySerializer,
    headers: {
      'Content-Type': null,
      ...options?.headers,
    },
    url: '/users/me/upload-avatar-file',
  })
}

export const deleteAvatar = <ThrowOnError extends boolean = false>(options?: Options<DeleteAvatarData, ThrowOnError>) => {
  return (options?.client ?? client).delete<DeleteAvatarResponse, unknown, ThrowOnError>({
    ...options,
    url: '/users/me/delete-avatar',
  })
}

export const getMe = <ThrowOnError extends boolean = false>(options?: Options<GetMeData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetMeResponse, unknown, ThrowOnError>({
    ...options,
    url: '/users/me',
  })
}

export const getAllForms = <ThrowOnError extends boolean = false>(options?: Options<GetAllFormsData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetAllFormsResponse, unknown, ThrowOnError>({
    ...options,
    url: '/tax-form/tax-forms',
  })
}

export const requestTaxFormAccess = <ThrowOnError extends boolean = false>(options: Options<RequestTaxFormAccessData, ThrowOnError>) => {
  return (options?.client ?? client).post<RequestTaxFormAccessResponse, unknown, ThrowOnError>({
    ...options,
    url: '/tax-form/request/{id}',
  })
}

export const accessTaxForm = <ThrowOnError extends boolean = false>(options: Options<AccessTaxFormData, ThrowOnError>) => {
  return (options?.client ?? client).post<AccessTaxFormResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/tax-form/access/{id}',
  })
}

export const taxFormDownloaded = <ThrowOnError extends boolean = false>(options: Options<TaxFormDownloadedData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/tax-form/downloaded/{id}',
  })
}

export const createTaxInfo = <ThrowOnError extends boolean = false>(options: Options<CreateTaxInfoData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateTaxInfoResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/tax-info/create',
  })
}

export const getLatestVaultOwnerTaxInfo = <ThrowOnError extends boolean = false>(
  options?: Options<GetLatestVaultOwnerTaxInfoData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetLatestVaultOwnerTaxInfoResponse, unknown, ThrowOnError>({
    ...options,
    url: '/tax-info/latest',
  })
}

export const processCreatorConfig = <ThrowOnError extends boolean = false>(options: Options<ProcessCreatorConfigData, ThrowOnError>) => {
  return (options?.client ?? client).post<ProcessCreatorConfigResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/creator-handler/process-vault-creation/{vaultId}',
  })
}

export const createTransaction = <ThrowOnError extends boolean = false>(options: Options<CreateTransactionData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateTransactionResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/evm-transaction-sender',
  })
}

export const getCurrentUserWallets = <ThrowOnError extends boolean = false>(options?: Options<GetCurrentUserWalletsData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetCurrentUserWalletsResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getCurrentUserWalletsResponseTransformer,
    url: '/wallet/current-user-wallets',
  })
}

export const checkWallet = <ThrowOnError extends boolean = false>(options: Options<CheckWalletData, ThrowOnError>) => {
  return (options?.client ?? client).post<CheckWalletResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/wallet/check-wallet',
  })
}

export const createWallet = <ThrowOnError extends boolean = false>(options: Options<CreateWalletData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateWalletResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    responseTransformer: createWalletResponseTransformer,
    url: '/wallet/create-wallet',
  })
}

export const getToken = <ThrowOnError extends boolean = false>(options?: Options<GetTokenData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetTokenResponse, unknown, ThrowOnError>({
    ...options,
    url: '/sum-sub/token',
  })
}

export const addApplicant = <ThrowOnError extends boolean = false>(options: Options<AddApplicantData, ThrowOnError>) => {
  return (options?.client ?? client).post<AddApplicantResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/sum-sub/add',
  })
}

export const createVaults = <ThrowOnError extends boolean = false>(options: Options<CreateVaultsData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateVaultsResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/vaults-creator/create',
  })
}

export const getVaultsCreationStatus = <ThrowOnError extends boolean = false>(
  options: Options<GetVaultsCreationStatusData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetVaultsCreationStatusResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vaults-creator/{id}/status',
  })
}

export const getVaultsInfo = <ThrowOnError extends boolean = false>(options: Options<GetVaultsInfoData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetVaultsInfoResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vaults-creator/{id}/info',
  })
}

export const paymaster = <ThrowOnError extends boolean = false>(options: Options<PaymasterData, ThrowOnError>) => {
  return (options?.client ?? client).post<PaymasterResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/paymaster',
  })
}

export const createFundingNote = <ThrowOnError extends boolean = false>(options: Options<CreateFundingNoteData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/notes',
  })
}

export const createCustom = <ThrowOnError extends boolean = false>(options: Options<CreateCustomData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateCustomResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/direct-vaults/create-customer',
  })
}

export const createBankingInfo = <ThrowOnError extends boolean = false>(options: Options<CreateBankingInfoData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateBankingInfoResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/direct-vaults/create-bankin-info',
  })
}

export const checkKyc = <ThrowOnError extends boolean = false>(options: Options<CheckKycData, ThrowOnError>) => {
  return (options?.client ?? client).post<CheckKycResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/direct-vaults/check-kyc-status',
  })
}

export const createLiquidationAddress = <ThrowOnError extends boolean = false>(
  options: Options<CreateLiquidationAddressData, ThrowOnError>
) => {
  return (options?.client ?? client).post<CreateLiquidationAddressResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/direct-vaults/create-liquidation-address',
  })
}

export const getLiqAddressDrainHistory = <ThrowOnError extends boolean = false>(
  options: Options<GetLiqAddressDrainHistoryData, ThrowOnError>
) => {
  return (options?.client ?? client).post<GetLiqAddressDrainHistoryResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/direct-vaults/get-liquidation-address-drain-history',
  })
}

export const getBankingInfo = <ThrowOnError extends boolean = false>(options?: Options<GetBankingInfoData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetBankingInfoResponse, unknown, ThrowOnError>({
    ...options,
    url: '/banking-info',
  })
}

export const getBankingInfoById = <ThrowOnError extends boolean = false>(options: Options<GetBankingInfoByIdData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetBankingInfoByIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/banking-info/{id}',
  })
}

export const getLiquidationAddressByAuth0Id = <ThrowOnError extends boolean = false>(
  options?: Options<GetLiquidationAddressByAuth0IdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetLiquidationAddressByAuth0IdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/liquidation-addresses',
  })
}

export const getLiquidationAddressById = <ThrowOnError extends boolean = false>(
  options: Options<GetLiquidationAddressByIdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetLiquidationAddressByIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/liquidation-addresses/{id}',
  })
}

export const getVirtualAccountsByAuth0Id = <ThrowOnError extends boolean = false>(
  options?: Options<GetVirtualAccountsByAuth0IdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetVirtualAccountsByAuth0IdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/virtual-accounts',
  })
}

export const createVirtualAccount = <ThrowOnError extends boolean = false>(options: Options<CreateVirtualAccountData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateVirtualAccountResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/virtual-accounts',
  })
}

export const getUnifiedAccounts = <ThrowOnError extends boolean = false>(options?: Options<GetUnifiedAccountsData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetUnifiedAccountsResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getUnifiedAccountsResponseTransformer,
    url: '/virtual-accounts/unified',
  })
}

export const createUnifiedAccount = <ThrowOnError extends boolean = false>(options: Options<CreateUnifiedAccountData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateUnifiedAccountResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/virtual-accounts/unified',
  })
}

export const getVirtualAccountById = <ThrowOnError extends boolean = false>(options: Options<GetVirtualAccountByIdData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetVirtualAccountByIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/virtual-accounts/{id}',
  })
}

export const updateVirtualAccount = <ThrowOnError extends boolean = false>(options: Options<UpdateVirtualAccountData, ThrowOnError>) => {
  return (options?.client ?? client).post<UpdateVirtualAccountResponse, unknown, ThrowOnError>({
    ...options,
    url: '/virtual-accounts/{id}',
  })
}

export const getVirtualAccountActvity = <ThrowOnError extends boolean = false>(
  options: Options<GetVirtualAccountActvityData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetVirtualAccountActvityResponse, unknown, ThrowOnError>({
    ...options,
    url: '/virtual-accounts/{virtualAccountId}/activity/all',
  })
}

export const getVirtualAccountActivityPaginated = <ThrowOnError extends boolean = false>(
  options: Options<GetVirtualAccountActivityPaginatedData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetVirtualAccountActivityPaginatedResponse, unknown, ThrowOnError>({
    ...options,
    url: '/virtual-accounts/{virtualAccountId}/activity',
  })
}

export const getDirectRecipients = <ThrowOnError extends boolean = false>(options?: Options<GetDirectRecipientsData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetDirectRecipientsResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getDirectRecipientsResponseTransformer,
    url: '/virtual-accounts/direct-recipients',
  })
}

export const getDirectRecipientById = <ThrowOnError extends boolean = false>(
  options: Options<GetDirectRecipientByIdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetDirectRecipientByIdResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getDirectRecipientByIdResponseTransformer,
    url: '/virtual-accounts/direct-recipients/{id}',
  })
}

export const getAllUserVaults = <ThrowOnError extends boolean = false>(options?: Options<GetAllUserVaultsData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetAllUserVaultsResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/vaults',
  })
}

export const getVaultById = <ThrowOnError extends boolean = false>(options: Options<GetVaultByIdData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetVaultByIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/{id}',
  })
}

export const getVaultInfoById = <ThrowOnError extends boolean = false>(options: Options<GetVaultInfoByIdData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetVaultInfoByIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/{id}/info',
  })
}

export const getVaultInfoByIdAndTokenId = <ThrowOnError extends boolean = false>(
  options: Options<GetVaultInfoByIdAndTokenIdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetVaultInfoByIdAndTokenIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/{id}/info-by-token-id',
  })
}

export const getVaultTransactionStatus = <ThrowOnError extends boolean = false>(
  options: Options<GetVaultTransactionStatusData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetVaultTransactionStatusResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/{id}/status',
  })
}

export const getSelfManagedVaultTransactionStatus = <ThrowOnError extends boolean = false>(
  options: Options<GetSelfManagedVaultTransactionStatusData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetSelfManagedVaultTransactionStatusResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/{id}/self-managed-status',
  })
}

export const createVault = <ThrowOnError extends boolean = false>(options: Options<CreateVaultData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateVaultResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/vault',
  })
}

export const updateRoleEmail = <ThrowOnError extends boolean = false>(options: Options<UpdateRoleEmailData, ThrowOnError>) => {
  return (options?.client ?? client).post<UpdateRoleEmailResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/vault/{id}/update-role-email',
  })
}

export const finishSelfManagedVaultClaim = <ThrowOnError extends boolean = false>(
  options: Options<FinishSelfManagedVaultClaimData, ThrowOnError>
) => {
  return (options?.client ?? client).post<FinishSelfManagedVaultClaimResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/vault/{id}/finish-self-managed-vault-claim',
  })
}

export const unwatchVault = <ThrowOnError extends boolean = false>(options: Options<UnwatchVaultData, ThrowOnError>) => {
  return (options?.client ?? client).post<UnwatchVaultResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/{id}/unwatch',
  })
}

export const watchAllVaults = <ThrowOnError extends boolean = false>(options?: Options<WatchAllVaultsData, ThrowOnError>) => {
  return (options?.client ?? client).post<WatchAllVaultsResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/watch-all',
  })
}

export const getVaultKeys = <ThrowOnError extends boolean = false>(options: Options<GetVaultKeysData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetVaultKeysResponse, unknown, ThrowOnError>({
    ...options,
    url: '/vault/keys/{walletAddress}',
  })
}

export const createSelfManagedVault = <ThrowOnError extends boolean = false>(
  options: Options<CreateSelfManagedVaultData, ThrowOnError>
) => {
  return (options?.client ?? client).post<CreateSelfManagedVaultResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/vault/create-self-managed',
  })
}

export const signVaultTransaction = <ThrowOnError extends boolean = false>(options: Options<SignVaultTransactionData, ThrowOnError>) => {
  return (options?.client ?? client).post<SignVaultTransactionResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/vault/sign-vault-transaction',
  })
}

export const createInquiryId = <ThrowOnError extends boolean = false>(options?: Options<CreateInquiryIdData, ThrowOnError>) => {
  return (options?.client ?? client).post<CreateInquiryIdResponse, unknown, ThrowOnError>({
    ...options,
    url: '/persona/create-inquiry-id',
  })
}

export const updateApplicant = <ThrowOnError extends boolean = false>(options: Options<UpdateApplicantData, ThrowOnError>) => {
  return (options?.client ?? client).patch<UpdateApplicantResponse, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/persona/update-applicant',
  })
}

export const create = <ThrowOnError extends boolean = false>(options: Options<CreateData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/address-activity',
  })
}

export const find = <ThrowOnError extends boolean = false>(options: Options<FindData, ThrowOnError>) => {
  return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/address-activity/{address}',
  })
}

export const handleAlchemyWebhook = <ThrowOnError extends boolean = false>(options: Options<HandleAlchemyWebhookData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/webhook/alchemy',
  })
}

export const fileTicket = <ThrowOnError extends boolean = false>(options: Options<FileTicketData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    url: '/support-tickets',
  })
}

export const getTransactionItems = <ThrowOnError extends boolean = false>(options?: Options<GetTransactionItemsData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetTransactionItemsResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getTransactionItemsResponseTransformer,
    url: '/transaction-items',
  })
}

export const getTransactionItemById = <ThrowOnError extends boolean = false>(
  options: Options<GetTransactionItemByIdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetTransactionItemByIdResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getTransactionItemByIdResponseTransformer,
    url: '/transaction-items/{id}',
  })
}

export const getTransactionItemsByVirtualAccountId = <ThrowOnError extends boolean = false>(
  options: Options<GetTransactionItemsByVirtualAccountIdData, ThrowOnError>
) => {
  return (options?.client ?? client).get<GetTransactionItemsByVirtualAccountIdResponse, unknown, ThrowOnError>({
    ...options,
    responseTransformer: getTransactionItemsByVirtualAccountIdResponseTransformer,
    url: '/transaction-items/virtual-account/{virtualAccountId}',
  })
}

export const testUpsert = <ThrowOnError extends boolean = false>(options?: Options<TestUpsertData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/transaction-items/test',
  })
}

/**
 * Get current forex rates from cache
 */
export const getForexRates = <ThrowOnError extends boolean = false>(options?: Options<GetForexRatesData, ThrowOnError>) => {
  return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/forex/rates',
  })
}

/**
 * Get current forex rates for authenticated users (USD and EUR)
 */
export const getUserForexRates = <ThrowOnError extends boolean = false>(options?: Options<GetUserForexRatesData, ThrowOnError>) => {
  return (options?.client ?? client).get<GetUserForexRatesResponse, unknown, ThrowOnError>({
    ...options,
    url: '/forex/user/rates',
  })
}

/**
 * Manually fetch and update forex rates
 */
export const fetchForexRates = <ThrowOnError extends boolean = false>(options?: Options<FetchForexRatesData, ThrowOnError>) => {
  return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/forex/fetch',
  })
}

export const check = <ThrowOnError extends boolean = false>(options?: Options<CheckData, ThrowOnError>) => {
  return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/',
  })
}

export const test = <ThrowOnError extends boolean = false>(options?: Options<TestData, ThrowOnError>) => {
  return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
    ...options,
    url: '/test',
  })
}
