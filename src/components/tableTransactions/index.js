import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import viewIcon from "../../view-icon.svg";
import downloadIcon from "../../download-icon.svg";

import "./style.css";
import * as constants from "../../services/constants";
import * as pdfTransactionService from "../../services/pdfTransactionService";
import { useNavigate } from "react-router-dom";

function TableTransactions() {
  const transactions = useSelector((state) => state.transactions);

  let navigate = useNavigate();

  const handleViewTransactionClick = (transaction_id) => {
    navigate("/transactions/" + transaction_id);
  };

  const handleDownloadTransactionClick = async (transaction_id) => {
    let res = await pdfTransactionService.getPdfTransaction(
      constants.client_id,
      transaction_id,
      document
    );
  };

  return (
    <div className="table-container border">
      <Table responsive>
        <thead>
          <tr>
            {Object.values(constants.TableTransactionsColumns).map(
              (value, index) => {
                return (
                  <th key={index} className="p-3 table-head">
                    {value}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        {(transactions !== undefined && Object.keys(transactions).length >= 1) ? (
          <tbody>
            {transactions.map((transaction) => {
              const {
                id,
                reference,
                beneficiaire,
                typeTransactionValue,
                typePayementValue,
                typeProduitValue,
                dateCreation,
                dateExpiration,
              } = transaction;

              const montant = Number(transaction.montant).toFixed(2)
              return (
                <tr key={transaction.id}>
                  <td className="p-3">{reference}</td>
                  <td className="p-3">{beneficiaire.nomComplet}</td>
                  <td className="p-3">{typeTransactionValue}</td>
                  <td className="p-3">{typePayementValue}</td>
                  <td className="p-3">{typeProduitValue}</td>
                  <td className="p-3">{dateCreation.substring(0, 10)}</td>
                  <td className="p-3">{dateExpiration.substring(0, 10)}</td>
                  <td className="p-3">{montant}</td>
                  <td className="pt-3 pb-3 text-center">
                    <img
                      className="view-icon"
                      src={viewIcon}
                      alt="view"
                      onClick={() => handleViewTransactionClick(id)}
                    />
                    <img
                      className="view-icon"
                      src={downloadIcon}
                      alt="download"
                      onClick={() => handleDownloadTransactionClick(id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </Table>
      {(transactions === undefined || Object.keys(transactions).length < 1) ? (
          <div className="mx-3 mb-4 h5">Aucun résultat trouvé !</div>
        ) : null}
    </div>
  );
}

export default TableTransactions;
