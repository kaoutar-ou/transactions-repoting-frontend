import React, { useEffect, useState } from "react";
import "./style.css";
import TransactionSection from "../transactionSection";
import { useNavigate, useParams } from "react-router-dom";
import * as transactionService from "../../services/transactionService";
import * as pdfTransactionService from "../../services/pdfTransactionService";
import { ListTransactionsConstants } from "../../services/constants";
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

    // let response
    let transactionSection = {
      reference: transactionResponse.reference,
      typeTransaction: transactionResponse.typeTransactionValue,
      typePayement: transactionResponse.typePayementValue,
      typeProduit: transactionResponse.typeProduitValue,
      dateCreation: transactionResponse.dateCreationValue,
      dateExpiration: transactionResponse.dateExpirationValue,
      montant: Number(transactionResponse.montant).toFixed(2),
    };

    let clientSection = {
      nomComplet: transactionResponse.client.nomComplet,
      addresse: transactionResponse.client.address,
      compte: transactionResponse.client.account,
    };

    let beneficiaireSection = {
      nomComplet: transactionResponse.beneficiaire.nomComplet,
      addresse: transactionResponse.beneficiaire.address,
      compte: transactionResponse.beneficiaire.account,
    };

    let banqueClientSection = {
      codeBIC: transactionResponse.client.banque.codeBIC,
      nom: transactionResponse.client.banque.nom,
      adresse: transactionResponse.client.banque.address,
    };

    let banqueBeneficiaireSection = {
      codeBIC: transactionResponse.beneficiaire.banque.codeBIC,
      nom: transactionResponse.beneficiaire.banque.nom,
      adresse: transactionResponse.beneficiaire.banque.address,
    };

    console.log(documentsJoints)


    // let documentsJointsSection = Array.from(documentsJoints).forEach(documentJoint => return {
   
    //         "Nom": documentJoint.name,
    //         "Size": documentJoint.name,
    //         "Type": documentJoint.name,
    //         "URL du téléchargement": documentJoint.name
    //         }
    //     );

        // console.log(documentsJointsSection)

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
    let res = await pdfTransactionService.getPdfTransaction(3, id, document);
  };

  return (
    <div className="p-4">
      <div className="row my-3">
        <div className="col col-6">
          <div className="list-head my-5">Informations du transaction</div>
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
      {documentsJoints ? (
      <div className="infos-container">
                <div className="infos-header p-3">Documents joints</div>
                <div className="infos-content row p-3">
                    {/* {
                        documentsJoints.map(
                            doc => (
                                <div>{doc.name}</div>
                            )
                        )
                    } */}
                    {
                        documentsJoints.map(
                            doc => (
                                <>
                                <div className="col col-12 col-sm-5 col-lg-3 m-3">
                                    <div className="info-heading">Nom :</div>
                                    <div className="info-description">{doc.name}</div>
                                    <div className="info-description"><a className="document-url" href={doc.url}>Télécharger</a></div>
                                </div>
                                {/* <div className="col col-12 col-sm-5 col-lg-3 m-3">
                                    <div className="info-heading">Nom2 :</div>
                                    <div className="info-description">{doc.name}</div>
                                </div>
                                <div className="col col-12 col-sm-5 col-lg-3 m-3">
                                    <div className="info-heading">Nom3 :</div>
                                    <div className="info-description">{doc.name}</div>
                                </div> */}
                                </>
                            )
                        )
                    }
                    {/* {Object.keys(documentsJoints)[0]} */}
                    {/* {
                        Object.entries(documentsJoints).map((value, index) => {
                            return (
                                <div className="col col-12 col-sm-5 col-lg-3 m-3">
                                    <div className="info-heading">{value[0]}</div>
                                    <div className="info-description">{value[1]}</div>
                                </div>
                            )
                        })
                    } */}
                </div>
            </div>
            ) : null}
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
              {ListTransactionsConstants.genererRapport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfos;
