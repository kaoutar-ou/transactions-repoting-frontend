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

    const [transactionObject, setTransactionObject] = useState(null);

    const handleSetTransactionObject = (txnObject) => {
        setTransactionObject(txnObject)
    }

    const handleSetNbrePages = (nbreTotalPages) => {
        setNbrePages(nbreTotalPages)
    }

    const dispatch = useDispatch();

    const getTransactions = async (page) => {

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
            
            dispatch(listTransactions(transactionsList));
        }
    }

    useEffect(() => {
        getTransactions(page);
    }, [transactionObject]);

    useEffect(() => {
        getTransactions(page);
    }, []);

    const handleGenererRapport = async () => {
        let res = await pdfTransactionService.getPdfTransactions(3, document);
    }
    
    const handlePagination = (page) => {
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