import { IWithResult } from './IWithResult';
import Lang from './Lang';
import Payment from './Payment';

class Form implements IWithResult {
    private pPayment: Payment;

    constructor(payment: Payment) {
        this.pPayment = payment;
    }

    private get parent() {
        return this.pPayment;
    }

    private header(): string {
        const rows: string[] = [];

        rows.push('!NEW 2;INL 0;TEX 2;TOP');
        rows.push('@G01');
        return rows.join(Lang.EOL);
    }

    private ccLine(): string {

        const PRow = Lang.PostelRow({type: 'abs',value: 29});

        // ? Don't know why @-
        return PRow.lineSpacing(5).font(5)
            .prePostText('@-','@+')
            .appendText(this.parent.bank.cc)
            .setAlignRight(28)
            .setMaxWidth(12)
            .back()
            .appendText(this.parent.bank.cc)
            .setMaxWidth(12)
            .setAlignRight(46)
            .back()
            .result()
    }

    private accountHolder(): string {
        return Lang.PostelRow({type: 'abs',value: 33})
        .prePostText('@>')
        .appendText(this.parent.bank.name)
        .back()
        .result() +
        Lang.EOL +
        Lang.PostelRow({value: -1, type: 'rel'})
        .prePostText(undefined, '<@')
        .appendText(this.parent.bank.name)
        .setAlignLeft(52)
        .back()
        .result();

    }

    result(): string {
        const rows: string[] = [];

        rows.push(this.header());
        rows.push(this.ccLine());
        rows.push(this.accountHolder());

        return rows.join(Lang.EOL);
    }
}

export default Form;
