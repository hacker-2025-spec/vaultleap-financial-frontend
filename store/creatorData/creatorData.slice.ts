import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'

import { CreatorDataState } from './creatorData.state'
import { getNewRoles, getNewVaults } from './creatorData.utils'
import { CREATOR_TEMPLATES_DATA, TVaultsTemplatePlaceholderData } from './creatorData.const'
import { CreatorData, TemplateType, TShareRole, TVaultData, TPreviousData } from './creatorData.types'

export const initialCreatorDataSliceState: CreatorData = {
  ...new CreatorDataState()
}

export const creatorDataSlice = createSlice({
  reducers: {
    setTemplateType: (state, action: PayloadAction<{ template: TemplateType; simplify?: boolean}>) => {
      const templateData = CREATOR_TEMPLATES_DATA[action.payload.template].template

      state.templateType = action.payload.template
      state.is1099TaxFormActive = false

      if (action.payload.template === TemplateType.SPLIT_PAYMENTS) {
        const randomIndex = Math.floor(Math.random() * (templateData.length - 1))
        const randomlySelectedTemplateData = action.payload.simplify ? templateData[templateData.length - 1] : templateData[randomIndex]

        state.singleVault.roles = getNewRoles(randomlySelectedTemplateData)
        state.singleVault.profitSwitchAmount = randomlySelectedTemplateData.profitSwitchAmount || 0
        state.singleVault.profitSwitchName = randomlySelectedTemplateData.profitSwitchName || ''
        state.multipleVaults = []
      } else if (action.payload.template === TemplateType.SINGLE_PAYMENT || action.payload.template === TemplateType.SELF_MANAGED) {
        const randomlySelectedTemplateData = action.payload.simplify ? CREATOR_TEMPLATES_DATA[action.payload.template].emptyTemplate : templateData
        state.singleVault = {
          projectName: '',
          projectNamePlaceholder: '',
          isProfitSwitchActive: false,
          profitSwitchName: '',
          profitSwitchAmount: 0,
          profitSwitchAddress: '',
          roles: []
        }
        state.multipleVaults = getNewVaults(randomlySelectedTemplateData as TVaultsTemplatePlaceholderData[])
      }
    },
    fetchPreviousData: (state) => {
      state.isReadyPrevious = false
      state.isLoadingPrevious = true
      state.hasErrorPrevious = false
      state.isUsingPreviousData = false
      state.hasPreviousData = false
      state.previousData = undefined
    },
    fetchPreviousDataSuccess: (state, action: PayloadAction<TPreviousData['previousData']>) => {
      state.isReadyPrevious = true
      state.isLoadingPrevious = false
      state.isUsingPreviousData = false
      state.hasErrorPrevious = false
      state.hasPreviousData = action.payload !== undefined
      state.previousData = action.payload
    },
    resetPreviousData: (state) => {
      state.isReadyPrevious = false
      state.isLoadingPrevious = false
      state.isUsingPreviousData = false
      state.hasErrorPrevious = false
      state.hasPreviousData = false
      state.previousData = undefined
    },
    setUsePreviousData: (state, action: PayloadAction<boolean>) => {
      state.isUsingPreviousData = action.payload
      if (action.payload && state.previousData) {
        state.ownerName = state.previousData.vaultInfo.ownerName
        state.ownerEmail = state.previousData.vaultInfo.ownerEmail
        state.is1099TaxFormActive = state.previousData.vaultInfo.taxFormEnabled || false
        if (state.previousData.vaultInfo.taxFormEnabled && state.previousData.taxInfo?.t1099FormDetails) {
          state.businessName = state.previousData.taxInfo.t1099FormDetails.businessName
          state.address = state.previousData.taxInfo.t1099FormDetails.address
          state.city = state.previousData.taxInfo.t1099FormDetails.city
          state.state = state.previousData.taxInfo.t1099FormDetails.state
          state.country = state.previousData.taxInfo.t1099FormDetails.country
          state.zip = state.previousData.taxInfo.t1099FormDetails.zip
          state.ssn = state.previousData.taxInfo.t1099FormDetails.ssn || ''
          state.ein = state.previousData.taxInfo.t1099FormDetails.ein || ''
        }
      } else {
        state.ownerName = ''
        state.ownerEmail = ''
        state.is1099TaxFormActive = false
        state.businessName = ''
        state.address = ''
        state.city = ''
        state.state = ''
        state.country = ''
        state.zip = ''
        state.ssn = ''
        state.ein = ''
      }
    },

    setProjectName: (state, action: PayloadAction<string>) => {
      state.singleVault.projectName = action.payload
    },
    setProjectNamePlaceholder: (state, action: PayloadAction<string>) => {
      state.singleVault.projectNamePlaceholder = action.payload
    },
    updateRole: (state, action: PayloadAction<Pick<TShareRole, 'id'> & Partial<TShareRole>>) => {
      const index = state.singleVault.roles.findIndex((role: TShareRole) => role.id === action.payload.id)
      if (index >= 0) state.singleVault.roles[index] = { ...state.singleVault.roles[index], ...action.payload }
    },
    updateManyRoles: (state, action: PayloadAction<TShareRole[]>) => {
      action.payload.map((role) => {
        const index = state.singleVault.roles.findIndex((sRole: TShareRole) => sRole.id === role.id)
        if (index >= 0) state.singleVault.roles[index] = { ...state.singleVault.roles[index], ...role }
      })
    },
    updateRoleEmails: (state, action: PayloadAction<{ id: string; emails: string[] }>) => {
      const index = state.singleVault.roles.findIndex((role: TShareRole) => role.id === action.payload.id)
      if (index >= 0) state.singleVault.roles[index].emails = action.payload.emails
    },
    removeRole: (state, action: PayloadAction<string>) => {
      state.singleVault.roles = state.singleVault.roles.filter((role: TShareRole) => role.id !== action.payload)
    },
    addRole: (state, action: PayloadAction<TShareRole>) => {
      state.singleVault.roles.push(action.payload)
    },
    setProfitSwitchActive: (state, action: PayloadAction<boolean>) => {
      state.singleVault.isProfitSwitchActive = action.payload
    },
    clearProfitSwitchData: (state) => {
      state.singleVault.profitSwitchName = ''
      state.singleVault.profitSwitchAmount = 0
      state.singleVault.profitSwitchAddress = ''
    },
    updateProfitSwitchData: (
      state,
      action: PayloadAction<{ profitSwitchName?: string; profitSwitchAmount?: number; profitSwitchAddress?: string }>
    ) => {
      state.singleVault.profitSwitchName = action.payload.profitSwitchName || state.singleVault.profitSwitchName
      state.singleVault.profitSwitchAmount = action.payload.profitSwitchAmount || state.singleVault.profitSwitchAmount
      state.singleVault.profitSwitchAddress = action.payload.profitSwitchAddress || state.singleVault.profitSwitchAddress
    },

    addVault: (state, action: PayloadAction<TVaultData>) => {
      state.multipleVaults.push(action.payload)
    },
    removeVault: (state, action: PayloadAction<string>) => {
      state.multipleVaults = state.multipleVaults.filter((vault: TVaultData) => vault.roles[0].id !== action.payload)
    },
    updateVaultName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.multipleVaults.findIndex((vault) => vault.roles[0].id === action.payload.id)
      if (index >= 0) state.multipleVaults[index].projectName = action.payload.name
    },
    updateVaultRoleName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.multipleVaults.findIndex((vault) => vault.roles[0].id === action.payload.id)
      if (index >= 0) state.multipleVaults[index].roles[0].name = action.payload.name
    },
    updateVaultRoleEmail: (state, action: PayloadAction<{ id: string; email: string }>) => {
      const index = state.multipleVaults.findIndex((vault) => vault.roles[0].id === action.payload.id)
      if (index >= 0) state.multipleVaults[index].roles[0].emails = [action.payload.email]
    },
    setVaultProfitSwitchActive: (state, action: PayloadAction<{ id: string, active: boolean }>) => {
      const index = state.multipleVaults.findIndex((vault) => vault.roles[0].id === action.payload.id)
      if (index >= 0) state.multipleVaults[index].isProfitSwitchActive = action.payload.active
    },
    updateVaultProfitSwitchData: (
      state,
      action: PayloadAction<{ id: string; profitSwitchName?: string; profitSwitchAmount?: number; profitSwitchAddress?: string }>
    ) => {
      const index = state.multipleVaults.findIndex((vault) => vault.roles[0].id === action.payload.id)
      if (index >= 0) {
        state.multipleVaults[0].profitSwitchName = action.payload.profitSwitchName || state.multipleVaults[0].profitSwitchName
        state.multipleVaults[0].profitSwitchAmount = action.payload.profitSwitchAmount || state.multipleVaults[0].profitSwitchAmount
        state.multipleVaults[0].profitSwitchAddress = action.payload.profitSwitchAddress || state.multipleVaults[0].profitSwitchAddress
      }
    },

    updateOwnerDetails: (state, action: PayloadAction<{ ownerName?: string; ownerEmail?: string }>) => {
      state.ownerName = action.payload.ownerName || state.ownerName
      state.ownerEmail = action.payload.ownerEmail || state.ownerEmail
    },
    set1099TaxFormActive: (state, action: PayloadAction<boolean>) => {
      state.is1099TaxFormActive = action.payload
    },
    updateBusinessDetails: (
      state,
      action: PayloadAction<{
        businessName?: string
        address?: string
        city?: string
        state?: string
        country?: string
        zip?: string
        ssn?: string
        ein?: string
      }>
    ) => {
      state.businessName = action.payload.businessName || state.businessName
      state.address = action.payload.address || state.address
      state.city = action.payload.city || state.city
      state.state = action.payload.state || state.state
      state.country = action.payload.country || state.country
      state.zip = action.payload.zip || state.zip
      state.ssn = action.payload.ssn || state.ssn
      state.ein = action.payload.ein || state.ein
    },
    updateTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload
    },
    setAgreeToTOSAndPP: (state, action: PayloadAction<boolean>) => {
      state.agreeToTOSAndPP = action.payload
    },
    resetStore: () => initialCreatorDataSliceState,
  },
  name: StoreKeys.CreatorData,
  initialState: initialCreatorDataSliceState,
})

export const creatorDataActions = creatorDataSlice.actions
export const creatorDataReducer = creatorDataSlice.reducer
