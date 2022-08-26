import React, { useEffect, useState } from 'react'
import {Table, Button} from 'react-bootstrap';
import * as transactionService from "../../services/transactionService"
import * as pdfTransactionService from "../../services/pdfTransactionService"
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../../services/actions/transactionActions";
import TableTransactions from '../tableTransactions';
import RechercheTransactions from '../rechercheTransactions';
import Paginator from '../paginator';

import './style.css';
import { ListTransactionsConstants } from '../../services/constants';

function ListTransactions() {

    const totalPerPage = 2;
    const transactions = useSelector((state) => state.transactions);

    const [page, setPage] = useState(0);
    const [nbrePages, setNbrePages] = useState(1);
    // const [last, setLast] = useState();
    // const [first, setFirst] = useState();

    const [transactionObject, setTransactionObject] = useState(null);

    const handleSetTransactionObject = (txnObject) => {
        setTransactionObject(txnObject)
    }

    const handleSetNbrePages = (nbreTotalPages) => {
        setNbrePages(nbreTotalPages)
    }

    const dispatch = useDispatch();

    const getTransactions = async (page) => {

        console.log("transactionObject")
        console.log(transactionObject)

        const response = await transactionService.getTransactionsList(3, transactionObject, page);

        let transactionsList
        let nbreTotalPages

        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            transactionsList = (response?.transactions?.content) ? response.transactions.content : null
            nbreTotalPages = (response?.transactions?.totalPages) ? response.transactions.totalPages : 1
            handleSetNbrePages(nbreTotalPages)
            console.log("res1");
            console.log(response.transactions);
            
            dispatch(listTransactions(transactionsList));
        }


        // // const response = await transactionService.getTransactionsList(3, page);
        // console.log("txn")
        // console.log(txn)
        // console.log(page)
        // let response
        // let result
        // let nbreTotalPages
        // if(txn != null) {
        //     response = await transactionService.searchTransactions(3, txn, page+1);
        //     // result = (response?.transactions) ? response.transactions : null
        //     // nbreTotalPages = (response?.transactions?.totalPages) ? response.transactions.totalPages : 1
        // }
        // else {
        //     response = await transactionService.getTransactionsList(3, page);
        //     // result = (response?.transactions?.content) ? response?.transactions?.content : null
        // }
        // if (Object.keys(response.errMsgs).length > 0 ) {
        //     console.log("response.errMsgs");
        // }
        // else {
        //     result = (response?.transactions?.content) ? response.transactions.content : null
        //     nbreTotalPages = (response?.transactions?.totalPages) ? response.transactions.totalPages : 1
        //     setNbrePages(nbreTotalPages)
        //     console.log("res1");
        //     console.log(response.transactions);
        //     // dispatch(listTransactions(response.transactions.content));
        //     dispatch(listTransactions(result));
        // }
    }

    useEffect(() => {
        getTransactions(page);
    }, [transactionObject]);

    useEffect(() => {
        getTransactions(page);
    }, []);

    const handleGenererRapport = async () => {
        console.log(transactions.map((transaction) => transaction.id));
        let res = await pdfTransactionService.getPdfTransactions(3, document);
        console.log('res');
        console.log(res);
    }
    
    const handlePagination = (page) => {
        console.log(page);
        setPage(page);
        getTransactions(page);
    }

    return (
        <div className='p-4'>
            <div className='list-head my-5'>Liste des Transactions</div>
            <div className='list-container'>
                <RechercheTransactions page={page} totalPerPage={totalPerPage} handleSetTransactionObject={handleSetTransactionObject} handleSetNbrePages={handleSetNbrePages} handlePagination={handlePagination}/> 
                <TableTransactions />  
            </div>
            <div className='row my-3'>
                <div className='col col-6'>
                    <Paginator active={page+1} numPages={nbrePages} handlePagination={handlePagination}/>
                </div>
            </div>
        </div>
      );
}

export default ListTransactions