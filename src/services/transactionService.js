import * as api from "../api";

export const getTransactionsList = async (id_client, page, size) => {

    let response = {
        transactions: {},
        errMsgs: {}
    }

    let res;

    try {
        res = await api.listTransactions(id_client, page, size);
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

// export const searchTransactions = async (id_client, transaction, page, size) => {
    
//         let response = {
//             transactions: {},
//             errMsgs: {}
//         }
    
//         let res;
    
//         try {
//             res = await api.searchTransactions(id_client, transaction, page, size);
//             response.transactions = res.data;
//             console.log("res.data");
//             console.log(res.data);
//         }
//         catch (err) {
//             response.errMsgs = {...response.errMsgs, err};
//         }
    
//         return response;
// }
