import { IWithResult } from './IWithResult';
import Lang from './Lang';
import Payment from './Payment';

class Form implements IWithResult {
    private pPayment: Payment;

    constructor(payment: Payment) {
        this.pPayment = payment;
    }

    private header(): string {
        const rows: string[] = [];

        rows.push('!NEW 2;INL 0;TEX 2;TOP');
        rows.push('@G01');
        return rows.join(Lang.EOL);
    }

    result(): string {
        const rows: string[] = [];

        rows.push(this.header());

        return rows.join(Lang.EOL);
    }
}

export default Form;
