import { Postel, Payment } from '../src';
import { describe } from 'node:test';
import { paymentParams } from './data';

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
