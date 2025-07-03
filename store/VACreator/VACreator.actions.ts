import {
    CREATE_VIRTUAL_ACCOUNT_REQUEST,
    FETCH_VIRTUAL_ACCOUNT_REQUEST,
    RESET,
    SET_DATA,
} from './VACreator.types'
import { CreateVirtualAccountModalFormFields } from '@/components/features/vaults/CreateVirtualAccountModal/CreateVirtualAccountModal.types'

  export const reset = () => ({
    type: RESET as typeof RESET
  })

  export const createVirtualAccount = () => ({
    type: CREATE_VIRTUAL_ACCOUNT_REQUEST as typeof CREATE_VIRTUAL_ACCOUNT_REQUEST
  })

  export const fetchVirtualAccounts = () => ({
    type: FETCH_VIRTUAL_ACCOUNT_REQUEST as typeof FETCH_VIRTUAL_ACCOUNT_REQUEST
  })

  export const setData = (data: Partial<CreateVirtualAccountModalFormFields>) => ({
    type: SET_DATA as typeof SET_DATA,
    payload: data
  })
