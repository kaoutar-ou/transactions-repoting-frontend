import { TransactionActionTypes } from "../constants"

const initialState = {
    transactions: [],
}

export const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TransactionActionTypes.LIST_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state;
    }
}