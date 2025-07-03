import { PayeeCreatorState } from './PayeeCreator.state'
import {
    PayeeCreatorActionTypes,
    RESET,
    CREATE_LIQUIDATION_ADDRESS_REQUEST,
    CREATE_LIQUIDATION_ADDRESS_SUCCESS,
    CREATE_LIQUIDATION_ADDRESS_FAILURE,
    SET_DATA,
} from './PayeeCreator.types'


const initialState = { ...new PayeeCreatorState() }

export default function reducer(
    state: PayeeCreatorState = initialState,
    action: PayeeCreatorActionTypes
): PayeeCreatorState {
    switch (action.type) {
        case RESET:
            return {
                ...initialState,
            }

        case CREATE_LIQUIDATION_ADDRESS_REQUEST:
            return {
                ...state,
                processing: true
            }

        case CREATE_LIQUIDATION_ADDRESS_SUCCESS:
        case CREATE_LIQUIDATION_ADDRESS_FAILURE:
            return {
                ...state,
                processing: false
            }

        case SET_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }

        default:
            return state
    }
}