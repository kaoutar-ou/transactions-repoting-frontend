import axios from "./axios";

const listTransactionsUrl = "/transactions";
const searchtransactionsUrl = "/transactions/search";
const pdfTransactionsUrl = "/pdf"

export const listTransactions = async (id_client) => await axios.get(listTransactionsUrl + "/" + id_client);

export const searchTransactions = async (id_client, transaction) => await axios.post(searchtransactionsUrl + "/" + id_client, transaction);

export const pdfTransactions = async (id_client) => await axios.get(pdfTransactionsUrl + "/" + id_client, {
    headers: {
        'Content-Type': 'application/pdf'
    }
});

export const pdfTransaction = async (id_client, id_transaction) => await axios.get(pdfTransactionsUrl + "/" + id_client + "/transaction/" + id_transaction);

