import axios from "./axios";

const searchtransactionsUrl = "/transactions/search";
const pdfTransactionsUrl = "/report"
const beneficiairesUrl = "/beneficiaires"
const transactionUrl = "/transactions/transaction"

const codificationsUrl = "/codifications/type"

const codificationUrl = "/codifications"

const allDocumentsJointsUrl = "/documents"

export const listTransactions = async (id_client, transaction, page=0, size=4) => await axios.post(searchtransactionsUrl + "/" + id_client, transaction, { headers: null, 
    params: {
        page:page,
        size:size
    }}
);

export const pdfTransaction = async (id_client, id_transaction) => await axios.get(pdfTransactionsUrl + "/" + id_client + "/" + id_transaction);

export const listBeneficiaires = async (id_client) => await axios.get(beneficiairesUrl + "/" + id_client);

export const getTransaction = async (id_transaction) => await axios.get(transactionUrl + "/" + id_transaction);

export const listDocumentsJoints = async (id_transaction) => await axios.get(allDocumentsJointsUrl + "/" + id_transaction);

export const listCodifications = async (type_codification) => await axios.get(codificationsUrl + "/" + type_codification);

export const getCodification = async (id_codification) => await axios.get(codificationUrl + "/" + id_codification);

