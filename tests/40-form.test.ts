import Postel from '../src';
import Payment from '../src/lib/Payment';
import { describe } from 'node:test';
// import Form from '../src/lib/Form';
import { paymentParams } from './data';
//import { paymentParams } from './data.priv';

let postel: Postel;

beforeAll(() => {
    postel = new Postel();
});

// afterAll(() => console.log(postel.result()));

describe('Payment tests', () => {
    let payment: Payment;

    beforeAll(() => {
        payment = new Payment(paymentParams);
        postel.payments.push(payment);
    });

    test('Has an address method', () => {
        expect(payment.address).toBeDefined();
    });

    test('Has a form class', () => {
        expect(payment.form).toBeDefined();
    });

    // describe('Form tests', () => {
    //     let form: Form;

    //     beforeAll(() => {
    //         form = payment.form;
    //     });
    // });
});

// configure header
