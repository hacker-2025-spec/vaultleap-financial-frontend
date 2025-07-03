import { CreateLiquidationAddressModalFormFields } from "@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal.types"

export interface PayeeCreator {
    data: Partial<CreateLiquidationAddressModalFormFields>
    processing: boolean
    succeed: boolean | null
}

export const RESET = 'payee-creator/RESET'
export const CREATE_LIQUIDATION_ADDRESS_REQUEST = 'payee-creator/CREATE_LIQUIDATION_ADDRESS_REQUEST'
export const CREATE_LIQUIDATION_ADDRESS_SUCCESS = 'payee-creator/CREATE_LIQUIDATION_ADDRESS_SUCCESS'
export const CREATE_LIQUIDATION_ADDRESS_FAILURE = 'payee-creator/CREATE_LIQUIDATION_ADDRESS_FAILURE'
export const SET_DATA = 'payee-creator/SET_DATA'


interface ResetAction {
  type: typeof RESET
}

interface CreateLiquidationAddressRequestAction {
  type: typeof CREATE_LIQUIDATION_ADDRESS_REQUEST
}

interface CreateLiquidationAddressSuccessAction {
  type: typeof CREATE_LIQUIDATION_ADDRESS_SUCCESS
}

interface CreateLiquidationAddressFailureAction {
  type: typeof CREATE_LIQUIDATION_ADDRESS_FAILURE
  error: Error
}

interface SetDataAction {
  type: typeof SET_DATA
  payload: Partial<CreateLiquidationAddressModalFormFields>
}

export type PayeeCreatorActionTypes =
  | ResetAction
  | CreateLiquidationAddressRequestAction
  | CreateLiquidationAddressSuccessAction
  | CreateLiquidationAddressFailureAction
  | SetDataAction
