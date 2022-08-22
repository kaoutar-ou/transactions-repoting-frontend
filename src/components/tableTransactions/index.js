import React from 'react'
import {Table, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import viewIcon from '../../view-icon.svg';
import downloadIcon from '../../download-icon.svg';

import './style.css';
import * as constants from '../../services/constants'
import * as pdfTransactionService from "../../services/pdfTransactionService"

function TableTransactions() {
    
    const transactions = useSelector((state) => state.transactions);

    const handleViewTransactionClick = (transaction_id) => {
        console.log(transaction_id)
    }

    const handleDownloadTransactionClick = async (transaction_id) => {
        console.log(transaction_id)
        let res = await pdfTransactionService.getPdfTransaction(3, transaction_id, document);
    }

  return (
    <div className='table-container border'>
        <Table responsive>
            <thead>
                <tr>
                {/* <th>#</th> */}
                {
                    Object.values(constants.TableTransactionsColumns).map((value, index) => {
                        return <th key={index} className='p-3 table-head'>{value}</th>
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    (transactions !== undefined) ? (
                    transactions.map((transaction) => {
                        const {id, reference, beneficiaire, typeTransaction, typePayement, typeProduit, dateCreation, dateExpiration, montant} = transaction;
            
                        return <tr key={transaction.id}>
                            <td className='p-3'>{reference}</td>
                            <td className='p-3'>{beneficiaire.nomComplet}</td>
                            <td className='p-3'>{typeTransaction}</td>
                            <td className='p-3'>{typePayement}</td>
                            <td className='p-3'>{typeProduit}</td>
                            <td className='p-3'>{dateCreation.substring(0,10)}</td>
                            <td className='p-3'>{dateExpiration.substring(0,10)}</td>
                            <td className='p-3'>{montant}</td>
                            <td className='pt-3 pb-3 text-center'>
                                <img className='view-icon' src={viewIcon} alt="view" onClick={() => handleViewTransactionClick(id)}/>
                                <img className='view-icon' src={downloadIcon} alt="download" onClick={() => handleDownloadTransactionClick(id, )}/>
                            </td>
                        </tr>
                    })) : null
                }
            </tbody>
        </Table>
            {/* <div className='d-flex flex-row-reverse px-3'>
                <button type='submit' className='generer-rapport-button mx-3 px-4 py-2 mb-3'>
                    {ListTransactionsConstants.genererRapport}
                </button>
            </div> */}
            </div>
  )
}

export default TableTransactions