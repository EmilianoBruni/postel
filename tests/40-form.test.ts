import Postel from '../src';
import Payment from '../src/lib/Payment';
import Address from '../src/lib/Address';
import Lang from '../src/lib/Lang';
import Missive from '../src/lib/Missive';
import { describe } from 'node:test';
import MissiveBody from '../src/lib/MissiveBody';
import Form from '../src/lib/Form';
import { paymentParams, headerParams } from './data';
//import { paymentParams, headerParams } from './data.priv';

let postel: Postel;

beforeAll(() => {
    postel = new Postel();
});

afterAll(() => console.log(postel.result()));

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

    test('Has a form class', () => {
        expect(payment.form).toBeDefined();
    });

    describe('Form tests', () => {
        let form: Form;
        let fr: string[];

        beforeAll(() => {
            form = payment.form;
            fr = form.result().split(Lang.EOL);
        });
    });
});

// configure header
