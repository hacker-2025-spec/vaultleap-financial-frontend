import { CreateLiquidationAddressModalFormFields } from '@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal.types'
import {
    CREATE_LIQUIDATION_ADDRESS_REQUEST,
    RESET,
    SET_DATA,
} from './PayeeCreator.types'

  export const reset = () => ({
    type: RESET as typeof RESET
  })

  export const createLiquidationAddress = () => ({
    type: CREATE_LIQUIDATION_ADDRESS_REQUEST as typeof CREATE_LIQUIDATION_ADDRESS_REQUEST
  })

  export const setData = (data: Partial<CreateLiquidationAddressModalFormFields>) => ({
    type: SET_DATA as typeof SET_DATA,
    payload: data
  })
