import { combineReducers } from '@reduxjs/toolkit'

import { StoreKeys } from './store.keys'
import { userReducer } from './user/user.slice'
import { web3Reducer } from './web3/web3.slice'
import { vaultReducer } from './vault/vault.slice'
import { walletReducer } from './wallet/wallet.slice'
import { vaultsReducer } from './vaults/vaults.slice'
import { sessionReducer } from './session/session.slice'
import { creatorDataReducer } from './creatorData/creatorData.slice'
import { transactionReducer } from './transaction/transaction.slice'
import { creatorManagerReducer } from './creatorManager/creatorManager.slice'
import { claimableVaultsReducer } from './claimableVaults/claimableVaults.slice'
import { directVaultCreatorReducer } from './directVaultCreator/directVaultCreator.slice'
import { virtualAccountCreatorReducer } from './virtualAccountCreator/virtualAccountCreator.slice'
import { appReducer } from './app/app.slice'
import { dashboardReducer } from './dashboard/dashboard.slice'
import PayeeCreatorReducer from './PayeeCreator/PayeeCreator.reducer'
import VACreator from './VACreator/VACreator.reducer'
import { knowYourCustomerReducer } from './KnowYourCustomer/KnowYourCustomer'

export const rootReducer = combineReducers({
  [StoreKeys.CreatorData]: creatorDataReducer,
  [StoreKeys.CreatorManager]: creatorManagerReducer,
  [StoreKeys.Session]: sessionReducer,
  [StoreKeys.User]: userReducer,
  [StoreKeys.Web3]: web3Reducer,
  [StoreKeys.Wallet]: walletReducer,
  [StoreKeys.Vault]: vaultReducer,
  [StoreKeys.Vaults]: vaultsReducer,
  [StoreKeys.Transaction]: transactionReducer,
  [StoreKeys.ClaimableVaults]: claimableVaultsReducer,
  [StoreKeys.DirectVaultCreator]: directVaultCreatorReducer,
  [StoreKeys.VirtualAccountCreator]: virtualAccountCreatorReducer,
  [StoreKeys.App]: appReducer,
  [StoreKeys.Dashboard]: dashboardReducer,
  [StoreKeys.PayeeCreator]: PayeeCreatorReducer,
  [StoreKeys.VACreator]: VACreator,
  [StoreKeys.KnowYourCustomer]: knowYourCustomerReducer
})
