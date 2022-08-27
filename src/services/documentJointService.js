import * as api from "../api";

// export const getDocumentJoint = async (id_document, document) => {

//     let response = {
//         pdf: {},
//         errMsgs: {}
//     }

//     let http = new XMLHttpRequest();
//     let url = "http://localhost:8080/api/documents/download/"+id_document;

//     try {
//         http.open('get', url, true);
//         http.responseType = "blob";
//         http.onload = function() {
//             const report = new Blob([http.response], { type: 'application/pdf' });
//             const reportURL = URL.createObjectURL(report);
//             const link = document.createElement("a");
//             link.href = reportURL;
//             link.download = "document_joint.pdf";
//             link.click();
//             window.open(reportURL, "_blank");
//             response.pdf = http.response;
//             document.body.removeChild(link);
//             URL.revokeObjectURL(reportURL);
//         };
//         http.send();

//     }
//     catch (err) {
//         response.errMsgs = {...response.errMsgs, err};
//     }

//     return response;
// }

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