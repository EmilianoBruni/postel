import { PostelRowConstructor, PostelRowPosition } from '../../types';
import { IWithResult } from '../IWithResult';
import Lang from '../Lang';
import PostelTextBlock from './PostelTextBlock';

class PostelRow implements IWithResult {
    private _textBlocks: PostelTextBlock[];
    private _position: PostelRowPosition;
    private _lineSpacing: number | undefined;
    private _font: number | undefined;
    private _prePostText: { pre: string | undefined; post: string | undefined };
    private _shebang: boolean;

    constructor(opt: PostelRowConstructor) {
        this._position = opt ?? { type: 'abs', value: 1 };
        this._textBlocks = [];
        this._prePostText = { pre: undefined, post: undefined };
        this._shebang = true;
    }

    public get position(): PostelRowPosition {
        return this._position;
    }
    public set position(value: PostelRowPosition) {
        this._position = value;
    }

    public shebang(newValue: boolean): PostelRow {
        this._shebang = newValue;
        return this;
    }

    public lineSpacing(spaceCount?: number): PostelRow {
        this._lineSpacing = spaceCount;
        return this;
    }

    public font(index?: number): PostelRow {
        this._font = index;
        return this;
    }

    appendText(text: string): PostelTextBlock {
        const newBlock = new PostelTextBlock(this, text);
        this._textBlocks.push(newBlock);
        return this._textBlocks.at(-1) || new PostelTextBlock(this, text);
    }

    public prePostText(
        pre: string | undefined = undefined,
        post: string | undefined = undefined
    ): PostelRow {
        this._prePostText = { pre: pre, post: post };
        return this;
    }

    result(): string {
        const rows = [];

        const rowM: string[] = [];
        // 1° ILN code
        if (this._lineSpacing) rowM.push('INL ' + this._lineSpacing);
        // 2° TOP
        if (this._position.type === 'abs') rowM.push('TOP');
        // 3° TEX code
        if (this._font) rowM.push('TEX ' + this._font);
        // 4° BOT/SPA
        if (this._position.type === 'bot') rowM.push('BOT');
        else if (
            this._position.value !== undefined &&
            this._position.value !== 0
        )
            rowM.push(Lang.newLine(this._position.value));

        const shebang = () => (this._shebang ? '!' : '');
        if (rowM.length > 0) rows.push(shebang() + rowM.join(';'));

        let row0 = this._textBlocks.join('');
        if (this._prePostText.pre !== undefined)
            row0 = this._prePostText.pre + row0;
        if (this._prePostText.post !== undefined)
            row0 += this._prePostText.post;
        rows.push(row0);

        return rows.length > 0 ? rows.join(Lang.EOL) : '';
    }

    toString(): string {
        return this.result();
    }
}

export default PostelRow;
