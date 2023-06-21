import Lang from './Lang';
import Payment from './Payment';
import { IWithResult } from './IWithResult';

class Missive implements IWithResult {
    private pPayment: Payment;

    constructor(payment: Payment) {
        this.pPayment = payment;
    }

    result(): string {
        const rows: string[] = [];

        rows.push('@A' + this.pPayment.address.result({ where: 'missive' }));
        rows.push('@T');

        return rows.join(Lang.EOL);
    }
}

export default Missive;
