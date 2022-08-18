import React, { useEffect } from 'react'
import {Table, Button} from 'react-bootstrap';
import { getTransactionsList, searchTransactions } from "../../services/transactionService"
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../../services/actions/transactionActions";
import TableTransactions from '../tableTransactions';

function ListTransactions() {

    const transactions = useSelector((state) => state.transactions);

    const dispatch = useDispatch();

    const getTransactions = async () => {
        const response = await getTransactionsList(3);
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

        const response = await searchTransactions(3, txn);
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
        <>
            <TableTransactions />  
            <Button onClick={() => handleClick()}>Get List</Button>
        </>
      );
}

export default ListTransactions