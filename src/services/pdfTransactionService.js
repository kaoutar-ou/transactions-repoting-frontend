import * as api from "../api";

export const getPdfTransactions = async (id_client, document) => {

    let response = {
        pdf: {},
        errMsgs: {}
    }

    let http = new XMLHttpRequest();
    let url = "http://localhost:8080/api/pdf/"+id_client;

    try {
        http.open('get', url, true);
        http.responseType = "blob";
        http.onload = function() {
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

    let http = new XMLHttpRequest();
    let url = "http://localhost:8080/api/transactions/report/"+id_client+"/"+id_transaction;

    try {
        http.open('get', url, true);
        http.responseType = "blob";
        http.onload = function() {
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