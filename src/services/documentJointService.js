import * as api from "../api";

export const listDocumentsJoints = async (id_transaction) => {

    let response = {
        documentsJoints: {},
        errMsgs: {}
    }

    let res;

    try {
        res = await api.listDocumentsJoints(id_transaction)
        response.documentsJoints = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;

}