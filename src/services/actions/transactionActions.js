import { TransactionActionTypes } from "../constants"

export const listTransactions = (transactions) => {
    return {
        type: TransactionActionTypes.LIST_TRANSACTIONS,
        payload: transactions,
    }
}