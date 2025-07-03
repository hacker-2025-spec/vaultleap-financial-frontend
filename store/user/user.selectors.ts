import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { RequestStatus } from '../store.types'
import { selectReducer } from '../store.utils'

const selectState = createSelector([selectReducer(StoreKeys.User)], (state) => state)

const selectAuth0Data = createSelector([selectState], (state) => state.auth0Data)
const selectBackendData = createSelector([selectState], (state) => state.backendData)

const selectFetchUserDataStatus = createSelector([selectState], (state) => state.fetchUserDataStatus)
const selectSendUserDataStatus = createSelector([selectState], (state) => state.sendUserDataStatus)
const selectIsSendUserDataReady = createSelector([selectState], (state) => state.sendUserDataStatus === RequestStatus.Succeeded)

const selectUserEmail = createSelector([selectState], (state) => state.backendData?.email)
const selectUserEmailTruncated = createSelector([selectState], (state) => {
  if (state.backendData?.email) {
    const emailEls = state.backendData?.email.split('@')
    const firstEl = emailEls[0]

    return `${firstEl.slice(0, 1)}***${firstEl.slice(-1)}@${emailEls[1]}`
  } else return ''
})

const selectUserId = createSelector([selectState], (state) => {
  if (state.backendData?.auth0Id) {
    return state.backendData.auth0Id
  } else if (state.auth0Data?.sub) {
    return state.auth0Data.sub
  }

  return 'Not found'
})

const selectIsUsingGoogle = createSelector([selectState], (state) => {
  if (state.backendData?.auth0Id) {
    return state.backendData.auth0Id.includes('google')
  } else if (state.auth0Data?.sub) {
    return state.auth0Data.sub.includes('google')
  }

  return false
})

const selectIsSumSubDataReady = createSelector([selectState], (state) => state.fetchSumSubDataStatus === RequestStatus.Succeeded)
const selectSumSubData = createSelector([selectState], (state) => state.sumSubData)

const selectUserName = createSelector([selectState], (state) => state.backendData?.name)

const selectIsPremiumAccount = createSelector([selectAuth0Data], (_auth0Data) => {
  // if (auth0Data) {
  //   return auth0Data.roles_list?.findIndex((role: string) => role === 'Premium') >= 0
  // }
  return true
})

const selectUserTaxForms = createSelector([selectState], (state) => state.taxForms)
const selectUserTaxFormsStatus = createSelector([selectState], (state) => state.fetchUserTaxFormsStatus)

const selectApplicantData = createSelector([selectState], (state) => state.applicantData)

