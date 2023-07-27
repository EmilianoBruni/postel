import { IWithResult } from '../IWithResult';
import PostelRow from './PostelRow';

class PostelTextBlock implements IWithResult {
    private _row: PostelRow;
    private _text: string;

    public get text(): string {
        return this._text;
    }
    private _maxWidth: number | undefined;
    public get maxWidth(): number | undefined {
        return this._maxWidth;
    }
    private _alignRight: number | undefined;
    public get alignRight(): number | undefined {
        return this._alignRight;
    }
    private _alignLeft: number | undefined;
    public get alignLeft(): number | undefined {
        return this._alignLeft;
    }

    private _bold: boolean;
    public get bold(): boolean {
        return this._bold;
    }

    constructor(
        parent: PostelRow,
        text: string,
        maxWidth?: number,
        alignRight?: number,
        alignLeft?: number
    ) {
        this._row = parent;
        this._text = text;
        this._alignRight = alignRight;
        this._maxWidth = maxWidth;
        this._alignLeft = alignLeft;
        this._bold = false;
    }
    result(): string {
        let textTrunc =
            this._maxWidth === undefined
                ? this._text
                : this._text.substring(0, this._maxWidth);

        if (this._alignRight !== undefined && this._maxWidth !== undefined)
            textTrunc = textTrunc.padStart(this._maxWidth, ' ');

        else if (this._maxWidth !== undefined)
            textTrunc = textTrunc.padEnd(this._maxWidth, ' ');

        const textLen = textTrunc.length;
        const text = textTrunc.replace('€', '@L:'); // TODO: implement others

        let padding = 0;
        if (this._alignRight !== undefined)
            padding = this._alignRight - textLen;

        if (this._alignLeft !== undefined) padding = this._alignLeft;

        let ret = '';

        if (padding !== 0) ret += '@?' + padding.toString().padStart(2, '0');

        if (this._bold) ret += '@O';
        ret += text;
        if (this._bold) ret += '@o';

        return ret;
    }

    back(): PostelRow {
        return this._row;
    }

    setText(newText: string): PostelTextBlock {
        this._text = newText;
        return this;
    }

    setMaxWidth(width: number): PostelTextBlock {
        this._maxWidth = width;
        return this;
    }

    setAlignRight(paddingRight: number): PostelTextBlock {
        this._alignRight = paddingRight;
        return this;
    }

    setAlignLeft(paddingLeft: number): PostelTextBlock {
        this._alignLeft = paddingLeft;
        return this;
    }

    setBold(mustBeBold: boolean): PostelTextBlock {
        this._bold = mustBeBold;
        return this;
    }

    toString(): string {
        return this.result();
    }
}

export default PostelTextBlock;
