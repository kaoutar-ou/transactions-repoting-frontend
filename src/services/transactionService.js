import * as api from "../api";

export const getTransactionsList = async (id_client) => {

    let response = {
        transactions: {},
        errMsgs: {}
    }

    let res;

    try {
        res = await api.listTransactions(id_client);
        response.transactions = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;
}

export const searchTransactions = async (id_client, transaction) => {
    
        let response = {
            transactions: {},
            errMsgs: {}
        }
    
        let res;
    
        try {
            res = await api.searchTransactions(id_client, transaction);
            response.transactions = res.data;
            console.log("res.data");
            console.log(res.data);
        }
        catch (err) {
            response.errMsgs = {...response.errMsgs, err};
        }
    
        return response;
}
