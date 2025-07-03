// import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { configureStore } from '@reduxjs/toolkit'

import { rootSaga } from './store.saga'
import { rootReducer } from './store.reducer'

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([sagaMiddleware]),
    devTools: true,
  })

  sagaMiddleware.run(rootSaga)

  return store
}

export const store = createStore()
