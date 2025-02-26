import Currency from './lib/Currency';
import { IWithResult } from './lib/IWithResult';

type StringOfLength<Min, Max> = string & {
    min: Min;
    max: Max;
    readonly StringOfLength: unique symbol; // this is the phantom type
};

// This is a type guard function which can be used to assert that a string
// is of type StringOfLength<Min,Max>
const isStringOfLength = <Min extends number, Max extends number>(
    str: string,
    min: Min,
    max: Max
): str is StringOfLength<Min, Max> => str.length >= min && str.length <= max;

// type constructor function
export const stringOfLength = <Min extends number, Max extends number>(
    input: unknown,
    min: Min,
    max: Max
): StringOfLength<Min, Max> => {
    if (typeof input !== 'string') {
        throw new Error('invalid input');
    }

    if (!isStringOfLength(input, min, max)) {
        throw new Error('input is not between specified min and max');
    }

    return input; // the type of input here is now StringOfLength<Min,Max>
};

type Convenzione = number;
type Lotto = string;
type CartaIntestata = string;
type LogoBollettino = string;
type TipoLotto = 'UN';
type Bollettino = 'BOLPEUR5' | 'BOLEUR5';
type BollettinoType = 'CEE896SI';
type Prio = 'PRIO' | 'P4P';

interface HeaderParams {
    responsabile: string;
    telefono: string;
    fax: string;
    mail: string;
    prio?: Prio;
    idConvenzione: Convenzione;
    lotto: Lotto;
    tipoLotto?: TipoLotto;
    bollettino?: Bollettino;
    bollettinoType?: BollettinoType;
    cartaIntestata: CartaIntestata;
    logoBollettino: LogoBollettino;
}

interface AddressParams {
    header?: string;
    nominativo: string;
    indirizzo: string;
    civico: string;
    localita?: string;
    cap: string;
    comune: string;
    provincia: string;
    id: string;
    fiscalCode: string;
}

interface CommParams {
    amount: Currency;
    invoiceId: string;
    invoiceDate: Date;
    installment: number;
    expiration: Date;
}

interface BankAccount {
    name: string;
    cc: string;
    iban: string;
}

type MissiveBodyText = IWithResult;

type PostelRowPosition = {
    type: 'rel' | 'abs' | 'bot';
    value?: number;
};

type PostelRowConstructor = PostelRowPosition;

export {
    HeaderParams,
    Convenzione,
    Lotto,
    TipoLotto,
    Bollettino,
    Prio,
    CartaIntestata,
    BollettinoType,
    LogoBollettino,
    AddressParams,
    CommParams,
    BankAccount,
    MissiveBodyText,
    PostelRowPosition,
    PostelRowConstructor
};
