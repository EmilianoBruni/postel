import Currency from '../src/lib/Currency';
import {
    AddressParams,
    CommParams,
    BankAccount,
    HeaderParams,
    CartaIntestata,
    Convenzione,
    Grafico,
    LogoBollettino
} from '../src/types';

const headerParams: HeaderParams = {
    responsabile: 'Paolino Paperino',
    telefono: '+3978678676',
    fax: '+3978687687',
    mail: 'paolino@paperino.it',
    idConvenzione: 188778 as Convenzione,
    grafico: 'FT56666AGG' as Grafico,
    cartaIntestata: 'JRRY6678' as CartaIntestata,
    logoBollettino: 'KU66758' as LogoBollettino
};

const addressParams: AddressParams = {
    nominativo: 'Paolino Paperino',
    indirizzo: 'Via dei paperi',
    civico: '3/A',
    cap: '98765',
    comune: 'Paperopoli',
    provincia: 'PP',
    id: '46692'
};

const commParams: CommParams = {
    amount: new Currency(68.46),
    invoiceId: '75821',
    invoiceDate: new Date('2023-04-17T12:00:00'),
    installment: 0
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

export { paymentParams, headerParams };
