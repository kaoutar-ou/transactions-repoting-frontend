import React from 'react'
import {Table, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

function TableTransactions() {
    const tableColumns = {reference:"Reference", 
                        // client:"Client", 
                        beneficiaire:"Bénéficiaire", 
                        typeTransaction:"Type de transaction", 
                        typePayement:"Type du payement", 
                        typeProduit:"Type du produit", 
                        dateCreation:"Date de création", 
                        dateExpiration:"Date d'expiration", 
                        montant:"Montant"};
    
    const transactions = useSelector((state) => state.transactions);
  return (
    <Table responsive>
            <thead>
                <tr>
                {/* <th>#</th> */}
                {
                    Object.values(tableColumns).map((value, index) => {
                        return <th key={index}>{value}</th>
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    (transactions !== undefined) ? (
                    transactions.map((transaction) => {
                        const {reference, beneficiaire, typeTransaction, typePayement, typeProduit, dateCreation, dateExpiration, montant} = transaction;
            
                        return <tr key={transaction.id}>
                            <td>{reference}</td>
                            <td>{beneficiaire.nomComplet}</td>
                            <td>{typeTransaction}</td>
                            <td>{typePayement}</td>
                            <td>{typeProduit}</td>
                            <td>{dateCreation}</td>
                            <td>{dateExpiration}</td>
                            <td>{montant}</td>
                        </tr>
                    })) : null
                }
                <tr>
                </tr>
            </tbody>
            </Table>
  )
}

export default TableTransactions