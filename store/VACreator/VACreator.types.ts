import { CreateVirtualAccountModalFormFields } from "@/components/features/vaults/CreateVirtualAccountModal/CreateVirtualAccountModal.types"
import { VirtualAccountEntity } from "@klydo-io/getrewards-backend-api"

export interface VACreator {
    data: Partial<CreateVirtualAccountModalFormFields>
    virtualAccounts: VirtualAccountEntity[]
    processing: boolean
    succeed: boolean | null
    fetching: boolean
}

export const RESET = 'payee-creator/RESET'
export const CREATE_VIRTUAL_ACCOUNT_REQUEST = 'payee-creator/CREATE_VIRTUAL_ACCOUNT_REQUEST'
export const CREATE_VIRTUAL_ACCOUNT_SUCCESS = 'payee-creator/CREATE_VIRTUAL_ACCOUNT_SUCCESS'
export const CREATE_VIRTUAL_ACCOUNT_FAILURE = 'payee-creator/CREATE_VIRTUAL_ACCOUNT_FAILURE'
export const FETCH_VIRTUAL_ACCOUNT_REQUEST = 'payee-creator/FETCH_VIRTUAL_ACCOUNT_REQUEST'
export const FETCH_VIRTUAL_ACCOUNT_SUCCESS = 'payee-creator/FETCH_VIRTUAL_ACCOUNT_SUCCESS'
export const FETCH_VIRTUAL_ACCOUNT_FAILURE = 'payee-creator/FETCH_VIRTUAL_ACCOUNT_FAILURE'
export const SET_DATA = 'payee-creator/SET_DATA'


interface ResetAction {
  type: typeof RESET
}

interface CreateVirtualAccountRequestAction {
  type: typeof CREATE_VIRTUAL_ACCOUNT_REQUEST
}

interface CreateVirtualAccountSuccessAction {
  type: typeof CREATE_VIRTUAL_ACCOUNT_SUCCESS
}

interface CreateVirtualAccountFailureAction {
  type: typeof CREATE_VIRTUAL_ACCOUNT_FAILURE
  error: Error
}

interface FetchVirtualAccountRequestAction {
  type: typeof FETCH_VIRTUAL_ACCOUNT_REQUEST
}

interface FetchVirtualAccountSuccessAction {
  type: typeof FETCH_VIRTUAL_ACCOUNT_SUCCESS
  payload: VirtualAccountEntity[]
}

interface FetchVirtualAccountFailureAction {
  type: typeof FETCH_VIRTUAL_ACCOUNT_FAILURE
  error: Error
}

interface SetDataAction {
  type: typeof SET_DATA
  payload: Partial<CreateVirtualAccountModalFormFields>
}

export type VACreatorActionTypes =
  | ResetAction
  | CreateVirtualAccountRequestAction
  | CreateVirtualAccountSuccessAction
  | CreateVirtualAccountFailureAction
  | FetchVirtualAccountRequestAction
  | FetchVirtualAccountSuccessAction
  | FetchVirtualAccountFailureAction
  | SetDataAction
