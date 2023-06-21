import Lang from './Lang';
import Payment from './Payment';

class Payments extends Array<Payment> {
    result(): string {
        const rows: string[] = [];

        this.forEach(payment => {
            rows.push(payment.result());
        });

        return rows.join(Lang.EOL);
    }
}

export default Payments;
