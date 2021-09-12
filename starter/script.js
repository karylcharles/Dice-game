'use strict';

let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let player1El = document.querySelector('.player--0');
let player2El = document.querySelector('.player--1');
let diceEl = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn--roll');
let btnNewGame = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');


let scores;
let currentScore;
let activePlayer;
let isPlaying;

let initial = () =>{
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
    score0.textContent = 0;
    score1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
}

initial();

let switchPlayer = () =>{
    document.getElementById(`current--${activePlayer}`).textContent = 0; 
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){
   if(isPlaying){
        //1. Generating a random dice roll
        let dice = Math.floor(Math.random() * 6) + 1;
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        console.log(diceEl.src = `dice-${dice}.png`);
        //3. Check for roll 1. if true switch to next player
        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;             
        }
        else{
            switchPlayer();
        }
   }
});

btnHold.addEventListener('click', function(){
    if(isPlaying){
        //1. add current score to active player's
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    }
    //2. Check if score is already 100
    if(scores[activePlayer] >= 30){
        // finish game
        isPlaying = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else{
        //switch to next player
        switchPlayer();
    }
});

btnNewGame.addEventListener('click', initial);


