import React from 'react'
import {Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import './style.css'
import * as constants from '../../services/constants'

function RechercheTransactions() {

    const transactions = useSelector((state) => state.transactions);
    const beneficiaires = Array.from(new Set(transactions.map(transaction => transaction.beneficiaire.nomComplet)));

    const testDate = (e) => {
        console.log(e.target.value);
    }
    
  return (
    <div className='border recherche-section'>
        <Form className='p-3'>
            <div className='row px-3'>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="reference">
                    <Form.Label>{constants.ListTransactionsConstants.reference}</Form.Label>
                    <Form.Control type="text" placeholder="" className='recherche-input' />
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="beneficiaire">
                    <Form.Label>{constants.ListTransactionsConstants.beneficiaire}</Form.Label>
                    <Form.Select className='recherche-input'>
                        <option>-- {constants.ListTransactionsConstants.selectionner} --</option>
                        {
                            beneficiaires.map((beneficiaire) => {
                                return (
                                    <option>-- {beneficiaire} --</option>
                                );
                            } )
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="typeTransaction">
                    <Form.Label>{constants.ListTransactionsConstants.typeTransaction}</Form.Label>
                    <Form.Select className='recherche-input'>
                        <option>-- {constants.ListTransactionsConstants.selectionner} --</option>
                    </Form.Select>
                </Form.Group>
            {/* </div>
            <div className='row'> */}
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="typeProduit">
                    <Form.Label>{constants.ListTransactionsConstants.typeProduit}</Form.Label>
                    <Form.Select className='recherche-input'>
                        <option>-- {constants.ListTransactionsConstants.selectionner} --</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="dateCreation">
                    <Form.Label>{constants.ListTransactionsConstants.dateCreation}</Form.Label>
                    <Form.Control type="date" placeholder="" className='recherche-input' onChange={(e) => testDate(e)}/>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="dateExpiration">
                    <Form.Label>{constants.ListTransactionsConstants.dateExpiration}</Form.Label>
                    <Form.Control type="date" placeholder="" className='recherche-input' />
                </Form.Group>
            </div>
            <div className='d-flex flex-row-reverse'>
                <div className='row px-4'>
                <button type='submit' className='recherche-button reinitialiser-button mx-1 px-4 py-2 col'>
                    {constants.ListTransactionsConstants.reinitialiser}
                </button>
                <button type='submit' className='recherche-button rechercher-button mx-1 px-4 py-2 col'>
                    {constants.ListTransactionsConstants.rechercher}
                </button>
                </div>
                {/* <Button type="submit" className='mx-1 px-3 reinitialiser-button'>
                    {constants.ListTransactionsConstants.reinitialiser}
                </Button>
                <Button variant="primary" type="submit" className='px-3 rechercher-button'>
                    {constants.ListTransactionsConstants.rechercher}
                </Button> */}
            </div>
        </Form>
    </div>
  )
}

export default RechercheTransactions