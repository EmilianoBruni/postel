import { PostelRowConstructor, PostelRowPosition } from '../../types';
import { IWithResult } from '../IWithResult';
import Lang from '../Lang';
import PostelTextBlock from './PostelTextBlock';

class PostelRow implements IWithResult {
    private _textBlocks: PostelTextBlock[];
    private _position: PostelRowPosition;
    private _lineSpacing: number|undefined;
    private _font: number|undefined;
    private _prePostText: {pre: string|undefined, post: string|undefined};

    constructor(opt:PostelRowConstructor) {
        this._position = opt ?? { type: 'abs', value: 1 };
        this._textBlocks = [];
        this._prePostText = {pre: undefined, post: undefined};
    }

    public get position(): PostelRowPosition {
        return this._position;
    }
    public set position(value: PostelRowPosition) {
        this._position = value;
    }

    public lineSpacing(spaceCount?: number): PostelRow {
        this._lineSpacing = spaceCount;
        return this;
    }

    public font(index?:number): PostelRow {
        this._font = index;
        return this;
    }

    appendText(text: string): PostelTextBlock {
        const newBlock = new PostelTextBlock(this, text);
        this._textBlocks.push(newBlock);
        return this._textBlocks.at(-1) || new PostelTextBlock(this, text);
    }

    public prePostText(pre:string|undefined=undefined, post:string|undefined=undefined): PostelRow {
        this._prePostText= {pre: pre, post: post};
        return this;
    }

    result(): string {
        const rows = [];

        let row0 = '!';
        if (this._position.type === 'abs') row0 += 'TOP;';
        row0 += Lang.newLine(this._position.value);
        if (this._lineSpacing) row0+=';INL ' + this._lineSpacing;
        if (this._font) row0+=';TEX ' + this._font;

        rows.push(row0);

        row0 = this._textBlocks.join('');
        if (this._prePostText.pre  !== undefined) row0 = this._prePostText.pre + row0;
        if (this._prePostText.post  !== undefined) row0 += this._prePostText.post;
        rows.push(row0);

        return rows.join(Lang.EOL);
    }

    toString(): string {
        return this.result();
    }
}

export default PostelRow;
