import React, { useEffect, useState } from "react";
import "./style.css";
import TransactionSection from "../transactionSection";
import { useNavigate, useParams } from 'react-router-dom'
import * as transactionService from "../../services/transactionService"
import * as pdfTransactionService from "../../services/pdfTransactionService";
import { ListTransactionsConstants } from '../../services/constants';
import previousIcon from "../../previous-icon.svg";

function TransactionInfos(props) {
    const [transaction, setTransaction] = useState(null);
    const [client, setClient] = useState(null);
    const [beneficiaire, setBeneficiaire] = useState(null);
    const [banqueClient, setBanqueClient] = useState(null);
    const [banqueBeneficiaire, setBanqueBeneficiaire] = useState(null);

    let { id } = useParams();

    let navigate = useNavigate();

    const handleSetInfos = async () => {

        let response = await transactionService.getTransaction(id);

        let transactionResponse

        if (Object.keys(response.errMsgs).length > 0 ) {
            console.log("response.errMsgs");
        }
        else {
            transactionResponse = response.transaction
        }

        // let response
        let transactionSection = {
            reference: transactionResponse.reference,
            typeTransaction: transactionResponse.typeTransactionValue,
            typePayement: transactionResponse.typePayementValue,
            typeProduit: transactionResponse.typeProduitValue,
            dateCreation: transactionResponse.dateCreationValue,
            dateExpiration: transactionResponse.dateExpirationValue,
            montant: Number(transactionResponse.montant).toFixed(2)
        }

        let clientSection = {
            nomComplet: transactionResponse.client.nomComplet,
            addresse: transactionResponse.client.address,
            compte: transactionResponse.client.account
        }

        let beneficiaireSection = {
            nomComplet: transactionResponse.beneficiaire.nomComplet,
            addresse: transactionResponse.beneficiaire.address,
            compte: transactionResponse.beneficiaire.account
        }

        let banqueClientSection = {
            codeBIC: transactionResponse.client.banque.codeBIC,
            nom: transactionResponse.client.banque.nom,
            adresse: transactionResponse.client.banque.address
        }

        let banqueBeneficiaireSection = {
            codeBIC: transactionResponse.beneficiaire.banque.codeBIC,
            nom: transactionResponse.beneficiaire.banque.nom,
            adresse: transactionResponse.beneficiaire.banque.address
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

    const handleGenererRapport = async () => {
        let res = await pdfTransactionService.getPdfTransaction(
          3,
          id,
          document
        );
      };

  return (
    <div className="p-4">
      
      
      <div className='row my-3'>
                <div className='col col-6'>
                <div className="list-head my-5">Informations du transaction</div>
                </div>
                <div className='col col-6 my-5'>
                    <div className='d-flex flex-row-reverse m-3'>
                    {/* <button className=""
      onClick={() => navigate("/")}>
        return
      </button> */}
      <img width={28} src={previousIcon} className="previous-icon" alt="previous" onClick={() => navigate("/")}></img>
                    </div>
                </div>
            </div>
        <div className="infos-transaction-container border">
            {
                (transaction) ? (
                    <TransactionSection title="Transaction" data={transaction}/>
                ) : null
            }
            </div>
            <div className="infos-transaction-container border">
            {
                (client) ? (
                    <TransactionSection title="Client" data={client}/>
                ) : null
            }
            </div>
            <div className="infos-transaction-container border">
            {
                (beneficiaire) ? (
                    <TransactionSection title="Bénéficiaire" data={beneficiaire}/>
                ) : null
            }
            </div>
            <div className="infos-transaction-container border">
            {
                (banqueClient) ? (
                    <TransactionSection title="Banque du client"  data={banqueClient}/>
                ) : null
            }
            </div>
            <div className="infos-transaction-container border">
            {
                (banqueBeneficiaire) ? (
                    <TransactionSection title="Banque du bénéficiaire"  data={banqueBeneficiaire}/>
                ) : null
            }
        </div>
      <div className="row my-3">
        <div className="col col-6"></div>
      </div>

      <div className='row my-3'>
                <div className='col col-6'>
                </div>
                <div className='col col-6'>
                    <div className='d-flex flex-row-reverse'>
                        <button type='submit' className='generer-rapport-button px-5 py-2' onClick={() => handleGenererRapport()}>
                            {ListTransactionsConstants.genererRapport}
                        </button>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default TransactionInfos;
