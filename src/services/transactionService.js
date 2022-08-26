import * as api from "../api";


export const getTransactionsList = async (id_client, transaction, page, size) => {

    let response = {
        transactions: {},
        errMsgs: {}
    }

    let res;

    try {
        res = await api.listTransactions(id_client, transaction, page, size);
        response.transactions = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;
}

export const getTransaction = async (id_transaction) => {
    let response = {
        transaction: {},
        errMsgs: {}
    }

    let res;

    try {
        res = await api.getTransaction(id_transaction);
        response.transaction = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;
}