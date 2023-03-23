// import { checkRange } from "./lib.js";
const checkRange = require('./lib')

test('test correct argument: checkRange(3-6)', () => {
    expect(checkRange('3-6')).toEqual([3,6])
})

test('test wrong argument checkRange(x-8)', () => {
    expect(checkRange('x-6')).toBeFalsy()
})

