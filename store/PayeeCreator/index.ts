import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import reducer from './PayeeCreator.reducer'
import PayeeCreatorSaga from './PayeeCreator.sagas'
import { PayeeCreatorState } from './PayeeCreator.state'

export * from './PayeeCreator.actions'
export * from './PayeeCreator.selectors'
export * from './PayeeCreator.types'

export interface RootState {
  PayeeCreator: PayeeCreatorState
}

export function* saga() {
  yield all([
    PayeeCreatorSaga()
  ])
}

export default combineReducers({
  payee: reducer
})
