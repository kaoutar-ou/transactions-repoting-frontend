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

    const transactions = useSelector((state) => state.transactions);

    const [page, setPage] = useState(0);
    const [nbrePages, setNbrePages] = useState(1);

    const dispatch = useDispatch();

    const getTransactions = async (page) => {
        const response = await transactionService.getTransactionsList(3, page);
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            setNbrePages(response.transactions.totalPages)
            console.log("res1");
            console.log(response.transactions);
            dispatch(listTransactions(response.transactions.content));
        }
    }

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
                <RechercheTransactions /> 
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