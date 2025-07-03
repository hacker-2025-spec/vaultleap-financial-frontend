import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User as Auth0User } from '@auth0/auth0-spa-js'

import {
  TaxFormType,
  UserResponseDTO,
  TaxFormVaultInfoDto,
  UpdateUserDetailsDTO,
  SumSubTokenResponseDTO,
  LiquidationAddressEntity,
  VirtualAccountEntity,
  PersonaInquiryIdResponseDTO,
} from '@klydo-io/getrewards-backend-api'

import { StoreKeys } from '../store.keys'
import { type ActionsType, RequestStatus } from '../store.types'
import {
  VaultType,
  ApplicantData,
  W9FormDetails,
  VaultUserRole,
  W8BenFormDetails,
  W8BenEFormDetails,
  UserVaultDto,
  PersonaApplicantData,
} from './user.types'
import { UserState } from './user.state'
import { LiquidationAddressDetails } from './sagas/fetchUserLiquidationAddress/fetchUserLiquidationAddress.saga'
import { VirtualAccountDetails } from './sagas/fetchUserVirtualAccount/fetchUserVirtualAccount.saga'

export const initialUserSliceState: UserState = {
  ...new UserState(),
}

export const userSlice = createSlice({
  reducers: {
    fetchUserDataSuccess: (state, action: PayloadAction<UserResponseDTO>) => {
      state.fetchUserDataStatus = RequestStatus.Succeeded
      state.backendData = action.payload
    },
    updateUserData: (state, action: PayloadAction<UserResponseDTO>) => {
      state.backendData = action.payload
    },
    fetchUserDataFailed: (state) => {
      state.fetchUserDataStatus = RequestStatus.Failed
    },
    fetchUserData: (state) => {
      state.fetchUserDataStatus = RequestStatus.Loading
    },
    fetchUserDataPrivy: (state) => {
      state.fetchUserDataPrivyStatus = RequestStatus.Loading
    },
    fetchUserDataPrivySuccess: (state, action: PayloadAction<UserResponseDTO>) => {
      state.fetchUserDataStatus = RequestStatus.Succeeded
      state.backendDataPrivy = action.payload
    },
    fetchUserDataPrivyFailed: (state) => {
      state.fetchUserDataStatus = RequestStatus.Failed
    },
    loadAuth0User: (state, action: PayloadAction<Auth0User>) => {
      state.auth0Data = action.payload
    },
    fetchSumSubData: (state) => {
      state.fetchSumSubDataStatus = RequestStatus.Loading
    },
    fetchPersonaData: (state) => {
      state.fetchPersonaDataStatus = RequestStatus.Loading
    },
    fetchSumSubDataSuccess: (state, action: PayloadAction<SumSubTokenResponseDTO>) => {
      state.fetchSumSubDataStatus = RequestStatus.Succeeded
      state.sumSubData = action.payload
    },
    fetchPersonaDataSuccess: (state, action: PayloadAction<PersonaInquiryIdResponseDTO>) => {
      state.fetchPersonaDataStatus = RequestStatus.Succeeded
      state.personaData = action.payload
    },
    fetchSumSubDataFailure: (state) => {
      state.fetchSumSubDataStatus = RequestStatus.Failed
      state.sumSubData = { token: '', userId: '' }
    },
    fetchPersonaDataFailure: (state) => {
      state.fetchPersonaDataStatus = RequestStatus.Failed
      state.personaData = { inquiryId: '' }
    },
    sendUserData: (state, __: PayloadAction<UpdateUserDetailsDTO>) => {
      state.sendUserDataStatus = RequestStatus.Loading
    },
    sendUserDataSuccess: (state, action: PayloadAction<UserResponseDTO>) => {
      state.sendUserDataStatus = RequestStatus.Succeeded

      // Preserve bridgeKyc data if it's missing in the response
      if (state.backendData?.bridgeKyc && !action.payload.bridgeKyc) {
        action.payload.bridgeKyc = state.backendData.bridgeKyc
      }

      state.backendData = action.payload
    },
    fetchUserTaxForms: (state) => {
      state.fetchUserTaxFormsStatus = RequestStatus.Loading
    },
    fetchUserTaxFormsSuccess: (state, action: PayloadAction<TaxFormVaultInfoDto[]>) => {
      state.fetchUserTaxFormsStatus = RequestStatus.Succeeded
      state.taxForms = action.payload
    },
    fetchUserTaxFormsFailed: (state) => {
      state.fetchUserTaxFormsStatus = RequestStatus.Failed
    },
    setApplicantData: (state, action: PayloadAction<ApplicantData>) => {
      state.applicantData = { ...state.applicantData, ...action.payload }
    },
    setPersonaApplicantData: (state, action: PayloadAction<PersonaApplicantData>) => {
      state.personaApplicationData = { ...state.personaApplicationData, ...action.payload }
    },
    resetApplicantData: (state) => {
      state.applicantData = {}
    },
    setUserInfoW9: (state, action: PayloadAction<W9FormDetails>) => {
      state.userInfo.w9FormDetails = { ...state.userInfo.w9FormDetails, ...action.payload }
    },
    setUserInfoW8Ben: (state, action: PayloadAction<W8BenFormDetails>) => {
      state.userInfo.w8BenFormDetails = { ...state.userInfo.w8BenFormDetails, ...action.payload }
    },
    setUserInfoW8BenE: (state, action: PayloadAction<W8BenEFormDetails>) => {
      state.userInfo.w8BenEFormDetails = { ...state.userInfo.w8BenEFormDetails, ...action.payload }
    },
    sendUserInfo: (state, _action: PayloadAction<{ formType: TaxFormType; email: string; vaultId: string; tokenAddress: string }>) => {
      state.sendUserInfoStatus = RequestStatus.Loading
    },
    sendUserInfoSuccess: (state) => {
      state.sendUserInfoStatus = RequestStatus.Succeeded
      state.userInfo = {
        t1099FormDetails: {},
        w9FormDetails: {},
        w8BenFormDetails: {},
        w8BenEFormDetails: {},
      }
    },
    sendUserInfoFailed: (state) => {
      state.sendUserInfoStatus = RequestStatus.Failed
    },
    resetUserInfo: (state) => {
      state.userInfo = {
        t1099FormDetails: {},
        w9FormDetails: {},
        w8BenFormDetails: {},
        w8BenEFormDetails: {},
      }
    },
    fetchUserVaults: (state) => {
      state.fetchUserVaultsStatus = RequestStatus.Loading
      state.fetchUserVaultStatus = RequestStatus.Loading
      state.vaults = []
    },
    fetchUserVaultsNew: (state, action: PayloadAction<{ reset?: boolean } | undefined>) => {
      if (action.payload?.reset) {
        state.userVaults = []
      }
      state.userVaultsStatus = RequestStatus.Loading
    },
    fetchUserVaultsSuccess: (state, action: PayloadAction<UserVaultDto[]>) => {
      state.userVaults = action.payload
      state.userVaultsStatus = RequestStatus.Succeeded
    },
    fetchUserVaultsFailure: (state) => {
      state.userVaultsStatus = RequestStatus.Failed
    },
    setUserVaults: (state, action: PayloadAction<UserVaultDto[]>) => {
      state.vaults = action.payload
    },
    setUserLiquidationAddresses: (state, action: PayloadAction<LiquidationAddressEntity[]>) => {
      state.liquidationAddresses = action.payload
    },
    setUserVirtualAccounts: (state, action: PayloadAction<VirtualAccountEntity[]>) => {
      state.virtualAccounts = action.payload
    },
    setFetchUserVaultsSuccess: (state) => {
      state.fetchUserVaultsStatus = RequestStatus.Succeeded
    },
    fetchUserVaultsFailed: (state) => {
      state.fetchUserVaultsStatus = RequestStatus.Failed
      state.fetchUserVaultStatus = RequestStatus.Failed
    },
    fetchUserLiquidationAddress: (state, _action: PayloadAction<{ id: string; bankingInfoId: string }>) => {
      state.fetchUserVaultStatus = RequestStatus.Loading
      state.userLiquidationAddress = null
      state.userVirtualAccount = null
      state.userVault = {
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }
    },
    fetchUserVirtualAccount: (state, _action: PayloadAction<{ id: string; customerId: string }>) => {
      state.fetchUserVaultStatus = RequestStatus.Loading
      state.userLiquidationAddress = null
      state.userVirtualAccount = null
      state.userVault = {
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }
    },
    fetchUserLiquidationAddressSuccess: (state, action: PayloadAction<LiquidationAddressDetails>) => {
      state.fetchUserVaultStatus = RequestStatus.Succeeded
      state.userLiquidationAddress = action.payload
    },
    fetchUserVirtualAccountSuccess: (state, action: PayloadAction<VirtualAccountDetails>) => {
      state.fetchUserVaultStatus = RequestStatus.Succeeded
      state.userVirtualAccount = action.payload
    },
    fetchUserVault: (state, _action: PayloadAction<{ id: string; role: VaultUserRole }>) => {
      state.fetchUserVaultStatus = RequestStatus.Loading
      state.userLiquidationAddress = null
      state.userVault = {
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }
    },
    fetchUserVaultSuccess: (state, action: PayloadAction<VaultType>) => {
      state.fetchUserVaultStatus = RequestStatus.Succeeded
      state.userVault = action.payload
    },
    fetchUserVaultFailed: (state) => {
      state.fetchUserVaultStatus = RequestStatus.Failed
      state.userVault = {
        projectName: '',
        ownerEmail: '',
        ownerName: '',
        adminWalletAddress: '',
        roles: [],
        userId: '',
        vaultFeePercentage: 0,
        id: '',
        shareholderManagerAddress: '',
        watching: true,
        vaultFundsStatistics: [],
      }
    },
    unwatchUserVault: (state, _action: PayloadAction<{ id: string; role: VaultUserRole }>) => {
      state.fetchUserVaultStatus = RequestStatus.Loading
      state.fetchUserVaultsStatus = RequestStatus.Loading
      state.vaults = []
    },
    watchAllUserVaults: (state) => {
      state.watchAllUserVaultsStatus = RequestStatus.Loading
    },
    watchAllUserVaultsSuccess: (state) => {
      state.watchAllUserVaultsStatus = RequestStatus.Succeeded
    },
    watchAllUserVaultsFailed: (state) => {
      state.watchAllUserVaultsStatus = RequestStatus.Failed
    },
    requestAccessTaxDocument: (state, action: PayloadAction<string>) => {
      state.taxFormId = action.payload
      state.requestAccessStatus = RequestStatus.Loading
      state.downloadModalOpen = true
      state.downloadDocumentStatus = RequestStatus.Idle
    },
    requestAccessTaxDocumentSuccess: (state) => {
      state.requestAccessStatus = RequestStatus.Succeeded
    },
    requestAccessTaxDocumentFailed: (state) => {
      state.taxFormId = ''
      state.requestAccessStatus = RequestStatus.Failed
    },
    toggleShowConfetti: (state) => {
      state.showConfetti = !state.showConfetti
    },
    hideDownloadModalOpen: (state) => {
      state.downloadModalOpen = false
      state.downloadDocumentStatus = RequestStatus.Idle
    },
    downloadTaxDocument: (state, __: PayloadAction<{ taxFormId: string; securityCode: string }>) => {
      state.downloadDocumentStatus = RequestStatus.Loading
    },
    downloadTaxDocumentSuccess: (state) => {
      state.taxFormId = ''
      state.downloadModalOpen = false
      state.downloadDocumentStatus = RequestStatus.Succeeded
    },
    downloadTaxDocumentFailed: (state) => {
      state.downloadDocumentStatus = RequestStatus.Failed
    },
    uploadUserAvatar: (state, __: PayloadAction<{ avatar: string }>) => {
      state.avatarUploadStatus = RequestStatus.Loading
    },
    uploadUserAvatarSuccess: (state, { payload: { userDataResponse } }: PayloadAction<{ userDataResponse: UserResponseDTO }>) => {
      state.backendData = userDataResponse
      state.avatarUploadStatus = RequestStatus.Succeeded
    },
    deleteUserAvatar: () => {},
    deleteUserAvatarSuccess: (state, { payload: { userDataResponse } }: PayloadAction<{ userDataResponse: UserResponseDTO }>) => {
      state.backendData = userDataResponse
    },
  },
  name: StoreKeys.User,
  initialState: initialUserSliceState,
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
export type UserActions = ActionsType<typeof userActions>
