import Header from './Header';
import Footer from './Footer';
import Payments from './Payments';
import Lang from './Lang';

class Postel {
    private p_header: Header;
    private p_footer: Footer;
    private p_payments: Payments;

    constructor() {
        this.p_header = new Header();
        this.p_footer = new Footer();
        this.p_payments = new Payments();
    }

    get header() {
        return this.p_header;
    }

    get footer() {
        return this.p_footer;
    }

    get payments() {
        return this.p_payments;
    }

    result(): string {
        const rows = [];
        rows.push(this.p_header.result());
        rows.push(this.p_payments.result());

        this.p_footer.recordCount = this.p_payments.length;
        rows.push(this.p_footer.result());
        return rows.join(Lang.EOL);
    }
}

export { Postel };
