import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'

const selectAppState = createSelector([selectReducer(StoreKeys.App)], (state) => state)

const selectIsSidebarOpen = createSelector([selectAppState], (state) => state.isSidebarOpen)

export const appSelectors = {
  selectIsSidebarOpen,
}
