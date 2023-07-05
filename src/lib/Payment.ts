import Lang from './Lang';
import Address from './Address';
import Form from './Form';
import Missive from './Missive';
import { AddressParams, BankAccount, CommParams } from '../types';

class Payment {
    private pAddress: Address;
    private pMissive: Missive;
    private pForm: Form;

    private _comm : CommParams;
    private _bank : BankAccount;

    constructor({ address, comm, bank }: { address: AddressParams, comm: CommParams, bank: BankAccount }) {
        this.pAddress = new Address(address);
        this.pMissive = new Missive(this);
        this.pForm = new Form(this);

        this._bank=bank;
        this._comm = comm;
    }

    public get address() {
        return this.pAddress;
    }

    public get missive() {
        return this.pMissive;
    }

    public get form() {
        return this.pForm;
    }

    public get bank() : BankAccount {
        return this._bank;
    }
    
    public get comm() : CommParams {
        return this._comm;
    }
    

    public result(): string {
        const rows: string[] = [];

        rows.push(this.pMissive.result());
        rows.push(this.pForm.result())

        return rows.join(Lang.EOL);
    }
}

export default Payment;
