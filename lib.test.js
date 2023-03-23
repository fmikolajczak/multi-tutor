


const parseRange = require('./lib')


test('test range one number', () => {
    expect(parseRange('8')).toEqual([1,8])
})

test('test range one number with spaces around', () => {
    expect(parseRange('  10  ')).toEqual([1,10])
})

test('test range with two numbers, separated by -', () => {
    expect(parseRange('1-10')).toEqual([1,10])
})

test('test range with two number, separated by , and with spaces around', () => {
    expect(parseRange('  5 , 55 ')).toEqual([5,55])
})

test('wrong input should return falsy', () => {
    expect(parseRange(' 5 - ')).toBeFalsy()
    expect(parseRange(' 0 ')).toBeFalsy()
    expect(parseRange(' - 20 ')).toBeFalsy()
    expect(parseRange(' -5:20 ')).toBeFalsy()
})

test('its not ok when first argument is grater then secound', () => {
    expect(parseRange('10:5')).toBeFalsy()
})