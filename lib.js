

// obsolete function, TODO remove with tests
function checkRange(x) {
    // input x should be 2 nubmers separated by -
    let range = x.split('-')
    if(range.length != 2) return false
    const fromRange = Number(range[0])
    const toRange = Number(range[1])
    console.log(fromRange)
    if (isNaN(fromRange))  return false 
    if (isNaN(toRange))  return false
    return [fromRange, toRange]
}

// range can be 2 numbers splited by separator - , : or space 
// or it could be one number, then range is from 1 to that number
function parseRange(range) {
    console.log(`range: ${range}`)
    range = range.trim()
    const rangeOne = /^[0-9]+$/
    const rangeTwo = /^([0-9]+)\s*[-:,\s]\s*([0-9]+)$/
    // range is one number but is less then 2
    if(rangeOne.test(range) && range < 2) return
    // is at least 2
    if(rangeOne.test(range)) return [1, Number(range)]
    // range consists from 2 numbers
    if(rangeTwo.test(range)){
        const a = Number(range.match(rangeTwo)[1])
        const b = Number(range.match(rangeTwo)[2])
        if (a<b) return [a,b] 
    }
}

module.exports = parseRange