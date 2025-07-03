import { createSelector } from '@reduxjs/toolkit'
import { TaxFormType } from '@klydo-io/getrewards-backend-api'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'
import { userSelectors } from '../user/user.selectors'
import {
  TShareRole,
  TemplateType,
  TVaultDataForEmailDisplay,
  TShareRoleForEmailDisplay,
} from './creatorData.types'

const selectCreatorDataState = createSelector([selectReducer(StoreKeys.CreatorData)], (state) => state)

const selectTemplateType = createSelector([selectCreatorDataState], (state) => state.templateType)
const selectIsMultipleVaultsTemplate = createSelector([selectCreatorDataState], (state) => state.templateType === TemplateType.SINGLE_PAYMENT)
const selectIsSelfManagedVaultTemplate = createSelector([selectCreatorDataState], (state) => state.templateType === TemplateType.SELF_MANAGED)
const selectIsReadyPrevious = createSelector([selectCreatorDataState], (state) => state.isReadyPrevious)
const selectIsLoadingPrevious = createSelector([selectCreatorDataState], (state) => state.isLoadingPrevious)
const selectHasErrorPrevious = createSelector([selectCreatorDataState], (state) => state.hasErrorPrevious)
const selectIsUsingPrevious = createSelector([selectCreatorDataState], (state) => state.isUsingPreviousData)
const selectHasPreviousData = createSelector([selectCreatorDataState], (state) => state.hasPreviousData)
const selectPreviousData = createSelector([selectCreatorDataState], (state) => state.previousData)

const selectProjectName = createSelector([selectCreatorDataState], (state) => state.singleVault?.projectName)
const selectProjectNamePlaceholder = createSelector([selectCreatorDataState], (state) => state.singleVault?.projectNamePlaceholder)
const selectProjectRoles = createSelector([selectCreatorDataState], (state) => state.singleVault?.roles)
const selectPopulatedRoles = createSelector([selectProjectRoles], (roles) => {
  return roles?.reduce<TShareRoleForEmailDisplay[]>((accumulator, role, index) => {
    for (let i = 0; i < role.count; i++) {
      accumulator.push({
        id: role.id,
        email: role.emails[i] || '',
        name: role.name,
        sharePercentage: role.sharePercentage,
        roleNumber: index + 1,
      })
    }
    return accumulator
  }, [])
})

const selectIsProfitSwitchActive = createSelector([selectCreatorDataState], (state) => state.singleVault.isProfitSwitchActive)
const selectProfitSwitchData = createSelector([selectCreatorDataState], (state) => ({
  isProfitSwitchActive: state.singleVault.isProfitSwitchActive,
  profitSwitchName: state.singleVault.profitSwitchName,
  profitSwitchAmount: state.singleVault.profitSwitchAmount,
  profitSwitchAddress: state.singleVault.profitSwitchAddress,
}))

const selectProjectVaults = createSelector([selectCreatorDataState], (state) => state.multipleVaults)

const selectPopulatedProjectVaults = createSelector([selectCreatorDataState], (state) => {
  const vaults: TVaultDataForEmailDisplay[] = []
  state.multipleVaults.map((vault) => {
    vaults.push({
      ...vault,
      roles: [{
        ...vault.roles[0],
        email: vault.roles[0].emails[0] || '',
        roleNumber: 1,
      }]
    })
  })
  return vaults
})

const selectIsSingleInMultipleVaults = createSelector([selectPopulatedProjectVaults], (vaults) => vaults.length === 1)

const selectOwnerDetails = createSelector([selectCreatorDataState], (state) => ({
  ownerName: state.ownerName,
  ownerEmail: state.ownerEmail,
}))

const selectIs1099TaxFormActive = createSelector([selectCreatorDataState], (state) => state.is1099TaxFormActive)
const selectIsAgreeToTOSAndPP = createSelector([selectCreatorDataState], (state) => state.agreeToTOSAndPP)

const selectBusinessDetails = createSelector([selectCreatorDataState], (state) => ({
  businessName: state.businessName,
  address: state.address,
  city: state.city,
  state: state.state,
  country: state.country,
  zip: state.zip,
  ssn: state.ssn,
  ein: state.ein,
}))

