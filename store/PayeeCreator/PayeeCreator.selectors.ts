import { createSelector } from "@reduxjs/toolkit"
import { StoreKeys } from "../store.keys"
import { selectReducer } from "../store.utils"

const selectPayeeCreatorState = createSelector([selectReducer(StoreKeys.PayeeCreator)], (state) => state)

// Transform the data to avoid identity function warning
export const selectData = createSelector([selectPayeeCreatorState], (state) => state.data ? { ...state.data } : null)
// Transform boolean to avoid identity function warning
export const selectSucceed = createSelector([selectPayeeCreatorState], (state) => !!state.succeed)
// Transform boolean to avoid identity function warning
export const selectProcessing = createSelector([selectPayeeCreatorState], (state) => !!state.processing)
