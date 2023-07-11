import Payment from './Payment';
import Lang from './Lang';
import { IWithResult } from './IWithResult';
import PostelRow from './Syntax/PostelRow';

class MissiveBody implements IWithResult {
    private pPayment: Payment;
    private _rows: PostelRow[];

    constructor(payment: Payment) {
        this.pPayment = payment;
        this._rows = [];
    }

    addRow(distance: number, position: 'rel' | 'abs' = 'rel'): PostelRow {
        const newRow = Lang.PostelRow({ type: position, value: distance });
        this._rows.push(newRow);
        return (
            this._rows.at(-1) ||
            Lang.PostelRow({ type: position, value: distance })
        );
    }

    result(): string {
        const rows: string[] = [];

        rows.push('@T');
        rows.push(this._rows.join(Lang.EOL));

        return rows.join(Lang.EOL);
    }
}

export default MissiveBody;
