

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

class QuestionPool {
    constructor(range) {
        this.queryList = []
        this.usedQueries = []
        for (let i = range[0]; i <= range[1] ; i++ ) {
            for( let j = range[0] ; j <= range[1] ; j ++) {
                let query = {
                    a: i,
                    b: j,
                    answer: i * j,
                    wrongAnswerCount: 0,
                }
                console.log(`constructor query: ${query.a} ${query.b}`)
                this.queryList.push(query)
            }
        }
    }

    nextQuestion() {
        if(this.queryList.length > 0) {
            let index = Math.floor(Math.random() * this.queryList.length) 
            console.log(`nextQuestion index: ${index}`)
            let currentQuestion = this.queryList.splice(index, 1)[0]
            this.usedQueries.push(currentQuestion)
            console.log(`QuestionPool.nextQuestion(): ${currentQuestion.a} ${currentQuestion.b}`)
            return currentQuestion
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = parseRange
}