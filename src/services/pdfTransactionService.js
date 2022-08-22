import * as api from "../api";

export const getPdfTransactions = async (id_client, document) => {

    let response = {
        pdf: {},
        errMsgs: {}
    }

    // let res;
    let http = new XMLHttpRequest();
    let url = "http://localhost:8080/api/pdf/"+id_client;

    try {
        // res = await api.pdfTransactions(id_client);
        // console.log('res service');
        // console.log(res);
        // response.pdf = res.data;
        http.open('get', url, true);
        http.responseType = "blob";
        http.onload = function() {
            // console.log(http.response)
            const report = new Blob([http.response], { type: 'application/pdf' });
            const reportURL = URL.createObjectURL(report);
            const link = document.createElement("a");
            link.href = reportURL;
            link.download = "rapport_transactions.pdf";
            link.click();
            window.open(reportURL, "_blank");
            response.pdf = http.response;
            document.body.removeChild(link);
            URL.revokeObjectURL(reportURL);
        };
        http.send();

    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;
}


export const getPdfTransaction = async (id_client, id_transaction, document) => {

    let response = {
        pdf: {},
        errMsgs: {}
    }

    // let res;
    let http = new XMLHttpRequest();
    let url = "http://localhost:8080/api/pdf/"+id_client+"/transaction/"+id_transaction;

    try {
        // res = await api.pdfTransactions(id_client);
        // console.log('res service');
        // console.log(res);
        // response.pdf = res.data;
        http.open('get', url, true);
        http.responseType = "blob";
        http.onload = function() {
            // console.log(http.response)
            const report = new Blob([http.response], { type: 'application/pdf' });
            const reportURL = URL.createObjectURL(report);
            const link = document.createElement("a");
            link.href = reportURL;
            link.download = "rapport_transaction.pdf";
            link.click();
            window.open(reportURL, "_blank");
            response.pdf = http.response;
            document.body.removeChild(link);
            URL.revokeObjectURL(reportURL);
        };
        http.send();

    }
    catch (err) {
        response.errMsgs = {...response.errMsgs, err};
    }

    return response;
}