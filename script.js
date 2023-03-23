// constance definitions
const waitForStart = 3


// GUI element bindings
const questionDiv = document.getElementById('question')
const startButton = document.querySelector('[data-start]')
const okButton = document.querySelector('[data-ok]')
const responseInput = document.getElementById('number_response')
const questionError = document.querySelector('[data-question-error]')
const rangeInput = document.getElementById('range')

function showErrorMessage(msg) {
    showMessage("<font color ='#ff0000'>" + msg + "</font>")
}

function showMessage(msg, div = document.getElementById('question')) {
    div.innerHTML = msg
}

// range from which quiz choose numbers, array of 2 numbers [a, b]
let range

function start() {
    range = parseRange(rangeInput.value)

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

function startButtonListener() {
    start()
}

function okButtonListener() {
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


// events bindings
startButton.addEventListener('click', startButtonListener)
