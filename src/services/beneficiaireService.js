import * as api from "../api";

export const listBeneficiairesByClient = async (id_client) => {

    let response = {
        beneficiaires: {},
        errMsgs: {}
    }

    let res;

    try {
        res = await api.listBeneficiaires(id_client)
        response.beneficiaires = res.data;
    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;

}