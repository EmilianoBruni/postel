import { MissiveBodyRowPosition } from '../../types';
import { IWithResult } from '../IWithResult';
import Lang from '../Lang';
import PostelTextBlock from './MissiveTextBlock';

class PostelRow implements IWithResult {
    constructor(position?: MissiveBodyRowPosition) {
        this._position = position ? position : { type: 'abs', value: 1 };
        this._textBlocks = [];
    }
    private _textBlocks: PostelTextBlock[];
    private _position: MissiveBodyRowPosition;

    public get position(): MissiveBodyRowPosition {
        return this._position;
    }
    public set position(value: MissiveBodyRowPosition) {
        this._position = value;
    }

    appendText(text: string): PostelTextBlock {
        const newBlock = new PostelTextBlock(this, text);
        this._textBlocks.push(newBlock);
        return this._textBlocks.at(-1) || new PostelTextBlock(this, text);
    }

    result(): string {
        const rows = [];

        let row0 = '!';
        if (this._position.type === 'abs') row0 += 'TOP;';
        row0 += 'SPA ' + this._position.value;
        rows.push(row0);

        rows.push(this._textBlocks.join(''));

        return rows.join(Lang.EOL);
    }

    toString(): string {
        return this.result();
    }
}

export default PostelRow;
