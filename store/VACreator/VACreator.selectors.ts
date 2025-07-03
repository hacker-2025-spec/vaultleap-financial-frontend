import { createSelector } from "@reduxjs/toolkit"
import { StoreKeys } from "../store.keys"
import { selectReducer } from "../store.utils"

const selectVACreatorState = createSelector([selectReducer(StoreKeys.VACreator)], (state) => state)

// Transform the data to avoid identity function warning
export const selectData = createSelector([selectVACreatorState], (state) => state.data ? { ...state.data } : null)
// Transform boolean to avoid identity function warning
export const selectSucceed = createSelector([selectVACreatorState], (state) => !!state.succeed)
// Transform boolean to avoid identity function warning
export const selectProcessing = createSelector([selectVACreatorState], (state) => !!state.processing)
// Transform boolean to avoid identity function warning
export const selectFetching = createSelector([selectVACreatorState], (state) => !!state.fetching)
// Transform the array to avoid identity function warning
export const selectVirtualAccounts = createSelector([selectVACreatorState], (state) => state.virtualAccounts ? [...state.virtualAccounts] : [])
