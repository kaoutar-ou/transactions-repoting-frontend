export const TransactionActionTypes = {
    LIST_TRANSACTIONS: 'LIST_TRANSACTIONS',
}

export const ListTransactionsConstants = {
    reference:"Reference",
    beneficiaire:"Bénéficiaire", 
    typeTransaction:"Type de transaction",
    typeProduit:"Type du produit", 
    dateCreation:"Date de création", 
    dateExpiration:"Date d'expiration",
    reinitialiser:"Réinitialiser",
    rechercher:"Rechercher",
    selectionner:"Séléctionner",
    genererRapport:"Générer le rapport"
}

export const TableTransactionsColumns = {
    reference:"Reference", 
    // client:"Client", 
    beneficiaire:"Bénéficiaire", 
    typeTransaction:"Type de transaction", 
    typePayement:"Type du payement", 
    typeProduit:"Type du produit", 
    dateCreation:"Date de création", 
    dateExpiration:"Date d'expiration", 
    montant:"Montant",
    actions:"Actions"
};

export const TypeTransaction = {
    EMISSION:"Emission",
    MODIFICATION:"Modification",
    AMENDEMENT:"Amendement",
    UTILISATION_A_VUE:"Utilisation à vue",
    UTILISATION_A_ECHEANCE:"Utilisation à échéance",
    MESSAGE:"Message"
}

export const typeProduit = {
    IMPORT:"Import",
    EXPORT:"Export"
}