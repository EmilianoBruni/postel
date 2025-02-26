import Lang from './Lang';
import {
    HeaderParams,
    Convenzione,
    Lotto,
    TipoLotto,
    Bollettino,
    Prio,
    CartaIntestata,
    BollettinoType,
    LogoBollettino
} from '../types';

class Header {
    public responsabile = '';
    public telefono = '';
    public fax = '';
    public mail = '';
    public prio = 'P4P' as Prio;
    public idConvenzione = 0 as Convenzione;
    public lotto = 'XXXXXXXX' as Lotto;
    public tipoLotto = 'UN' as TipoLotto;
    public bollettino = 'BOLEUR5' as Bollettino;
    public cartaIntestata = '' as CartaIntestata;
    public bollettinoType = 'CEE896SI' as BollettinoType;
    public logoBollettino = '' as LogoBollettino;

    init({ ...opt }: HeaderParams) {
        this.responsabile = opt.responsabile;
        this.telefono = opt.telefono;
        this.fax = opt.fax;
        this.mail = opt.mail;
        this.prio = this.prio ?? opt.prio;
        if (opt.idConvenzione > 9999999)
            new Error('Id Convenzione must be <= 9999999');
        this.idConvenzione = opt.idConvenzione;
        this.lotto = opt.lotto;
        this.bollettino = this.bollettino ?? opt.bollettino;
        this.bollettinoType = this.bollettinoType ?? opt.bollettinoType;
        this.cartaIntestata = opt.cartaIntestata;
        this.logoBollettino = opt.logoBollettino;
    }

    result(): string {
        const rows = [];
        rows.push(
            `:R: ${this.responsabile},${this.telefono},${this.fax},${this.mail}`
        );
        rows.push(':I:');
        rows.push(`:H: TIPOINVIO (${this.prio})`);

        const row4 =
            '//C Z' +
            this.idConvenzione.toString().padStart(7, '0') +
            this.lotto +
            this.tipoLotto;
        rows.push(row4.padEnd(37) + this.bollettino);

        rows.push(`//G L 01${this.cartaIntestata}03660394`);
        rows.push('//G L 02CEE896SI');
        rows.push(`//G F 01${this.logoBollettino}S`);

        rows.push('@T');
        return rows.join(Lang.EOL);
    }
}

export default Header;
