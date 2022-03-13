'use strict';



let numberRandom = Math.trunc(Math.random() * 20 + 1)
let score = 20;
let highscore = 0;
let number = document.querySelector('.number').textContent
// let scoreVar = document.querySelector('.score').textContent

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message
}

document.querySelector('.check').addEventListener('click', function () {
    var guess = Number(document.querySelector('.guess').value)
    number = numberRandom
    
    if (!guess) {
        displayMessage('CHUA NHAP SO')
    } else if (guess === number) {
        displayMessage('chinh xac')
        score++
        document.querySelector('.score').textContent = score
        document.querySelector('body').style.backgroundColor = 'pink'
        if (score > highscore) {
            highscore = score
            document.querySelector('.highscore').textContent = highscore
        }
    } else if (guess !== number) {
        if (score > 1) {
            displayMessage(guess > number ? 'qua lon' : 'qua nho')
            score--
            document.querySelector('.score').textContent = score
        } else {
            displayMessage('lose game roi nhoc')
            document.querySelector('.score').textContent = 0
        }
    }
})


document.querySelector('.again').addEventListener('click', function (params) {
    document.querySelector('.number').textContent = '?'
    document.querySelector('.score').textContent = 20
    document.querySelector('.guess').value = ''
    displayMessage('Start guessing...')
    document.querySelector('body').style.backgroundColor = '#222'
})