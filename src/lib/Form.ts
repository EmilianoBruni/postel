import { IWithResult } from './IWithResult';
import Lang from './Lang';
import Payment from './Payment';

type TCodeLine = {
    customCodCliChecksum: string;
    amount: string[];
    cc: string;
    docId: string;
};

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

        // I don't know why but this is no good
        // rows.push('!NEW 2;INL 0;TEX 2;TOP');
        // while this is good
        rows.push('!NEW 2;INL 0;TEX 2;INL 5');
        rows.push('!INL 0;TOP');
        rows.push('@G01');
        return rows.join(Lang.EOL);
    }

    private ccLine(): string {
        const PRow = Lang.PostelRow({ type: 'abs', value: 29 });

        // ? Don't know why @-
        return PRow.lineSpacing(5)
            .font(5)
            .prePostText('@-', '@+')
            .appendText(this.parent.bank.cc)
            .setAlignRight(28)
            .setMaxWidth(12)
            .back()
            .appendText(this.parent.bank.cc)
            .setMaxWidth(12)
            .setAlignRight(46)
            .back()
            .result();
    }

    private accountHolder(): string {
        return (
            Lang.PostelRow({ type: 'abs', value: 33 })
                .prePostText('@>')
                .appendText(this.parent.bank.name)
                .back()
                .result() +
            Lang.EOL +
            Lang.PostelRow({ value: -1, type: 'rel' })
                .prePostText(undefined, '@<')
                .appendText(this.parent.bank.name)
                .setAlignLeft(52)
                .back()
                .result()
        );
    }

    private amounts(): string {
        return Lang.PostelRow({ type: 'abs', value: 29 })
            .prePostText('@-', '@+')
            .appendText(this.parent.comm.amount.toPostelString())
            .setMaxWidth(11)
            .setAlignLeft(34)
            .back()
            .appendText(this.parent.comm.amount.toPostelString())
            .setAlignLeft(50)
            .setMaxWidth(11)
            .back()
            .result();
    }

    private customCodCli(): string {
        return (
            this.parent.address.id.padStart(6, '0') +
            this.parent.comm.invoiceId.padStart(6, '0') +
            this.parent.comm.installment.toString().padStart(2, '0') +
            this.parent.comm.invoiceDate.getFullYear().toString().substring(2)
        );
    }

    private checkSum(baseNum: number): number {
        return baseNum % 93;
    }

    private customCodCliCheckSum(): string {
        const ccc = this.customCodCli();
        return ccc + this.checkSum(Number.parseInt(ccc)).toString();
    }

    private customCodCliLine(): string {
        return Lang.PostelRow({ type: 'abs', value: 38 })
            .prePostText('@>@+', '@<@-')
            .appendText(this.customCodCliCheckSum())
            .setAlignLeft(52)
            .back()
            .result();
    }

    private ibanSpaces(): string {
        const iban = this.parent.bank.iban;
        const ibanA = iban.split('');
        return ibanA.join(' ');
    }

    private iban(): string {
        return Lang.PostelRow({ type: 'abs', value: 46 })
            .font(4)
            .appendText(this.ibanSpaces())
            .setAlignLeft(34)
            .back()
            .appendText(this.ibanSpaces())
            .setAlignLeft(49)
            .back()
            .result();
    }

    private address(): string {
        const address = this.parent.address.result({ where: 'form' });
        const addressA = address.split(Lang.EOL);

        const pr1 = Lang.PostelRow({ type: 'abs', value: 32 })
            .font(2)
            .appendText(address)
            .setAlignLeft(8)
            .back();

        const pr2 = Lang.PostelRow({ type: 'rel', value: -4 });

        addressA.forEach((item, idx) => {
            pr2.appendText(item)
                .setAlignLeft(idx == 0 ? 94 : 87)
                .back()
                .appendText(Lang.EOL);
        });

        return pr1.result() + Lang.EOL + pr2.result();
    }

    private codeLineItems(): TCodeLine {
        const amountA = this.parent.comm.amount.toPostelString().split(',');
        const cl: TCodeLine = {
            customCodCliChecksum: this.customCodCliCheckSum(),
            docId: '896',
            amount: [amountA[0].padStart(8, '0'), amountA[1]],
            cc: this.parent.bank.cc.padStart(12, '0')
        };
        return cl;
    }

    private codeLine(): string {
        const cl = this.codeLineItems();
        return Lang.PostelRow({ type: 'bot' })
            .prePostText('@+', '@-')
            .font(5)
            .appendText('<' + cl.customCodCliChecksum + '>')
            .setAlignLeft(51)
            .back()
            .appendText(cl.amount[0] + '+' + cl.amount[1] + '>')
            .setAlignLeft(7)
            .back()
            .appendText(cl.cc + '<')
            .setAlignLeft(2)
            .back()
            .appendText(cl.docId + '>')
            .setAlignLeft(2)
            .back()
            .result();
    }

    private barcode(): string {
        const cl = this.codeLineItems();
        return (
            // Use manual code because Lang produce
            // this !INL 144;TOP;TEX 4;SPA 64
            '!TEX 4;TOP;INL 144;SPA 64' + Lang.EOL +
            Lang.PostelRow({ type: 'rel' })
                .font(98)
                .appendText(
                    cl.customCodCliChecksum +
                        cl.cc +
                        cl.amount[0] +
                        cl.amount[1] +
                        cl.docId
                )
                .back()
                .result()
        );
    }

    private datamatrix(): string {
        const cl = this.codeLineItems();
        return (
            // Manual code because have strange command order
            // if it used Lang result was
            // this !INL 0;TEX 2;INL 5;TEX 4;INL 59;TOP;SPA 70
            '!INL 0;TEX 2;INL 5;TEX 4;TOP;INL 59;SPA 70' + Lang.EOL + 
            Lang.PostelRow({ type: 'rel' })
                .shebang(false)
                .prePostText('@<@-@Z99', '@>@+')
                .appendText(
                    cl.customCodCliChecksum +
                        cl.cc +
                        cl.amount[0] +
                        cl.amount[1] +
                        cl.docId
                )
                .back()
                .result()
        );
    }

    result(): string {
        const rows: string[] = [];

        rows.push(this.header());
        rows.push(this.ccLine());
        rows.push(this.accountHolder());
        rows.push(this.amounts());
        rows.push(this.customCodCliLine());
        rows.push(this.iban());
        rows.push(this.address());
        rows.push(this.codeLine());
        rows.push(this.barcode());
        rows.push(this.datamatrix());

        return rows.join(Lang.EOL);
    }
}

export default Form;
