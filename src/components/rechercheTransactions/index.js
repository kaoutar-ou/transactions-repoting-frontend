import React, { useState, useEffect, useRef } from 'react'
import {Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import * as beneficiaireService from "../../services/beneficiaireService"
import * as transactionService from "../../services/transactionService"
import { listTransactions } from "../../services/actions/transactionActions";

import * as codificationService from "../../services/codificationService";

import './style.css'
import * as constants from '../../services/constants'

function RechercheTransactions(props) {

    const transactions = useSelector((state) => state.transactions);

    const referenceRef = useRef();
    const beneficiaireRef = useRef();
    const typeTransactionRef = useRef();
    const typeProduitRef = useRef();
    const dateCreationRef = useRef();
    const dateExpirationRef = useRef();

    const [beneficiaires, setBeneficiaires] = useState({});
    const [typesTransactions, setTypesTransactions] = useState({});
    const [typesProduits, setTypesProduits] = useState({});

    const dispatch = useDispatch();

    const getBeneficiaires = async () => {
        if(Object.keys(beneficiaires).length <= 0) {
        const response = await beneficiaireService.listBeneficiairesByClient(3);
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            let listBeneficiaires = Array.from(response.beneficiaires)
            setBeneficiaires(listBeneficiaires);
        }
    }
}

    const getTypesTransactions = async () => {
        if(Object.keys(typesTransactions).length <= 0) {

        const response = await codificationService.listTypeTransaction()
        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            let listTypesTransactions = Array.from(response.typesTransactions)
            setTypesTransactions(listTypesTransactions);
        }
    }
}

    const getTypesProduits = async () => {
        if(Object.keys(typesProduits).length <= 0) {
            const response = await codificationService.listTypeProduit()
            if (Object.keys(response.errMsgs).length > 0 ) {
                console.log("response.errMsgs");
            }
            else {
                let listTypesProduits = Array.from(response.typesProduits)
                setTypesProduits(listTypesProduits);
            }
        }
    }

    useEffect(() => {
        getBeneficiaires();
        getTypesTransactions();
        getTypesProduits();
    }, []);

    const handleRechercheClick = async (e) => {
        e.preventDefault()

        let transactionObject = {
            reference : (referenceRef.current.value !== "") ? referenceRef.current.value : null,
            typeTransaction : (typeTransactionRef.current.value !== "") ? typeTransactionRef.current.value : null,
            typeProduit : (typeProduitRef.current.value !== "") ? typeProduitRef.current.value : null,
            dateExpiration : (dateExpirationRef.current.value !== "") ? dateExpirationRef.current.value : null,
            dateCreation : (dateCreationRef.current.value !== "") ? dateCreationRef.current.value : null,
            beneficiaire_id : (beneficiaireRef.current.value !== "") ? beneficiaireRef.current.value : null
        }

            props.handleSetTransactionObject(transactionObject)
            props.handlePagination(0)
    }
    
    const handleReinitialiserClick = (e) => {
        e.preventDefault()
        props.handleSetTransactionObject(null)
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
                        (typesTransactions && Object.keys(typesTransactions).length >= 1) ?
                        (
                            typesTransactions.map((typeTransaction) => {
                                return (
                                    <option key={typeTransaction.libelle} value={typeTransaction.libelle}>{constants.TypeTransaction[typeTransaction.libelle]}</option>
                                )
                            } )
                        ) : (
                            null
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="typeProduit">
                    <Form.Label>{constants.ListTransactionsConstants.typeProduit}</Form.Label>
                    <Form.Select className='recherche-input' ref={typeProduitRef}>
                        <option value={""}>-- {constants.ListTransactionsConstants.selectionner} --</option>
                        {
                        (typesProduits && Object.keys(typesProduits).length >= 1) ?
                        (
                            typesProduits.map((typeProduit) => {
                                return (
                                    <option key={typeProduit.libelle} value={typeProduit.libelle}>{constants.typeProduit[typeProduit.libelle]}</option>
                                )
                            } )
                        ) : (
                            null
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="dateCreation">
                    <Form.Label>{constants.ListTransactionsConstants.dateCreation}</Form.Label>
                    <Form.Control type="date" placeholder="" className='recherche-input' ref={dateCreationRef}/>
                </Form.Group>
                <Form.Group className="mb-3 col col-12 col-sm-6 col-lg-4" controlId="dateExpiration">
                    <Form.Label>{constants.ListTransactionsConstants.dateExpiration}</Form.Label>
                    <Form.Control type="date" placeholder="" className='recherche-input' ref={dateExpirationRef}/>
                </Form.Group>
            </div>
            <div className='d-flex flex-row-reverse'>
                <div className='row px-4'>
                <button type='submit' className='recherche-button reinitialiser-button mx-1 px-4 py-2 col' onClick={(e) => handleReinitialiserClick(e)}>
                    {constants.ListTransactionsConstants.reinitialiser}
                </button>
                <button type='submit' className='recherche-button rechercher-button mx-1 px-4 py-2 col' onClick={(e) => handleRechercheClick(e)}>
                    {constants.ListTransactionsConstants.rechercher}
                </button>
                </div>
            </div>
        </Form>
    </div>
  )
}

export default RechercheTransactions