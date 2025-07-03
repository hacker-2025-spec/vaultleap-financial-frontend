import { createSlice } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'

import { AppState } from './app.state'
import { IAppState } from './app.types'

export const initailState: IAppState = {
  ...new AppState(),
}

export const appSlice = createSlice({
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true
    },
    closeSidebar(state) {
      state.isSidebarOpen = false
    },
  },
  name: StoreKeys.App,
  initialState: initailState,
})

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer
