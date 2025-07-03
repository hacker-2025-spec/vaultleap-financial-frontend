import type { ActionCreatorsMapObject } from 'redux'

import type { rootReducer } from './store.reducer'

export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export type StoreState = ReturnType<typeof rootReducer>

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>
}
