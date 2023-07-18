import Postel from '../src';
import Lang from '../src/lib/Lang';
import { describe } from 'node:test';
import { paymentParams, headerParams } from './data';
//import { headerParams } from './data.priv';

let postel: Postel;

beforeAll(() => {
    postel = new Postel();
});

afterAll(() => console.log(postel.result()));

test('Has an header class', () => {
    expect(postel.header).toBeDefined();
});

describe('Header tests', () => {
    const hParams = headerParams;
    let hr: string[];
    beforeAll(() => {
        postel.header.init(hParams);
        hr = postel.header.result().split(Lang.EOL);
    });

    test('Header start with :R: record', () => {
        expect(hr[0].startsWith(':R:')).toBeTruthy();
    });

    test(':R: record is right', () => {
        expect(hr[0]).toEqual(
            ':R: ' + Object.values(hParams).splice(0, 4).join(',')
        );
    });
    test('second line is :I: record empty', () => {
        expect(hr[1]).toEqual(':I:');
    });
    test('line 3 start with :H: record', () => {
        expect(hr[2]).toMatch(/^:H:/);
    });
    test('record :H: is right', () => {
        expect(hr[2]).toMatch(/^:H:\s+TIPOINVIO \((PRIO|P4P)\)/);
    });
    test('line 4 start with //C record', () => {
        expect(hr[3]).toMatch(/^\/\/C/);
    });
    test('line4 has correct Z id', () => {
        expect(hr[3].substring(4, 12)).toEqual(
            'Z' + hParams.idConvenzione.toString().padStart(7, '0')
        );
    });
    test('line4 has correct grafico', () => {
        expect(hr[3].substring(12, 12 + hParams.grafico.length)).toEqual(
            hParams.grafico
        );
    });
    test('line4 has correct bollettino type', () => {
        expect(
            hr[3].substring(37, 37 + postel.header.bollettino.length)
        ).toEqual(postel.header.bollettino);
    });

    test('line 5 start with //G 01 record', () => {
        expect(hr[4]).toMatch(/^\/\/G\sL\s01/);
    });

    test('line 5 includes right cartaIntestata', () => {
        expect(hr[4].substring(8, 16)).toEqual(hParams.cartaIntestata);
    });

    test('line 6 start with //G 02 record', () => {
        expect(hr[5]).toMatch(/^\/\/G\sL\s02/);
    });

    test('line 6 includes right bollettino type', () => {
        expect(hr[5].substring(8, 16)).toEqual(postel.header.bollettinoType);
    });

    test('line 7 start with //G F 01 record', () => {
        expect(hr[6]).toMatch(/^\/\/G\sF\s01/);
    });

    test('line 7 has right logo bollettino', () => {
        expect(
            hr[6].substring(8, 8 + hParams.logoBollettino.length)
        ).toEqual(postel.header.logoBollettino);
    });

    test('line 7 ends with S', () => {
        expect(hr[6]).toMatch(/S$/);
    });

    test('last line is end line', () => {
        expect(hr[hr.length - 1]).toEqual('@T');
    });
});
