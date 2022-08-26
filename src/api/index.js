import axios from "./axios";

const listTransactionsUrl = "/transactions";
const searchtransactionsUrl = "/transactions/search";
const pdfTransactionsUrl = "/report"
const beneficiairesUrl = "/beneficiaires"
const transactionUrl = "/transactions/transaction"

export const listTransactions = async (id_client, transaction, page=0, size=4) => await axios.post(searchtransactionsUrl + "/" + id_client, transaction, { headers: null, 
    params: {
        page:page,
        size:size
    }}
);

export const pdfTransactions = async (id_client) => await axios.get(pdfTransactionsUrl + "/" + id_client, {
    headers: {
        'Content-Type': 'application/pdf'
    }
});

export const pdfTransaction = async (id_client, id_transaction) => await axios.get(pdfTransactionsUrl + "/" + id_client + "/" + id_transaction);

export const listBeneficiaires = async (id_client) => await axios.get(beneficiairesUrl + "/" + id_client);

export const getTransaction = async (id_transaction) => await axios.get(transactionUrl + "/" + id_transaction);