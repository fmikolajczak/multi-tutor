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

function getRandomFromRange(range) {
    return range[0] + Math.floor(Math.random() * (range[1] - range[0]))
}

function newQuestion(range) {
    const varA = getRandomFromRange(range)
    const varB = getRandomFromRange(range)
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
    currentQuestion = newQuestion(range)
    showMessage(`${currentQuestion.varA} x ${currentQuestion.varB} = `)
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

function countDown(counter, callback) { 
    setTimeout(() => {
    showMessage(--counter) 
    if (counter) { countDown(counter,callback) } else { callback()}}, 1000)
}

function start() {
    // check settings
    range = parseRange(rangeInput.value)
    if (! range)  {
        showErrorMessage('wrong A range')
        return
    }

    showMessage('game is starting! ;)')
    countDown(waitForStart, startQuiz)
    console.log(`waitForStart: ${waitForStart}`)
}

function startButtonListener() {
    // TODO: check if state is ok to start
    start()
}

// events bindings
startButton.addEventListener('click', startButtonListener)
okButton.addEventListener('click', okButtonListener)
responseInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') okButtonListener(e)
})
