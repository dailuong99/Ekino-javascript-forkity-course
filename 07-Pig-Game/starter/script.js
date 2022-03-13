'use strict';

const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const soc1 = document.querySelector("#score--0")
const soc2 = document.querySelector("#score--1")
const diceEl = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const current0El = document.querySelector("#current--0")
const current1El = document.querySelector("#current--1")

let score, currentScore, activePlayer, playing;


const init = function(){
     score = [0,0]
     currentScore = 0;
     activePlayer = 0;
     playing = true;

    soc1.textContent = 0
    soc2.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')

    diceEl.classList.remove("hidden")
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}
init()

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

btnRoll.addEventListener("click", function (params) {
    if (playing) {
        //1. Genarating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1

        //2. Display dice
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`

        //3. Check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document
                .getElementById(`current--${activePlayer}`)
                .textContent = currentScore
        } else {
            //switch next player
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {

    //1. Add current scroe to active player's score
    score[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore
    document
    .getElementById(`score--${activePlayer}`).textContent =
     score[activePlayer]
    //2. Check if player's score is >= 100
    if (score[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add("hidden")

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner')
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active')
    } else {
        //switch next player
        switchPlayer()
    }
    //finish the game
    }
})

btnNew.addEventListener('click', init)
