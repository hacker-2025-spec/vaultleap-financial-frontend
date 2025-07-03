import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import reducer from './VACreator.reducer'
import VACreatorSaga from './VACreator.sagas'
import { VACreatorState } from './VACreator.state'

export * from './VACreator.actions'
export * from './VACreator.selectors'
export * from './VACreator.types'

export interface RootState {
  VACreator: VACreatorState
}

export function* saga() {
  yield all([
    VACreatorSaga()
  ])
}

export default combineReducers({
  payee: reducer
})
