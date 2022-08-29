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

export const typesProduit = {
    Import:"IMPORT",
    Export:"EXPORT"
}

export const transactionInfosSections = {
    TRANSACTION:"Transaction",
    CLIENT:"Client",
    BENEFICIAIRE:"Bénéficiaire",
    BANQUE_CLIENT:"Banque du client",
    BANQUE_BENEFICIAIRE:"Banque du bénéficiaire"
}

export const transactionInfos = {
    RESERENCE:"Reference",
    TYPE_TRANSACTION:"Type de transaction", 
    TYPE_PAYEMENT:"Type du payement", 
    TYPE_PRODUIT:"Type du produit", 
    DATE_CREATION:"Date de création", 
    DATE_EXPIRATION:"Date d'expiration", 
    MONTANT:"Montant",
}

export const clientInfos = {
    NOM:"Nom du client",
    ADRESSE:"Adresse", 
    COMPTE:"Compte",
}

export const beneficiaireInfos = {
    NOM:"Nom du bénéficiaire",
    ADRESSE:"Adresse", 
    COMPTE:"Compte",
}

export const banqueClientInfos = {
    NOM:"Nom de la banque",
    CODE_BIC:"Code BIC",
    ADRESSE:"Adresse", 
}

export const banqueBeneficiaireInfos = {
    NOM:"Nom de la banque",
    CODE_BIC:"Code BIC",
    ADRESSE:"Adresse", 
}

export const typeCodification = {
    TYPE_TRANSACTION:"TYPE_TRANSACTION",
    TYPE_PRODUIT:"TYPE_PRODUIT"
}