import { AddressParams, CommParams, BankAccount } from '../src/types';

const addressParams: AddressParams = {
    nominativo: 'Paolino Paperino',
    indirizzo: 'Via dei paperi',
    civico: '3/A',
    cap: '98765',
    comune: 'Paperopoli',
    provincia: 'PP',
    id: '123456'
};

const commParams: CommParams = {
    amount: '68,46'
};

const bankAccount: BankAccount = {
    name: 'PAPERINO SRL',
    cc: '75673245',
    iban: 'IT92W0300203280816659218681'
};

const paymentParams = {
    address: addressParams,
    comm: commParams,
    bank: bankAccount
};

export { paymentParams };
