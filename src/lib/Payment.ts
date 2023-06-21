import Lang from './Lang';
import Address from './Address';
import Form from './Form';
import Missive from './Missive';

class Payment {
    private pAddress: Address;
    private pMissive: Missive;
    private pForm: Form;

    constructor() {
        this.pAddress = new Address();
        this.pMissive = new Missive(this);
        this.pForm = new Form(this);
    }

    get address() {
        return this.pAddress;
    }

    get missive() {
        return this.pMissive;
    }

    get form() {
        return this.pForm;
    }

    result(): string {
        const rows: string[] = [];

        rows.push(this.pMissive.result());

        return rows.join(Lang.EOL);
    }
}

export default Payment;
