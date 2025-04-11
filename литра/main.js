'use strict'

const startBtn = document.querySelector('.start-btn')
const infoBox = document.querySelector('.info-box')
const exitBtn = infoBox.querySelector('.quit')
const startQuizBtn = infoBox.querySelector('.start')
const quizBox = document.querySelector('.quiz-box')
const queText = quizBox.querySelector('.que-text')
const optionList = quizBox.querySelector('.option-list')
const resultBox = document.querySelector('.result-box')
const timerSec = document.querySelector('.timer-sec')
const timerLine = document.querySelector('.timer-line')
const nextBtn = quizBox.querySelector('.next-btn')
const timerText = document.querySelector('.timer-left')
const circularProgress = document.querySelector('.circular-progress')
const score = document.querySelector('.score')
const restartBtn = document.querySelector('.restart')
const quitBtn = document.querySelector('.quit-res')


startBtn.onclick = () => {
	infoBox.classList.add('active-block')
}

exitBtn.onclick = () => {
	infoBox.classList.remove('active-block')
}

startQuizBtn.onclick = () => {
	infoBox.classList.remove('active-block')
	quizBox.classList.add('active-block')

	showQuestion(queCount)
}



let queCount = 0
let userScores = 0
let timerValue = 19
let timerWidth = 100
let timerId, timerLineId

function showQuestion(index) {
	timerText.textContent = 'Time Left'
	timerSec.textContent = 20
	startTimer(timerValue)
	startTimerLine(timerWidth)
	queText.innerHTML = `<span>${questions[index].numb}. ${questions[index].question}</span>`
	optionList.innerHTML = `
	<div class='option'><span>${questions[index].options[0]}</span></div>
	<div class='option'><span>${questions[index].options[1]}</span></div>
	<div class='option'><span>${questions[index].options[2]}</span></div>
	<div class='option'><span>${questions[index].options[3]}</span></div>
	`
	const options = optionList.querySelectorAll('.option')

	options.forEach(item => {
		item.setAttribute('onclick', 'optionSelect(this)')
	})

}

nextBtn.addEventListener('click', () => {
	if (questions.length > queCount) {
		showQuestion(queCount)
		nextBtn.classList.remove('show')
	} else {
		resultBox.classList.add('active-block')
		quizBox.classList.remove('active-block')
		showResults()
	}


})

function removeClicks() {
	const options = optionList.querySelectorAll('.option')

	options.forEach(item => {
		item.setAttribute('onclick', '')

	})
}


function optionSelect(answer) {
	clearInterval(timerId)
	clearInterval(timerLineId)
	nextBtn.classList.add('show')

	let userAns = answer.textContent
	let correctAns = questions[queCount].answer

	if (userAns === correctAns) {
		userScores++
		answer.classList.add('correct')
	} else {
		answer.classList.add('incorrect')
	}

	removeClicks()
	queCount++
	
}


function startTimer(time) {
	timerId = setInterval(timer, 1000)
	function timer() {
		timerSec.textContent = time
		time--

		if (time < 0) {
			clearInterval(timerId)
			timerText.textContent = 'Time Off'
			removeClicks()
			queCount++
			nextBtn.classList.add('show')

		}
	} 
}

function startTimerLine(time) {
	timerLine.style.width = time + '%'
	timerLineId = setInterval(timer, 200)
	
	function timer() {
		time--
		timerLine.style.width = time + '%'
	}
}

function showResults() {
	nextBtn.classList.remove('active-block')
	score.textContent = `${userScores}/${questions.length}`
	circularAnimation()
	
}

function circularAnimation() {
	let percent = (userScores / questions.length) * 100
	let current = 0
	let progress = setInterval(() => {
		current++
		circularProgress.style.background = `conic-gradient(#007bff ${current * 3.6}deg, #ededed 0deg)`
		
		if (current >= percent) {
		clearInterval(progress)
		}
		
	}, 10)
}

quitBtn.addEventListener('click', () => {
	resultBox.classList.remove('active-block')
	userScore = 0
	queCount = 0

})


quitBtn.addEventListener('click', () => {
	resultBox.classList.remove('active-block')
	userScore = 0
	queCount = 0
	
	quizBox.classList.add('active.block')
	showQuestion(queCount)
	
})

























