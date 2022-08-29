import * as api from "../api";
import {typeCodification} from "./constants"

export const listTypeProduit = async () => {

    let response = {
        typesProduits: {},
        errMsgs: {}
    }

    let res;
    let type = typeCodification.TYPE_PRODUIT

    try {
        res = await api.listCodifications(type)
        response.typesProduits = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;

}

export const listTypeTransaction = async () => {

    let response = {
        typesTransactions: {},
        errMsgs: {}
    }

    let res;
    let type = typeCodification.TYPE_TRANSACTION

    try {
        res = await api.listCodifications(type)
        console.log(res)
        response.typesTransactions = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;

}