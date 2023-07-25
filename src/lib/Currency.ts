class Currency extends Number {
    private _value: number;
    constructor(value: number) {
        super(value);
        this._value = value;
    }

    public toPostelString(): string {
        return this.toFixed(2).replace('.', ',');
    }

    public valueOf(): number {
        return this._value;
    }
}

export default Currency;