const selectUserInfo = createSelector([selectState], (state) => state.userInfo)
const selectUserInfoW9 = createSelector([selectState], (state) => state.userInfo.w9FormDetails)
const selectUserInfoW8Ben = createSelector([selectState], (state) => state.userInfo.w8BenFormDetails)
const selectUserInfoW8BenE = createSelector([selectState], (state) => state.userInfo.w8BenEFormDetails)
const selectFormattedUserInfoW9 = createSelector([selectState], (state) => {
  const info = state.userInfo.w9FormDetails
  return {
    fullName: info.fullName!,
    businessName: info.businessName,
    fedTaxClassification: info.fedTaxClassification!,
    llcClassification: info.llcClassification,
    otherClassification: info.otherClassification,
    payeeCode: info.payeeCode,
    exemptionCode: info.exemptionCode,
    address: info.address2 ? `${info.address} ${info.address2}` : info.address || '',
    city: info.city!,
    state: info.state!,
    country: info.country!,
    zip: info.zip!,
    ssn: info.ssn,
    ein: info.ein,
    readAndUnderstand: info.iReadAndUnderstand!,
    signature: info.signature!,
    date: info.date!,
    consent: info.iConsent!,
  }
})
const selectFormattedUserInfoW8Ben = createSelector([selectState], (state) => {
  const info = state.userInfo.w8BenFormDetails
  return {
    ownerName: info.ownerName!,
    citizenshipCountry: info.citizenshipCountry!,
    address: info.address!,
    city: info.city!,
    country: info.country!,
    mailingAddress: info.mailingAddress,
    mailingCity: info.mailingCity,
    mailingCountry: info.mailingCountry,
    usTaxId: info.usTaxId,
    foreignTaxId: info.foreignTaxId,
    ftinNotRequired: info.ftinNotRequired!,
    referenceNumbers: info.referenceNumbers,
    dateOfBirth: info.dateOfBirth!,
    countryOfTaxTreaty: info.countryOfTaxTreaty,
    treatyArticle: info.treatyArticle,
    paragraph: info.paragraph,
    withholdingRate: info.withholdingRate,
    typeOfIncome: info.typeOfIncome,
    additionalConditions: info.additionalConditions,
    certify: info.iCertify!,
    readAndUnderstand: info.iReadAndUnderstand!,
    signature: info.signature!,
    signerName: info.signerName!,
    date: info.date!,
    consent: info.iConsent!,
  }
})
const selectFormattedUserInfoW8BenE = createSelector([selectState], (state) => {
  const info = state.userInfo.w8BenEFormDetails
  return {
    organizationName: info.organizationName!,
    countryOfIncorporation: info.countryOfIncorporation!,
    disregardedEntityName: info.disregardedEntityName,
    status: info.status!,
    isTreatyClaim: info.isTreatyClaim,
    fatcaStatus: info.fatcaStatus!,
    permanentResidenceAddress: info.permanentResidenceAddress!,
    permanentResidenceCity: info.permanentResidenceCity!,
    permanentResidenceCountry: info.permanentResidenceCountry!,
    mailingAddress: info.mailingAddress,
    mailingCity: info.mailingCity,
    mailingCountry: info.mailingCountry,
    usTaxId: info.usTaxId,
    giin: info.giin,
    foreignTaxId: info.foreignTaxId,
    ftinNotRequired: info.ftinNotRequired,
    referenceNumbers: info.referenceNumbers,
    entityFatcaStatus: info.entityFatcaStatus,
    entityAddress: info.entityAddress,
    entityCity: info.entityCity,
    entityCountry: info.entityCountry,
    entityGiin: info.entityGiin,
    certificateTaxTreatyA: info.certificateTaxTreatyA,
    certificateTaxTreatyACountry: info.certificateTaxTreatyACountry,
    certificateTaxTreatyB: info.certificateTaxTreatyB,
    certificateTaxTreatyBBenefit: info.certificateTaxTreatyBBenefit,
    certificateTaxTreatyBOther: info.certificateTaxTreatyBOther,
    certificateTaxTreatyC: info.certificateTaxTreatyC,
    ratesTreatyArticle: info.ratesTreatyArticle,
    ratesParagraph: info.ratesParagraph,
    ratesWithholdingRate: info.ratesWithholdingRate,
    ratesTypeOfIncome: info.ratesTypeOfIncome,
    ratesAdditionalConditions: info.ratesAdditionalConditions,
    sponsoringEntityName: info.sponsoringEntityName,
    sponsoringEntityCertify: info.sponsoringEntityCertify,
    certify18: info.certify18,
    certify19: info.certify19,
    sponsoringEntityNamePartVII: info.sponsoringEntityNamePartVII,
    certify21: info.certify21,
    certify22: info.certify22,
    certify23: info.certify23,
    certify24A: info.certify24A,
    certify24B: info.certify24B,
    certify24C: info.certify24C,
    certify24D: info.certify24D,
    certify25A: info.certify25A,
    certify25B: info.certify25B,
    certify25C: info.certify25C,
    certify26: info.certify26,
    country26: info.country26,
    institutionType26: info.institutionType26,
    model1Iga26: info.model1Iga26,
    model2Iga26: info.model2Iga26,
    trusteeName26: info.trusteeName26,
    trusteeCountry26: info.trusteeCountry26,
    certify27: info.certify27,
    certify28A: info.certify28A,
    certify28B: info.certify28B,
    certify29A: info.certify29A,
    certify29B: info.certify29B,
    certify29C: info.certify29C,
    certify29D: info.certify29D,
    certify29E: info.certify29E,
    certify29F: info.certify29F,
    certify30: info.certify30,
    certify31: info.certify31,
    certify32: info.certify32,
    certify33: info.certify33,
    date33: info.date33,
    certify34: info.certify34,
    date34: info.date34,
    certify35: info.certify35,
    date35: info.date35,
    certify36: info.certify36,
    certify37A: info.certify37A,
    exchange37A: info.exchange37A,
    certify37B: info.certify37B,
    name37B: info.name37B,
    securities37B: info.securities37B,
    certify38: info.certify38,
    certify39: info.certify39,
    certify40A: info.certify40A,
    certify40B: info.certify40B,
    certify40C: info.certify40C,
    certify41: info.certify41,
    name42: info.name42,
    certify43: info.certify43,
    name1Part44: info.name1Part44,
    address1Part44: info.address1Part44,
    tin1Part44: info.tin1Part44,
    name2Part44: info.name2Part44,
    address2Part44: info.address2Part44,
    tin2Part44: info.tin2Part44,
    name3Part44: info.name3Part44,
    address3Part44: info.address3Part44,
    tin3Part44: info.tin3Part44,
    name4Part44: info.name4Part44,
    address4Part44: info.address4Part44,
    tin4Part44: info.tin4Part44,
    name5Part44: info.name5Part44,
    address5Part44: info.address5Part44,
    tin5Part44: info.tin5Part44,
    name6Part44: info.name6Part44,
    address6Part44: info.address6Part44,
    tin6Part44: info.tin6Part44,
    name7Part44: info.name7Part44,
    address7Part44: info.address7Part44,
    tin7Part44: info.tin7Part44,
    name8Part44: info.name8Part44,
    address8Part44: info.address8Part44,
    tin8Part44: info.tin8Part44,
    name9Part44: info.name9Part44,
    address9Part44: info.address9Part44,
    tin9Part44: info.tin9Part44,
    certify: info.iCertify!,
    signature: info.signature!,
    signerName: info.signerName!,
    date: info.date!,
    consent: info.iConsent!,
  }
})
const selectIsLoadingSendUserInfo = createSelector([selectState], (state) => state.sendUserInfoStatus === RequestStatus.Loading)
const selectIsSendUserInfoReady = createSelector([selectState], (state) => state.sendUserInfoStatus === RequestStatus.Succeeded)

