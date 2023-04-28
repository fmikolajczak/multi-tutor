

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
    constructor(range, questionsLeft, questonsAsked) {
        this.mode = 1
        if (questionsLeft && questonsAsked) {
            this.queryList = questionsLeft
            this.usedQueries = questonsAsked
        } else {
            this.queryList = []
            this.usedQueries = []
            for (let i = range[0]; i <= range[1]; i++) {
                for (let j = range[0]; j <= range[1]; j++) {
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
        this.lastQuestions = []
        if (this.queryList.length == 0) {
            this.mode = 2
            this.#sortAnsweredQuestions()
        }
    }

    correctAnswer(question) {
        if (this.mode == 1) {
            this.queryList.splice(this.index, 1)[0]
            this.usedQueries.push(question)
            this.#addLastQuestion(question)
        } else if (this.mode == 2) {
            //TODO: rotate quesions
            this.questionsAsked.shift()
            this.questionsAsked.push(question)
        }
        console.log(`question answered: ${question.a}x${question.b}=${question.answer}`)
        console.log(`answer time: ${question.time}`)
    }
    
    #addLastQuestion(question) {
        if (this.lastQuestions.length >= 5) {
            this.lastQuestions.shift()
        }
        this.lastQuestions.push(question)
    }

    #sortAnsweredQuestions() {
        this.usedQueries.sort(QuestionPool.#answeredQuestionCompareFunction)
        console.log('question sorted')
    }

    static #answeredQuestionCompareFunction(q1, q2) {
        const q1score = q1.wrongAnswerCount * 10000 + q1.time
        const q2score = q2.wrongAnswerCount * 10000 + q2.time
        return q2score - q1score
    }

    get nextQuestion() {
        // return new question
        if(this.queryList.length > 0) {
            this.index = Math.floor(Math.random() * this.queryList.length) 
            console.log(`nextQuestion index: ${this.index}`)
            return this.queryList[this.index]
        }
        // switch mode
        if (this.queryList.length == 0 && this.mode == 1) {
            this.mode = 2
        }
        // return worst answered question
        if (this.queryList.length == 0 && this.mode == 2) {
            // should question which answer got most wrong answers and/or max answer time
            const nextQuestion = this.questionsAsked[0]
            nextQuestion.wrongAnswerCount = 0
            return nextQuestion
        }
    }

    get allCount() {
        return this.queryList.length + this.usedQueries.length
    }

    get answeredCount() {
        return this.usedQueries.length
    }

    get wrongCount() {
        let count = 0 
        this.usedQueries.forEach(question => {
            if(question.wrongAnswerCount) count += question.wrongAnswerCount
        });
        return count
    }

    get questionsAsked() {
        return this.usedQueries
    }

    get questionsLeft() {
        return this.queryList
    }
}

if (typeof module !== 'undefined') {
    module.exports = parseRange
}

function showQueryStats(questionPool, statsDiv) {
    // TODO: complete the function
    let text_stats = `q: ${questionPool.answeredCount}/${questionPool.allCount} <span class='wrong'>(wa: ${questionPool.wrongCount})</span> pass: ${questionPool.mode}`
    statsDiv.innerHTML = text_stats
}

