import React, { useState, useEffect, useRef } from 'react'
import {Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import * as beneficiaireService from "../../services/beneficiaireService"
import * as transactionService from "../../services/transactionService"
import { listTransactions } from "../../services/actions/transactionActions";

import './style.css'
import * as constants from '../../services/constants'

function RechercheTransactions() {

    const transactions = useSelector((state) => state.transactions);

    const referenceRef = useRef();
    const beneficiaireRef = useRef();
    const typeTransactionRef = useRef();
    const typeProduitRef = useRef();
    const dateCreationRef = useRef();
    const dateExpirationRef = useRef();

    const [beneficiaires, setBeneficiaires] = useState({});

    const dispatch = useDispatch();

    const getBeneficiaires = async () => {
        const response = await beneficiaireService.listBeneficiairesByClient(3);
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            let listBeneficiaires = Array.from(response.beneficiaires)
            setBeneficiaires(listBeneficiaires);
        }
    }

    useEffect(() => {
        getBeneficiaires();
    }, []);

    const testDate = (e) => {
        console.log(e.target.value);
    }

    const handleRechercheClick = async (e) => {
        e.preventDefault()
        // console.log(transactions)
        let txn = {
            reference : (referenceRef.current.value !== "") ? referenceRef.current.value : null,
            typeTransaction : (typeTransactionRef.current.value !== "") ? typeTransactionRef.current.value : null,
            typeProduit : (typeProduitRef.current.value !== "") ? typeProduitRef.current.value : null,
            dateExpiration : (dateExpirationRef.current.value !== "") ? dateExpirationRef.current.value : null,
            dateCreation : (dateCreationRef.current.value !== "") ? dateCreationRef.current.value : null,
            beneficiaire_id : (beneficiaireRef.current.value !== "") ? beneficiaireRef.current.value : null
        }

        console.log("txn")
        console.log(txn)

        const response = await transactionService.searchTransactions(3, txn);
        // const response = await transactionService.searchTransactions(3, txn, 1);
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            console.log("res");
            console.log(response.transactions);
            dispatch(listTransactions(response.transactions));
            // dispatch(listTransactions(response.transactions.content));
        }
        // let res = await getTransactionsList(3);
        // console.log("res");
        // console.log(res);
    }
    
  return (
    <div className='border recherche-section'>
        <Form className='p-3'>
            <div className='row px-3'>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="reference">
                    <Form.Label>{constants.ListTransactionsConstants.reference}</Form.Label>
                    <Form.Control type="text" placeholder="" className='recherche-input' ref={referenceRef}/>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="beneficiaire">
                    <Form.Label>{constants.ListTransactionsConstants.beneficiaire}</Form.Label>
                    <Form.Select className='recherche-input' onClick={(e) => getBeneficiaires(e)} ref={beneficiaireRef}>
                        <option value={""}>-- {constants.ListTransactionsConstants.selectionner} --</option>
                        {
                        (beneficiaires && Object.keys(beneficiaires).length >= 1) ?
                        (
                            beneficiaires.map((beneficiaire) => {
                                return (
                                    <option key={beneficiaire.id} value={beneficiaire.id}>{beneficiaire.nomComplet}</option>
                                )
                            } )
                        ) : (
                            null
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="typeTransaction">
                    <Form.Label>{constants.ListTransactionsConstants.typeTransaction}</Form.Label>
                    <Form.Select className='recherche-input' ref={typeTransactionRef}>
                        <option value={""}>-- {constants.ListTransactionsConstants.selectionner} --</option>
                        {
                            Object.entries(constants.TypeTransaction).map((value, index) => {
                                return (
                                    <option key={value[0]} value={value[0]}>{value[1]}</option>
                                )
                            })
                        }
                    </Form.Select>
                </Form.Group>
            {/* </div>
            <div className='row'> */}
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="typeProduit">
                    <Form.Label>{constants.ListTransactionsConstants.typeProduit}</Form.Label>
                    <Form.Select className='recherche-input' ref={typeProduitRef}>
                        <option value={""}>-- {constants.ListTransactionsConstants.selectionner} --</option>
                        {
                            Object.entries(constants.typeProduit).map((value, index) => {
                                return (
                                    <option key={value[0]} value={value[0]}>{value[1]}</option>
                                )
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="dateCreation">
                    <Form.Label>{constants.ListTransactionsConstants.dateCreation}</Form.Label>
                    <Form.Control type="date" placeholder="" className='recherche-input' onChange={(e) => testDate(e)} ref={dateCreationRef}/>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="dateExpiration">
                    <Form.Label>{constants.ListTransactionsConstants.dateExpiration}</Form.Label>
                    <Form.Control type="date" placeholder="" className='recherche-input' ref={dateExpirationRef}/>
                </Form.Group>
            </div>
            <div className='d-flex flex-row-reverse'>
                <div className='row px-4'>
                <button type='submit' className='recherche-button reinitialiser-button mx-1 px-4 py-2 col'>
                    {constants.ListTransactionsConstants.reinitialiser}
                </button>
                <button type='submit' className='recherche-button rechercher-button mx-1 px-4 py-2 col' onClick={(e) => handleRechercheClick(e)}>
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