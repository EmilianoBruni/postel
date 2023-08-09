import PostelRow from '../src/lib/Syntax/PostelRow';
import Lang from '../src/lib/Lang';

let row: PostelRow;

beforeEach(() => {
    row = Lang.PostelRow({ type: 'rel', value: 0 });
});

test('Extended characters', () => {
    expect(row.appendText('€ 50,00').result()).toEqual('@L: 50,00');
    expect(row.appendText('connettività').result()).toEqual('connettivit@LH');
    expect(row.appendText('perché').result()).toEqual('perch@LE');
    expect(row.appendText('però').result()).toEqual('per@LJ');
    expect(row.appendText('Corfù').result()).toEqual('Corf@LK');
    expect(row.appendText('Mercoledì').result()).toEqual('Mercoled@LY');
});
