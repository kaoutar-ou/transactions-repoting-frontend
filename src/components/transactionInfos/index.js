import React, { useEffect, useState } from "react";
import "./style.css";
import TransactionSection from "../transactionSection";
import { useNavigate, useParams } from "react-router-dom";
import * as transactionService from "../../services/transactionService";
import * as pdfTransactionService from "../../services/pdfTransactionService";
import * as constants from "../../services/constants";
import previousIcon from "../../previous-icon.svg";

import * as documentJointService from "../../services/documentJointService";

function TransactionInfos(props) {
  const [transaction, setTransaction] = useState(null);
  const [client, setClient] = useState(null);
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [banqueClient, setBanqueClient] = useState(null);
  const [banqueBeneficiaire, setBanqueBeneficiaire] = useState(null);
  const [documentsJoints, setDocumentsJoints] = useState(null);

  let { id } = useParams();

  let navigate = useNavigate();

  const handleSetInfos = async () => {
    let response = await transactionService.getTransaction(id);
    let res = await documentJointService.listDocumentsJoints(id);

    let transactionResponse;
    let documentsJoints;

    if (
      Object.keys(response.errMsgs).length > 0 ||
      Object.keys(res.errMsgs).length > 0
    ) {
      console.log("response.errMsgs");
    } else {
      transactionResponse = response.transaction;
      documentsJoints = res.documentsJoints;
    }

    let transactionSection = {
      "Référence": transactionResponse.reference,
      "Type de transaction": transactionResponse.typeTransactionValue,
      "Type du payement": transactionResponse.typePayementValue,
      "Type du produit": transactionResponse.typeProduitValue,
      "Date de création": transactionResponse.dateCreationValue,
      "Date d'expiration": transactionResponse.dateExpirationValue,
      "Montant": Number(transactionResponse.montant).toFixed(2),
    };

    let clientSection = {
      "Nom du client": transactionResponse.client.nomComplet,
      "Adresse": transactionResponse.client.address,
      "Compte": transactionResponse.client.account,
    };

    let beneficiaireSection = {
      "Nom du bénéficiaire": transactionResponse.beneficiaire.nomComplet,
      "Adresse": transactionResponse.beneficiaire.address,
      "Compte": transactionResponse.beneficiaire.account,
    };

    let banqueClientSection = {
      "Nom de la banque": transactionResponse.client.banque.nom,
      "Code BIC": transactionResponse.client.banque.codeBIC,
      "Adresse": transactionResponse.client.banque.address,
    };

    let banqueBeneficiaireSection = {
      "Nom de la banque": transactionResponse.beneficiaire.banque.nom,
      "Code BIC": transactionResponse.beneficiaire.banque.codeBIC,
      "Adresse": transactionResponse.beneficiaire.banque.address,
    };

    setTransaction(transactionSection);
    setClient(clientSection);
    setBeneficiaire(beneficiaireSection);
    setBanqueClient(banqueClientSection);
    setBanqueBeneficiaire(banqueBeneficiaireSection);
    setDocumentsJoints(documentsJoints);
  };

  useEffect(() => {
    handleSetInfos();
  }, []);

  const handleGenererRapport = async () => {
    let res = await pdfTransactionService.getPdfTransaction(constants.client_id, id, document);
  };

  return (
    <div className="p-4">
      <div className="row my-3">
        <div className="col col-6">
          <div className="list-head my-5">Informations de transaction</div>
        </div>
        <div className="col col-6 my-5">
          <div className="d-flex flex-row-reverse m-3">
            <img
              width={28}
              src={previousIcon}
              className="previous-icon"
              alt="previous"
              onClick={() => navigate("/")}
            ></img>
          </div>
        </div>
      </div>
      <div className="infos-transaction-container border">
        {transaction ? (
          <TransactionSection title="Transaction" data={transaction} />
        ) : null}
      </div>
      <div className="infos-transaction-container border">
        {client ? <TransactionSection title="Client" data={client} /> : null}
      </div>
      <div className="infos-transaction-container border">
        {beneficiaire ? (
          <TransactionSection title="Bénéficiaire" data={beneficiaire} />
        ) : null}
      </div>
      <div className="infos-transaction-container border">
        {banqueClient ? (
          <TransactionSection title="Banque du client" data={banqueClient} />
        ) : null}
      </div>
      <div className="infos-transaction-container border">
        {banqueBeneficiaire ? (
          <TransactionSection
            title="Banque du bénéficiaire"
            data={banqueBeneficiaire}
          />
        ) : null}
      </div>
      <div className="infos-transaction-container border">
      <div className="infos-container">
                <div className="infos-header p-3">Documents joints</div>
                <div className="infos-content row p-3">
      {(documentsJoints != null && Object.keys(documentsJoints).length > 0) ? (
                    
                        documentsJoints.map(
                            doc => (
                                <>
                                  <div className="col col-12 col-sm-5 col-lg-3 m-3">
                                      {/* <div className="info-heading">Nom</div> */}
                                      <div className="info-description">{doc.name}</div>
                                      <div className="info-description"><a className="document-url" href={doc.url}>Télécharger</a></div>
                                  </div>
                                </>
                            )
                        )
                    
                    ) : <div className="mx-3 m-4 h6">Aucun résultat trouvé !</div>
                  }
                  </div>
              </div>
      </div>
      <div className="row my-3">
        <div className="col col-6"></div>
      </div>

      <div className="row my-3">
        <div className="col col-6"></div>
        <div className="col col-6">
          <div className="d-flex flex-row-reverse">
            <button
              type="submit"
              className="generer-rapport-button px-5 py-2"
              onClick={() => handleGenererRapport()}
            >
              {constants.ListTransactionsConstants.telechargerRapport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfos;
