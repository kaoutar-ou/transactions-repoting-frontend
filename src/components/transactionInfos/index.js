import React, { useEffect, useState } from "react";
import "./style.css";
import * as constants from "../../services/constants"
import TransactionSection from "../transactionSection";
import { useParams } from 'react-router-dom'

function TransactionInfos(props) {
    const [transaction, setTransaction] = useState({});
    const [client, setClient] = useState({});
    const [beneficiaire, setBeneficiaire] = useState({});
    const [banqueClient, setBanqueClient] = useState({});
    const [banqueBeneficiaire, setBanqueBeneficiaire] = useState({});

    let { id } = useParams();
    console.log(id)

    const handleSetInfos = () => {
        let response
        let transactionSection = {
            reference: response.reference,
            typeTransaction: response.typeTransaction,
            typePayement: response.typePayement,
            typeProduit: response.typeProduit,
            dateCreation: response.dateCreation,
            dateExpiration: response.dateExpiration,
            montant: response.montant
        }

        let clientSection = {
            nomComplet: response.client.nomComplet,
            addresse: response.client.addresse,
            compte: response.client.compte
        }

        let beneficiaireSection = {
            nomComplet: response.beneficiaire.nomComplet,
            addresse: response.beneficiaire.addresse,
            compte: response.beneficiaire.compte
        }

        let banqueClientSection = {
            codeBIC: response.client.banque.codeBIC,
            nom: response.client.banque.nom,
            adresse: response.client.banque.adresse
        }

        let banqueBeneficiaireSection = {
            codeBIC: response.beneficiaire.banque.codeBIC,
            nom: response.beneficiaire.banque.nom,
            adresse: response.beneficiaire.banque.adresse
        }

        setTransaction(transactionSection)
        setClient(clientSection)
        setBeneficiaire(beneficiaireSection)
        setBanqueClient(banqueClientSection)
        setBanqueBeneficiaire(banqueBeneficiaireSection)
    }

    useEffect(() => {
        handleSetInfos()
    }, []);

  return (
    <div className="p-4">
        {/* {id} */}
      <div className="list-head my-5">Transaction {props.reference}</div>
      <div className="list-container">
        <div className="infos-transaction-container border">
            {/* <div className="infos-container">
                <div className="infos-header p-3">Transaction</div>
                <div className="infos-content row p-3">
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                    <div className="col col-12 col-sm-6 col-lg-4">
                        <div className="info-heading">Test</div>
                        <div className="info-description">test</div>
                    </div>
                </div>
            </div> */}
            <TransactionSection title="Transaction" data={transaction}/>
            <TransactionSection title="Client" data={client}/>
            <TransactionSection title="Bénéficiaire" data={beneficiaire}/>
            <TransactionSection title="Banque du client"  data={banqueClient}/>
            <TransactionSection title="Banque du bénéficiaire"  data={banqueBeneficiaire}/>
        </div>
      </div>
      <div className="row my-3">
        <div className="col col-6"></div>
      </div>
    </div>
  );
}

export default TransactionInfos;
