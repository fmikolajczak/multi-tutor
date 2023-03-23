

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

module.exports = checkRange