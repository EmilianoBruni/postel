import Lang from './Lang';
import Payment from './Payment';
import { IWithResult } from './IWithResult';
import MissiveBody from './MissiveBody';

class Missive implements IWithResult {
    private pPayment: Payment;
    private _body: MissiveBody;

    public get body(): MissiveBody {
        return this._body;
    }

    constructor(payment: Payment) {
        this.pPayment = payment;
        this._body = new MissiveBody(payment);
    }

    result(): string {
        const rows: string[] = [];

        rows.push('@A' + this.pPayment.address.result({ where: 'missive' }));
        rows.push(this._body.result());

        return rows.join(Lang.EOL);
    }
}

export default Missive;