const selectCreatorConfig = createSelector(
  [selectCreatorDataState, selectProjectRoles, userSelectors.selectUserId],
  (state, roles, userId) => ({
    userId: userId,
    projectName: state.singleVault?.projectName,
    roles: roles?.map((role: TShareRole) => ({
      count: role.count,
      emails: role.emails,
      name: role.name,
      sharePercentage: role.sharePercentage,
      shareHolderRoleAddress: '',
      watching: true,
    })),
    profitSwitchName: state.singleVault.profitSwitchName,
    profitSwitchAmount: Number(state.singleVault.profitSwitchAmount) || 0,
    profitSwitchAddress: state.singleVault.profitSwitchAddress,
    ownerName: state.ownerName,
    ownerEmail: state.ownerEmail,
    agreeToTOSAndPP: state.agreeToTOSAndPP,
  })
)

const selectCreatorTaxInfo = createSelector([selectCreatorDataState], (state) => ({
  email: state.ownerEmail,
  formType: TaxFormType._1099,
  t1099FormDetails: {
    businessName: state.businessName,
    address: state.address,
    city: state.city,
    state: state.state,
    country: state.country,
    zip: state.zip,
    ssn: state.ssn,
    ein: state.ein,
  },
}))

const selectTotalAmount = createSelector([selectCreatorDataState], (state) => state.totalAmount)

const selectVaultsCreatorConfig = createSelector(
  [selectCreatorDataState, userSelectors.selectUserId, selectIs1099TaxFormActive, selectCreatorTaxInfo],
  (state, userId, isTaxFormEnabled, creatorTaxInfo) => {
    const config = {
      vaults: state.multipleVaults.map((vault) => ({
        userId: userId,
        projectName: vault.projectName,
        roles: vault.roles?.map((role: TShareRole) => ({
          count: role.count,
          emails: role.emails,
          name: role.name,
          sharePercentage: role.sharePercentage,
          shareHolderRoleAddress: '',
          watching: true,
        })),
        profitSwitchName: vault.profitSwitchName,
        profitSwitchAmount: Number(vault.profitSwitchAmount) || 0,
        profitSwitchAddress: vault.profitSwitchAddress,
        ownerName: state.ownerName,
        ownerEmail: state.ownerEmail,
        shareholderManagerAddress: '',
        agreeToTOSAndPP: state.agreeToTOSAndPP,
      })),
      taxFormEnabled: isTaxFormEnabled,
    }
    if (isTaxFormEnabled) {
      return {
        ...config,
        ownerTaxInfo: creatorTaxInfo,
      }
    }
    return config
  }
)

const selectSelfManagedVaultCreatorConfig = createSelector(
  [selectCreatorDataState, userSelectors.selectUserId],
  (state, userId) => {
    const vault = state.multipleVaults[0]
    return {
      userId: userId,
      projectName: vault.projectName,
      roles: vault.roles?.map((role: TShareRole) => ({
        count: role.count,
        emails: role.emails,
        name: role.name,
        sharePercentage: role.sharePercentage,
        shareHolderRoleAddress: '',
        watching: true,
      })),
      profitSwitchName: vault.profitSwitchName,
      profitSwitchAmount: Number(vault.profitSwitchAmount) || 0,
      profitSwitchAddress: vault.profitSwitchAddress,
      ownerName: state.ownerName,
      ownerEmail: state.ownerEmail,
      agreeToTOSAndPP: state.agreeToTOSAndPP,
    }
  }
)

export const creatorDataSelectors = {
  selectProjectName,
  selectTotalAmount,
  selectOwnerDetails,
  selectPreviousData,
  selectProjectRoles,
  selectTemplateType,
  selectCreatorConfig,
  selectProjectVaults,
  selectCreatorTaxInfo,
  selectPopulatedRoles,
  selectBusinessDetails,
  selectHasPreviousData,
  selectIsReadyPrevious,
  selectIsUsingPrevious,
  selectHasErrorPrevious,
  selectProfitSwitchData,
  selectIsAgreeToTOSAndPP,
  selectIsLoadingPrevious,
  selectIs1099TaxFormActive,
  selectVaultsCreatorConfig,
  selectSelfManagedVaultCreatorConfig,
  selectIsProfitSwitchActive,
  selectPopulatedProjectVaults,
  selectProjectNamePlaceholder,
  selectIsMultipleVaultsTemplate,
  selectIsSingleInMultipleVaults,  
  selectIsSelfManagedVaultTemplate
}
