import { IWithResult } from './lib/IWithResult';

type Brand<K, T> = K & { __brand: T };

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

//type Convenzione = Brand<StringOfLength<7, 7>, 'convenzione'>;
type Convenzione = Brand<number, 'convenzione'>;
type Grafico = Brand<string, 'grafico'>;
type CartaIntestata = Brand<string, 'cintestata'>;
type LogoBollettino = Brand<string, 'logob'>;
type Bollettino = 'BOLPEUR5' | 'BOLEUR5';
type BollettinoType = 'CEE896SI';
type Prio = 'PRIO' | 'P4P';

interface HeaderParameters {
    responsabile: string;
    telefono: string;
    fax: string;
    mail: string;
    prio?: Prio;
    idConvenzione: Convenzione;
    grafico: Grafico;
    bollettino?: Bollettino;
    bollettinoType?: BollettinoType;
    cartaIntestata: CartaIntestata;
    logoBollettino: LogoBollettino;
}

interface AddressParameters {
    header?: string;
    nominativo: string;
    indirizzo: string;
    civico: string;
    localita?: string;
    cap: string;
    comune: string;
    provincia: string;
    id: string;
}

type MissiveBodyText = IWithResult;

type MissiveBodyRowPosition = {
    type: 'rel' | 'abs';
    value: number;
};

export {
    HeaderParameters,
    Convenzione,
    Grafico,
    Bollettino,
    Prio,
    CartaIntestata,
    BollettinoType,
    LogoBollettino,
    AddressParameters,
    MissiveBodyText,
    MissiveBodyRowPosition
};
