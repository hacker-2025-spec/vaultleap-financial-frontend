import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import type { ActionsType } from '../store.types'
import { CreatorManagerState } from './creatorManager.state'
import { CreatorManager, CreatorStages } from './creatorManager.types'
import { customOrderedStagesList, defaultOrderedStagesList, selfManagedVaultNonPremiumStagesList, selfManagedVaultOrderedStagesList } from './creatorManager.const'

export const initialCreatorManagerSliceState: CreatorManager = {
  ...new CreatorManagerState(),
}

export const creatorManagerSlice = createSlice({
  reducers: {
    setStagesList: (state, action: PayloadAction<{ custom?: boolean, selfManaged?: boolean, selfManagedNonPremium?: boolean }>) => {
      if (action.payload.custom) {
        state.stagesList = customOrderedStagesList
      } else if (action.payload.selfManaged) {
        state.stagesList = selfManagedVaultOrderedStagesList
      } else if (action.payload.selfManagedNonPremium) {
        state.stagesList = selfManagedVaultNonPremiumStagesList
      } else {
        state.stagesList = defaultOrderedStagesList
      }
    },
    setCurrentStage: (state, action: PayloadAction<CreatorStages>) => {
      state.currentStage = action.payload
    },

    initializeBackendProcessing: (_, __: PayloadAction<{ address: string }>) => {},
    initializeBackendProcessingSuccess: () => {},

    resetStore: (state) => {
      state.currentStage = CreatorStages.CHOOSE_TEMPLATE
      state.stagesList = initialCreatorManagerSliceState.stagesList
    },
  },
  name: StoreKeys.CreatorManager,
  initialState: initialCreatorManagerSliceState,
})

export const creatorManagerActions = creatorManagerSlice.actions
export const creatorManagerReducer = creatorManagerSlice.reducer
export type CreatorManagerActions = ActionsType<typeof creatorManagerActions>
