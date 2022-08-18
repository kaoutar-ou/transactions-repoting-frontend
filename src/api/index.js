import axios from "./axios";

const listtransactionsUrl = "/transactions";
const searchtransactionsUrl = "/transactions/search";

export const listTransactions = async (id_client) => await axios.get(listtransactionsUrl + "/" + id_client);

export const searchTransactions = async (id_client, transaction) => await axios.post(searchtransactionsUrl + "/" + id_client, transaction);