import Postel from '../src';
import Payment from '../src/lib/Payment';
import Address from '../src/lib/Address';
import Lang from '../src/lib/Lang';
import * as Typ from '../src/types';
import Missive from '../src/lib/Missive';

let postel: Postel;

beforeAll(() => {
    postel = new Postel();
});

afterAll(() => console.log(postel.result()));

test('I want a class to be defined', () => {
    expect(postel).toBeDefined();
});

test('Has a method that produce output', () => {
    expect(typeof postel.result).toBe('function');
});

test('Has an header class', () => {
    expect(postel.header).toBeDefined();
});

describe('Header tests', () => {
    const headerParams: Typ.HeaderParameters = {
        responsabile: 'Monica Di Girolamo',
        telefono: '+390854315192',
        fax: '+39085199449777',
        mail: 'monica@micso.it',
        idConvenzione: 7433 as Typ.Convenzione,
        grafico: 'FT26043FUN' as Typ.Grafico,
        cartaIntestata: 'FATA27490' as Typ.CartaIntestata,
        logoBollettino: 'LA02749' as Typ.LogoBollettino
    };
    let hr: string[];
    beforeAll(() => {
        postel.header.init(headerParams);
        hr = postel.header.result().split(Lang.EOL);
    });

    test('Header start with :R: record', () => {
        expect(hr[0].startsWith(':R:')).toBeTruthy();
    });

    test(':R: record is right', () => {
        expect(hr[0]).toEqual(
            ':R: ' + Object.values(headerParams).splice(0, 4).join(',')
        );
    });
    test('second line is :I: record empty', () => {
        expect(hr[1]).toEqual(':I:');
    });
    test('line 3 start with :H: record', () => {
        expect(hr[2]).toMatch(/^:H:/);
    });
    test('record :H: is right', () => {
        expect(hr[2]).toMatch(/^:H:\s+(PRIO|P4P)/);
    });
    test('line 4 start with //C record', () => {
        expect(hr[3]).toMatch(/^\/\/C/);
    });
    test('line4 has correct Z id', () => {
        expect(hr[3].substring(4, 12)).toEqual(
            'Z' + headerParams.idConvenzione.toString().padStart(7, '0')
        );
    });
    test('line4 has correct grafico', () => {
        expect(hr[3].substring(12, 12 + headerParams.grafico.length)).toEqual(
            headerParams.grafico
        );
    });
    test('line4 has correct bollettino type', () => {
        expect(
            hr[3].substring(37, 37 + postel.header.bollettino.length)
        ).toEqual(postel.header.bollettino);
    });

    test('line 5 start with //G 01 record', () => {
        expect(hr[4]).toMatch(/^\/\/G\sL\s01/);
    });

    test('line 5 includes right cartaIntestata', () => {
        expect(hr[4].substring(8, 17)).toEqual(headerParams.cartaIntestata);
    });

    test('line 6 start with //G 02 record', () => {
        expect(hr[5]).toMatch(/^\/\/G\sL\s02/);
    });

    test('line 6 includes right bollettino type', () => {
        expect(hr[5].substring(8, 16)).toEqual(postel.header.bollettinoType);
    });

    test('line 7 start with //G F 01 record', () => {
        expect(hr[6]).toMatch(/^\/\/G\sF\s01/);
    });

    test('line 7 has right logo bollettino', () => {
        expect(
            hr[6].substring(8, 8 + headerParams.logoBollettino.length)
        ).toEqual(postel.header.logoBollettino);
    });

    test('line 7 ends with S', () => {
        expect(hr[6]).toMatch(/S$/);
    });

    test('last line is end line', () => {
        expect(hr[hr.length - 1]).toEqual('@T');
    });
});

describe('Address tests', () => {
    let address: Address;
    let hr: string[];

    const addressParams: Typ.AddressParameters = {
        nominativo: 'Paolino Paperino',
        indirizzo: 'Via dei paperi',
        civico: '3/A',
        cap: '98765',
        comune: 'Paperopoli',
        provincia: 'PP',
        id: '123456'
    };

    beforeAll(() => {
        address = new Address();
        address.init(addressParams);
        hr = address.result({ where: 'missive' }).split(Lang.EOL);
    });

    test('Row 1 with header', () => expect(hr[0]).toEqual(address.header));

    test('Row 2 is nominativo', () =>
        expect(hr[1]).toEqual(addressParams.nominativo));

    test('Row 3 with address', () =>
        expect(hr[2]).toEqual(`${addressParams.indirizzo}, ${address.civico}`));

    test('Row 3 with city', () =>
        expect(hr[3]).toEqual(
            `${address.cap} ${addressParams.comune} ${address.provincia}`
        ));

    test('Test localita', () => {
        address.localita = 'FooBar';
        hr = address.result({ where: 'missive' }).split(Lang.EOL);
        expect(hr[2]).toEqual(
            `${addressParams.indirizzo}, ${address.civico} - ${address.localita}`
        );
    });
});

describe('Payment tests', () => {
    let payment: Payment;
    let hr: string[];

    beforeAll(() => {
        payment = new Payment();
        const addressParams: Typ.AddressParameters = {
            nominativo: 'Paolino Paperino',
            indirizzo: 'Via dei paperi',
            civico: '3/A',
            cap: '98765',
            comune: 'Paperopoli',
            provincia: 'PP',
            id: '123456'
        };
        payment.address.init(addressParams);
        hr = payment.result().split(Lang.EOL);
    });

    test('Has an address method', () => {
        expect(payment.address).toBeDefined();
    });

    test('Has a missive class', () => {
        expect(payment.missive).toBeDefined();
    });

    describe('Missive tests', () => {
        let missive: Missive;
        let mr: string[];

        beforeAll(() => {
            missive = payment.missive;
            mr = missive.result().split(Lang.EOL);
        });

        test('Row 1 starts with @A', () => expect(mr[0]).toMatch(/^@A/));

        test('Row 1 has address header', () =>
            expect(mr[0]).toEqual('@A' + payment.address.header));
    });

    test('Row 1 starts with @A', () => expect(hr[0]).toMatch(/^@A/));

    test('Row 1 has address header', () =>
        expect(hr[0]).toEqual('@A' + payment.address.header));
});

test('Has a payments class', () => {
    expect(postel.payments).toBeDefined();
});

describe('Payments tests', () => {
    let payment: Payment;
    let hr: string[];

    beforeAll(() => {
        payment = new Payment();
        const addressParams: Typ.AddressParameters = {
            nominativo: 'Paolino Paperino',
            indirizzo: 'Via dei paperi',
            civico: '3/A',
            cap: '98765',
            comune: 'Paperopoli',
            provincia: 'PP',
            id: '123456'
        };
        payment.address.init(addressParams);
        postel.payments.push(payment);

        hr = postel.payments.result().split(Lang.EOL);
    });

    test('Row 1 has address header', () =>
        expect(hr[0]).toEqual('@A' + payment.address.header));
});

test('Has an footer class', () => {
    expect(postel.footer).toBeDefined();
});

// configure header
