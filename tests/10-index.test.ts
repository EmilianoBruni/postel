import { Postel } from '../src';

let postel: Postel;

beforeAll(() => {
    postel = new Postel();
});

// afterAll(() => console.log(postel.result()));

test('I want a class to be defined', () => {
    expect(postel).toBeDefined();
});

test('Has a method that produce output', () => {
    expect(typeof postel.result).toBe('function');
});