const selectUserVaults = createSelector([selectState], (state) => state.vaults)
const selectUserVaultsNew = createSelector([selectState], (state) => state.userVaults)
const selectUserLiquidationAddresses = createSelector([selectState], (state) => state.liquidationAddresses)
const selectUserVirtualAccounts = createSelector([selectState], (state) => state.virtualAccounts)
const selectUserVaultsStatus = createSelector([selectState], (state) => state.fetchUserVaultsStatus)

const selectIsLoadingWatchAllUserVaults = createSelector([selectState], (state) => state.watchAllUserVaultsStatus === RequestStatus.Loading)

const selectUserVault = createSelector([selectState], (state) => {
  const vault = state.userVault
  return {
    ...vault,
    roles: vault.roles.map((role) => ({
      ...role,
      totalIncome: role.totalIncome ? (Number(role.totalIncome) / 1000000).toFixed(2) : '0',
    })),
    totalPaid: vault.totalPaid ? (Number(vault.totalPaid) / 1000000).toFixed(2) : '0',
    currentFunds: vault.currentFunds ? (Number(vault.currentFunds) / 1000000).toFixed(2) : '0',
    claimable: vault.claimable ? (Number(vault.claimable) / 1000000).toFixed(2) : '0',
  }
})

const selectUserVaultById = (id: string) => createSelector([selectState], (state) => state.userVaults.find((item) => item.id === id))

const selectUserLiquidationAddress = createSelector([selectState], (state) => state.userLiquidationAddress)
const selectUserVirtualAccount = createSelector([selectState], (state) => state.userVirtualAccount)
const selectUserVaultStatus = createSelector([selectState], (state) => state.fetchUserVaultStatus)

const selectTaxFormId = createSelector([selectState], (state) => state.taxFormId)
const selectIsRequestAccessLoading = createSelector([selectState], (state) => state.requestAccessStatus === RequestStatus.Loading)
const selectIsShowConfetti = createSelector([selectState], (state) => state.showConfetti)
const selectDownloadModalOpen = createSelector([selectState], (state) => state.downloadModalOpen)
const selectIsDownloadDocumentLoading = createSelector([selectState], (state) => state.downloadDocumentStatus === RequestStatus.Loading)
const selectIsDownloadDocumentFailed = createSelector([selectState], (state) => state.downloadDocumentStatus === RequestStatus.Failed)
const selectAvatarUploadStatusIsLoading = createSelector([selectState], (state) => state.avatarUploadStatus === RequestStatus.Loading)

const selectUserAvatar = createSelector(
  [selectBackendData],
  (backendData) => backendData?.avatar
)

const selectUserCustomAvatar = createSelector([selectBackendData], (backendData) => backendData?.avatar)

const selectDirectVaultCustomer = createSelector([selectBackendData], (state) => state?.customer)
const selectDirectVaultBridgeKYC = createSelector([selectBackendData], (state) => state?.bridgeKyc)

const selectPersonaData = createSelector([selectState], (state) => state.personaData)
const selectPersonaApplicantData = createSelector([selectState], (state) => state.personaApplicationData)
const selectIsPersonaDataReady = createSelector([selectState], (state) => state.fetchPersonaDataStatus === RequestStatus.Succeeded)

export const userSelectors = {
  selectUserId,
  selectUserInfo,
  selectUserName,
  selectTaxFormId,
  selectUserEmail,
  selectUserVault,
  selectSumSubData,
  selectUserInfoW9,
  selectUserVaults,
  selectUserVaultsNew,
  selectUserLiquidationAddresses,
  selectUserVirtualAccounts,
  selectBackendData,
  selectUserTaxForms,
  selectApplicantData,
  selectIsUsingGoogle,
  selectUserInfoW8Ben,
  selectIsShowConfetti,
  selectUserInfoW8BenE,
  selectUserVaultStatus,
  selectIsPremiumAccount,
  selectUserVaultsStatus,
  selectDownloadModalOpen,
  selectIsSumSubDataReady,
  selectSendUserDataStatus,
  selectUserEmailTruncated,
  selectUserTaxFormsStatus,
  selectFetchUserDataStatus,
  selectUserLiquidationAddress,
  selectUserVirtualAccount,
  selectFormattedUserInfoW9,
  selectIsSendUserDataReady,
  selectIsSendUserInfoReady,
  selectIsLoadingSendUserInfo,
  selectFormattedUserInfoW8Ben,
  selectIsRequestAccessLoading,
  selectFormattedUserInfoW8BenE,
  selectIsDownloadDocumentFailed,
  selectIsDownloadDocumentLoading,
  selectIsLoadingWatchAllUserVaults,
  selectAuth0Data,
  selectUserAvatar,
  selectUserCustomAvatar,
  selectAvatarUploadStatusIsLoading,
  selectDirectVaultCustomer,
  selectDirectVaultBridgeKYC,
  selectPersonaData,
  selectPersonaApplicantData,
  selectIsPersonaDataReady,
  selectUserVaultById
}
