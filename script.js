// constance definitions
const waitForStart = 1
const questionsPerSet = 5


// GUI element bindings
const questionDiv = document.getElementById('question')
const startButton = document.querySelector('[data-start]')
const okButton = document.querySelector('[data-ok]')
const responseInput = document.getElementById('number_response')
const questionError = document.querySelector('[data-question-error]')
const rangeInput = document.getElementById('range')
const questionLog = document.getElementById('response_log')
const resultMessage = document.getElementById('result_message')

function showErrorMessage(msg) {
    showMessage("<font color ='#ff0000'>" + msg + "</font>")
}

function showMessage(msg, div = questionDiv ) {
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
        answer: varA * varB,
        wrongAnswerCount: 0,
    }
}

let currentQuestion 
let questionStack = []
let questionLeft

function showNextQuestion () {
    questionLeft--
    responseInput.value = ''
    questionError.innerHTML = ''
    currentQuestion = newQuestion(range)
    showMessage(`${currentQuestion.varA} x ${currentQuestion.varB} = `)
    responseInput.focus()
    console.log(`questionLeft: ${questionLeft}`)
}

function updateQuestionLog(questionStack) {
    questionLog.innerHTML =''
    questionStack.forEach( passQuestion => {
        questionLog.innerHTML = passQuestion.varA + ' x ' 
        + passQuestion.varB + ' = ' + passQuestion.answer + '<br>' 
        + questionLog.innerHTML
    })
}


function okButtonListener() {
    // do nothing if there is no question
    if (! currentQuestion) return
    // check if answer is correct
    if (responseInput.value != currentQuestion.answer) { 
        questionError.innerHTML = 'zła odpowiedź! spróbuj jeszcze raz!'
        currentQuestion.wrongAnswerCount++
        return
    }
    // save time and stack question 
    questionStack.push(currentQuestion)
    updateQuestionLog(questionStack)
    // generate and ask next question or end the test if there was enough questions
    if (questionLeft > 0) {
        showNextQuestion()
    } else {
        clearQuestionPanel()
        showSummary(questionStack)
    }
}

function clearQuestionPanel() {
    questionDiv.innerHTML = 'koniec testu!'
}


function showSummary(questionStack) {
    let wrongAnswers = 0
    questionStack.forEach( answer => {
        if (answer.wrongAnswerCount > 0) wrongAnswers++
    })
    resultMessage.innerHTML = `Quiz ukończony! Dobre odpowiedzi, ` + 
         `za pierwszym razem: ${questionStack.length - wrongAnswers}`
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
    questionLeft = questionsPerSet
    showMessage('game is starting! ;)')
    countDown(waitForStart, showNextQuestion)
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
