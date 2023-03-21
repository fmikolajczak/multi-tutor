const waitForStart = 3

function checkRange(x) {
    // input x should be 2 nubmers divded by -
    let range = x.split('-')
    if(range.length != 2) return false
    return [Number(range[0]), Number(range[1])]
}

function showErrorMessage(msg) {
    showMessage("<font color ='#ff0000'>" + msg + "</font>")
}

function showMessage(msg, div = document.getElementById('question')) {
    div.innerHTML = msg
}

const quizParameters = {
    rangeA: null,
    rangeB: null,
}

function start() {
    const inputA = document.getElementById('number_a')
    const inputB = document.getElementById('number_b')
    console.log(inputA.value)
    const rangeA = checkRange(inputA.value)
    const rangeB = checkRange(inputB.value)
    
    if (! rangeA)  {
        showErrorMessage('wrong A range')
        return
    }
    if (! rangeB) {
        showErrorMessage('wrong B range')
        return
    }
    quizParameters.rangeA = rangeA
    quizParameters.rangeB = rangeB
    
    showMessage('game is starting! ;)')
    let counter = waitForStart
    function countDown() { setTimeout(() => {
        showMessage(--counter) 
        if (counter) { countDown() } else { startQuiz()}}, 1000)}
    countDown()
}

function newQuestion(parameters) {
    parameters.rangeA[0]
    const varA = parameters.rangeA[0] + Math.floor(Math.random() * (parameters.rangeA[1] - parameters.rangeA[0]))
    const varB = parameters.rangeB[0] + Math.floor(Math.random() * (parameters.rangeB[1] - parameters.rangeB[0]))
    return {
        varA: varA, 
        varB: varB,
        answer: varA * varB
    }
}

let currentQuestion 
let questionStack = []

function startQuiz () {
    responseInput.value = ''
    questionError.innerHTML = ''
    currentQuestion = newQuestion(quizParameters)
    showMessage(`${currentQuestion.varA} x ${currentQuestion.varB} = `)
}

export function startButtonListener() {
    start()
}

export function okButtonListener() {
    // do nothing if there is no question
    if (! currentQuestion) return
    // check if answer is correct
    if (responseInput.value != currentQuestion.answer) { 
        questionError.innerHTML = 'zła odpowiedź! spróbuj jeszcze raz!'
        return
    }
    // save time and stack question 
    questionStack.push(currentQuestion)
    // generate and ask next question or end the test if there was enough questions
    startQuiz()
}
// GUI element bindings
console.log('running the script!')

const questionDiv = document.getElementById('question')
console.log('questionDiv: ' + questionDiv)

const startButton = document.querySelector('[data-start]')
console.log('startButton: ' + startButton)

startButton.addEventListener('click', startButtonListener)

const okButton = document.querySelector('[data-ok]')
okButton.addEventListener('click', okButtonListener)

const responseInput = document.getElementById('number_response')
console.log('responseInput ' + responseInput)

const questionError = document.querySelector('[data-question-error]')
console.log('questionError ' + questionError)
