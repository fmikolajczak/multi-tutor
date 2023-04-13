// constance definitions
const waitForStart = 1
const questionsPerSet = 5


// GUI element bindings
const questionDiv = document.getElementById('question')
const startButton = document.querySelector('[data-start]')
const okButton = document.querySelector('[data-ok]')
const responseInput = document.getElementById('response')
const questionError = document.querySelector('[data-question-error]')
const rangeInput = document.getElementById('range')
const questionLog = document.getElementById('response_log')
const resultMessage = document.getElementById('result_message')
const statsDiv = document.getElementById('statistics')
const nameInput = document.getElementById('name')
const greetMsgDiv = document.getElementById('greet_msg')
const form = document.getElementsByTagName('form')?.item(0)

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

let questionPool

function newQuestion(range) {
    if (! questionPool) questionPool = new QuestionPool(range)
    // save question state and pool
    saveQuestions(questionPool)
    return questionPool.nextQuestion
}

let currentQuestion 
let questionStack = []
let questionLeft
let quizHistory = []
let currentQuiz = {
    startTime: undefined,
    endTime: undefined,
    questions: undefined,
    correctAnswers: undefined,    
}

function showNextQuestion () {
    questionLeft--
    responseInput.value = ''
    questionError.innerHTML = ''
    currentQuestion = newQuestion(range)
    console.log(`showNextQuestion: currentQuestion: ${currentQuestion}`)
    showMessage(`${currentQuestion.a} x ${currentQuestion.b} = `)
    responseInput.focus()
}

function updateQuestionLog(questionStack) {
    questionLog.innerHTML =''
    questionStack.forEach( passQuestion => {
        questionLog.innerHTML = passQuestion.a + ' x ' 
        + passQuestion.b + ' = ' + passQuestion.answer + '<br>' 
        + questionLog.innerHTML
    })
}


function okButtonListener() {
    // if there is no question then start new quiz
    if (! currentQuestion) {
        start()
        return
    }
    // check answer
    if (responseInput.value != currentQuestion.answer) { 
        questionError.innerHTML = 'wrong answer! try again'
        currentQuestion.wrongAnswerCount++
        return
    }
    // when answer is correct
    questionError.innerHTML = ''
    questionPool.correctAnswer(currentQuestion)
    updateQuestionLog(questionStack)
    showQueryStats(questionPool, statsDiv)
    // generate and ask next question or end the test if there was enough questions
    if (questionLeft > 0) {
        showNextQuestion()
    } else {
        saveQuestions(questionPool)
        clearQuestionPanel()
        showSummary(questionStack)
    }
}

function clearQuestionPanel() {
    currentQuestion = ''
    responseInput.value = ''
    questionDiv.innerHTML = 'end of set!'
    hideQuestionInput()
}

// clear UI beetween sets
function clearQuiz() {
    questionStack = []
    resultMessage.innerHTML = ''
    questionLog.innerHTML = ''
}


function showSummary(questionStack) {
    let wrongAnswers = 0
    questionStack.forEach( answer => {
        if (answer.wrongAnswerCount > 0) wrongAnswers++
    })
    resultMessage.innerHTML = `Quiz ends! good answers, ` + 
         `first time: ${questionStack.length - wrongAnswers}`
}

function countDown(counter, callback) { 
    setTimeout(() => {
    showMessage(--counter) 
    if (counter) { countDown(counter,callback) } else { callback()}}, 1000)
}

function showQuestionInput() {
    okButton.classList.remove('hide')
    responseInput.classList.remove('hide')
    startButton.classList.add('hide')
}

function hideQuestionInput() {
    okButton.classList.add('hide')
    responseInput.classList.add('hide')
    startButton.classList.remove('hide')
}

function start() {
    clearQuiz()
    showQuestionInput()
    // check settings
    range = parseRange(rangeInput.value)
    if (! range)  {
        showErrorMessage('wrong A range')
        return
    }
    questionLeft = questionsPerSet
    saveName(nameInput.value)
    showMessage('game is starting! ;)')
    countDown(waitForStart, showNextQuestion)
    console.log(`waitForStart: ${waitForStart}`)
}

function startButtonListener() {
    // TODO: check if state is ok to start
    start()
}

function nameInputListener() {
    if (nameInput.value.trim() != '') {
        greetMsgDiv.innerHTML = `Welcome ${nameInput.value}!<br> Lets do the test :)`
    }
}

function saveName(name) {
    if(name) localStorage.setItem('name', name)
}

function loadStorage() {
    // player name
    let name = localStorage.getItem('name')
    if(name) nameInput.value = name

    // load questions
    console.log('try to load questions from storage')
    let questionsAsked = localStorage.getItem('questionsAsked')
    let questionsLeft = localStorage.getItem('questionsLeft')
    console.log(`questionsAsked: ${questionsAsked}`)
    console.log(`questionsLeft: ${questionsLeft}`)
    if (questionsLeft) {
        questionPool = new QuestionPool(undefined,
            JSON.parse(questionsLeft),
            JSON.parse(questionsAsked))
        showQueryStats(questionPool, statsDiv)
        console.log('ok, i had have loaded data from localStorage')
    }    
}

function saveQuestions(questionPool) {
    localStorage.setItem('questionsLeft', JSON.stringify(questionPool.questionsLeft))
    localStorage.setItem('questionsAsked', JSON.stringify(questionPool.questionsAsked))
}

// prevent form from submitting
form.addEventListener('submit', function(e) {
    e.preventDefault()
})

// events bindings
startButton.addEventListener('click', startButtonListener)
okButton.addEventListener('click', okButtonListener)
responseInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') okButtonListener(e)
})

nameInput.addEventListener('keyup', nameInputListener)


loadStorage()