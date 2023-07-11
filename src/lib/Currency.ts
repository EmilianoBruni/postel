class Currency extends Number {
    constructor(value: number) {
        super(value);
    }

    public toPostelString(): string {
        return this.toFixed(2).replace('.', ',');
    }
}

export default Currency;
