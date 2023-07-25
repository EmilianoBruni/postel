import Postel from '../src';
import Payment from '../src/lib/Payment';
import Address from '../src/lib/Address';
import Lang from '../src/lib/Lang';
import Missive from '../src/lib/Missive';
import { describe } from 'node:test';
import MissiveBody from '../src/lib/MissiveBody';
import { paymentParams } from './data';
//import { paymentParams, headerParams } from './data.priv';

let postel: Postel;

beforeAll(() => {
    postel = new Postel();
});

afterAll(() => console.log(postel.result()));

describe('Address tests', () => {
    let address: Address;
    let hr: string[];

    const addressParams = paymentParams.address;

    beforeAll(() => {
        address = new Address(addressParams);
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
        payment = new Payment(paymentParams);
        hr = payment.result().split(Lang.EOL);

        postel.payments.push(payment);
    });

    test('Has an address method', () => {
        expect(payment.address).toBeDefined();
    });

    test('Row 1 starts with @A', () => expect(hr[0]).toMatch(/^@A/));

    test('Row 1 has address header', () =>
        expect(hr[0]).toEqual('@A' + payment.address.header));

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

        test('Has a body class', () => {
            expect(missive.body).toBeDefined();
        });

        describe('Missive body tests', () => {
            let mBody: MissiveBody;
            let mr: string[];

            beforeAll(() => {
                mBody = missive.body;
                mr = mBody.result().split(Lang.EOL);
            });

            test('Row 1 starts with @T', () => {
                expect(mr[0]).toEqual('@T');
            });

            test('Rows for header ', () => {
                let text = '€68,46';
                let row = 1;
                mBody
                    .addRow(10, 'abs')
                    .appendText(text)
                    .setMaxWidth(21)
                    .setAlignRight(36);

                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '!TOP;SPA 10'
                );
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '@?15' + ' '.repeat(15) + '@L:68,46'
                );

                text = '14/05/2023';
                mBody
                    .addRow(1)
                    .appendText(text)
                    .setMaxWidth(27)
                    .setAlignRight(36);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual('!SPA 1');
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '@?09' + ' '.repeat(17) + text
                );

                text = '046692';
                mBody
                    .addRow(1)
                    .appendText(text)
                    .setMaxWidth(24)
                    .setAlignRight(36);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual('!SPA 1');
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '@?12' + ' '.repeat(18) + text
                );

                text = 'BOLLETTINO C/C POSTALE';
                mBody
                    .addRow(1)
                    .appendText(text)
                    .setMaxWidth(26)
                    .setAlignRight(36);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual('!SPA 1');
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '@?10' + ' '.repeat(4) + text
                );

                text = 'PCMNLM44A45D876P';
                mBody
                    .addRow(1)
                    .appendText(text)
                    .setMaxWidth(27)
                    .setAlignRight(36);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual('!SPA 1');
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '@?09' + ' '.repeat(11) + text
                );
            });

            test('Between header and invoices rows ', () => {
                const text = 'Fattura n. 75821 del 17/04/2023';
                let row = 11;
                mBody.addRow(2).appendText(text).setAlignLeft(47).setBold(true);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual('!SPA 2');
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '@?47@O' + text + '@o'
                );
            });

            test('Invoices rows ', () => {
                let row = 13;
                mBody
                    .addRow(26, 'abs')
                    .appendText('Canone mensile WADSL HOME 10X 10M/2M')
                    .setMaxWidth(36)
                    .back()
                    .appendText('02/05/23-16/05/23')
                    .setMaxWidth(17)
                    .setAlignLeft(2)
                    .back()
                    .appendText('N.')
                    .setMaxWidth(4)
                    .setAlignLeft(2)
                    .back()
                    .appendText('0')
                    .setMaxWidth(4)
                    .setAlignRight(5)
                    .back()
                    .appendText('20,41')
                    .setMaxWidth(8)
                    .setAlignRight(10)
                    .back()
                    .appendText('10,21')
                    .setMaxWidth(8)
                    .setAlignRight(10)
                    .back()
                    .appendText('I22')
                    .setMaxWidth(3)
                    .setAlignLeft(2);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '!TOP;SPA 26'
                );
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    'Canone mensile WADSL HOME 10X 10M/2M@?0202/05/23-16/05/23@?02N.  @?01   0@?02   20,41@?02   10,21@?02I22'
                );

                mBody
                    .addRow(0)
                    .appendText(
                        'Da impegno 7829/W del 20/09/2019 - (bhfbeifbwbfgwebwefg'
                    )
                    .setMaxWidth(36)
                    .back()
                    .appendText('')
                    .setMaxWidth(17)
                    .setAlignLeft(2)
                    .back()
                    .appendText('')
                    .setMaxWidth(4)
                    .setAlignLeft(2)
                    .back()
                    .appendText('')
                    .setMaxWidth(4)
                    .setAlignRight(5)
                    .back()
                    .appendText('')
                    .setMaxWidth(8)
                    .setAlignRight(10)
                    .back()
                    .appendText('')
                    .setMaxWidth(8)
                    .setAlignRight(10)
                    .back()
                    .appendText('')
                    .setMaxWidth(3)
                    .setAlignLeft(2);

                expect(mBody.result().split(Lang.EOL)[row++]).toEqual('!SPA 0');
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    'Da impegno 7829/W del 20/09/2019 - (@?02                 @?02    @?01    @?02        @?02        @?02   '
                );
            });

            test('Check total section', () => {
                mBody
                    .addRow(43, 'abs')
                    .appendText('56,31')
                    .setMaxWidth(10)
                    .setAlignRight(46)
                    .back()
                    .appendText('')
                    .setMaxWidth(7)
                    .setAlignRight(11)
                    .back()
                    .appendText('56,31')
                    .setMaxWidth(8)
                    .setAlignRight(12)
                    .back()
                    .appendText('12,15')
                    .setMaxWidth(7)
                    .setAlignRight(10)
                    .back()
                    .appendText('€68,46')
                    .setMaxWidth(10)
                    .setAlignRight(12);
            });

            test('VAT summary', () => {
                mBody
                    .addRow(48, 'abs')
                    .appendText('A15')
                    .setMaxWidth(3)
                    .back()
                    .appendText('1,10')
                    .setMaxWidth(8)
                    .setAlignRight(12)
                    .back()
                    .appendText('Art. 15')
                    .setMaxWidth(9)
                    .setAlignLeft(6)
                    .back()
                    .appendText('')
                    .setMaxWidth(7)
                    .setAlignRight(9);
            });

            test('footer ', () => {
                let row = 21;
                const text =
                    "Copia fattura elettronica disponibile sul sito web dell'Agenzia delle Entrate";
                mBody.addRow(56, 'abs').appendText(text);
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(
                    '!TOP;SPA 56'
                );
                expect(mBody.result().split(Lang.EOL)[row++]).toEqual(text);
            });
        });
    });
});
