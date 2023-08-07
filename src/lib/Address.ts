import Lang from './Lang';
import { AddressParams } from '../types';
import { IWithResult } from './IWithResult';

class Address implements IWithResult {
    public header = 'Spett.le';
    public nominativo = '';
    public indirizzo = '';
    public civico = '';
    public localita = '';
    public cap = '';
    public comune = '';
    public provincia = '';
    public id = '000000';
    public fiscalCode = '';

    constructor({ ...opt }: AddressParams) {
        this.header = opt.header ?? this.header;
        this.nominativo = opt.nominativo;
        this.indirizzo = opt.indirizzo;
        this.civico = opt.civico;
        this.localita = opt.localita ?? this.localita;
        this.cap = opt.cap;
        this.comune = opt.comune;
        this.provincia = opt.provincia;
        this.id = opt.id;
        this.fiscalCode = opt.fiscalCode;
    }

    result({ where }: { where: 'missive' | 'form' }): string {
        const rows: string[] = [];

        if (where === 'missive') rows.push(this.header);
        rows.push(this.nominativo);
        rows.push(
            this.indirizzo +
                ', ' +
                this.civico +
                (this.localita === '' ? '' : ` - ${this.localita}`)
        );
        rows.push(`${this.cap} ${this.comune} ${this.provincia}`);
        if (where === 'form') rows.push(`ID: ${this.id}`);

        return rows.join(Lang.EOL);
    }
}

export default Address;
