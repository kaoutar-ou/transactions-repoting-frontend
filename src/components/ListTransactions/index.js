import React, { useEffect } from 'react'
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

    const dispatch = useDispatch();

    const getTransactions = async () => {
        const response = await transactionService.getTransactionsList(3);
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            console.log("res1");
            console.log(response.transactions);
            dispatch(listTransactions(response.transactions));
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    const handleGenererRapport = async () => {
        console.log(transactions.map((transaction) => transaction.id));
        let res = await pdfTransactionService.getPdfTransactions(3, document);
        console.log('res');
        console.log(res);
        // const url = window.URL.createObjectURL(new Blob([res.pdf]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.pdf'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

        // const file = new Blob([res.pdf], { type: 'application/pdf' });
        // const fileURL = URL.createObjectURL(file);
        // window.open(fileURL, "_blank");

        
    }

    const handleClick = async () => {
        // console.log(transactions)
        let txn = {
            reference : null,
            typeTransaction : "EMISSION",
            typePayement : null,
            typeProduit : null,
            dateExpiration : null,
            dateCreation : "2022-08-17",
            montant : null,
            documentJoints : null,
            beneficiaire_id : null
        }

        const response = await transactionService.searchTransactions(3, txn);
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            console.log("res");
            console.log(response.transactions);
            dispatch(listTransactions(response.transactions));
        }
        // let res = await getTransactionsList(3);
        // console.log("res");
        // console.log(res);
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
                    <Paginator active={1} numPages={14}/>
                </div>
                <div className='col col-6'>
                    <div className='d-flex flex-row-reverse'>
                        <button type='submit' className='generer-rapport-button px-5 py-2' onClick={() => handleGenererRapport()}>
                            {ListTransactionsConstants.genererRapport}
                        </button>
                    </div>
                </div>
            </div>
            {/* <Button onClick={() => handleClick()}>Get List</Button> */}
        </div>
      );
}

export default ListTransactions