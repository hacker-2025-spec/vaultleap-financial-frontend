import { VACreatorState } from './VACreator.state'
import {
    VACreatorActionTypes,
    RESET,
    CREATE_VIRTUAL_ACCOUNT_REQUEST,
    CREATE_VIRTUAL_ACCOUNT_SUCCESS,
    CREATE_VIRTUAL_ACCOUNT_FAILURE,
    SET_DATA,
    FETCH_VIRTUAL_ACCOUNT_REQUEST,
    FETCH_VIRTUAL_ACCOUNT_SUCCESS,
    FETCH_VIRTUAL_ACCOUNT_FAILURE,
} from './VACreator.types'


const initialState = { ...new VACreatorState() }

export default function reducer(
    state: VACreatorState = initialState,
    action: VACreatorActionTypes
): VACreatorState {
    switch (action.type) {
        case RESET:
            return {
                ...initialState,
            }

        case CREATE_VIRTUAL_ACCOUNT_REQUEST:
            return {
                ...state,
                processing: true
            }

        case CREATE_VIRTUAL_ACCOUNT_SUCCESS:
            return {
                ...state,
                succeed: true,
                processing: false
            }
        case CREATE_VIRTUAL_ACCOUNT_FAILURE:
            return {
                ...state,
                succeed: false,
                processing: false
            }

        case FETCH_VIRTUAL_ACCOUNT_REQUEST:
            return {
                ...state,
                fetching: true
            }

        case FETCH_VIRTUAL_ACCOUNT_SUCCESS:
            return {
                ...state,
                virtualAccounts: action.payload,
                fetching: false
            }
        case FETCH_VIRTUAL_ACCOUNT_FAILURE:
            return {
                ...state,
                fetching: false
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