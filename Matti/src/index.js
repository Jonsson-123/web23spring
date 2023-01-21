// Author: Jonsson-123
// Date 13.1.2023

const maxGuesses = 10;
const highestNum = 100;
const lowestNum = 1;

let randomNumber = Math.floor(
  Math.random() * (highestNum - lowestNum + 1) + lowestNum
);
const guesses = document.querySelector('.guesses');
const guessesAverage = document.querySelector('.guessesAverage');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const introText = document.querySelector('.introText');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const timerElement = document.querySelector('.timer');
const guessesTotal = document.querySelector('.guessesTotal');
const solveSubmit = document.querySelector('.solveSubmit');
const solveSubmitMany = document.querySelector('.solveSubmitMany');



let guessCount = 1;
let resetButton;

introText.textContent = `We have selected a random number between ${lowestNum} and ${highestNum}. See if you can guess it in ${maxGuesses} turns or fewer. We'll tell you if your guess was too high or too low.`;

let startTime = Date.now();

const checkGuess = (guess, guessCount, randomNum) => {

  if (guess === randomNum) {
    lastResult.textContent = 'Solved!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    return 'Correct';
  } else if (guessCount === maxGuesses) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lastResult.style.backgroundColor = 'red';
    lowOrHi.textContent = '';
    return 'Game over';
  } else {
    if (guess < randomNum) {
      return 'Too low';
    } else if (guess > randomNum) {
      return 'Too high';
    }
  }
};

/** Uses an algorithm sort of like binary search, where the search zone is halved (almost) every turn.
 *  maximum number of counts is 7  and theoretic max for a range of 100 numbers is also 7
 *  counted with the mathematic formula [log_2(n)+1] (depends on the range of numbers being searched).
 *  theoretical Minimum number of guesses is always 1 (when the number is in the middle of the range).
 *  @param {int} times - declares how many times the program is run
 *
 *
 */
const solveGameManyTimes = (times) => {
  const totalGuessCountHistory = [];
  let playedOnlyOnce = false;
  if (times === 1) {
    guesses.textContent = 'All guesses: ';
    playedOnlyOnce = true;
  };

  // Tests the computer solving 10000 times
  for (let i = 0; i < times; i++) {
    randomNumber = Math.floor(Math.random() * (highestNum - lowestNum + 1) + lowestNum);
    guessCount = 1;
    let gameStatus = 'unsolved';
    let guess;
    let minRange = lowestNum;
    let maxRange = highestNum;
    let returnedValue;

    while (guessCount <= maxGuesses && gameStatus !== 'solved') {

      guess = Math.floor((maxRange + minRange) / 2);
      returnedValue = checkGuess(guess, guessCount, randomNumber);

      if (returnedValue === 'Too low') {
        minRange = guess + 1;
      }
      if (returnedValue === 'Too high') {
        maxRange = guess - 1;
      }
      if (returnedValue === 'Correct') {
        totalGuessCountHistory.push(guessCount);
        gameStatus = 'solved';
        if (playedOnlyOnce) setGameOver();
      }
      if (returnedValue === 'Game over') {
        totalGuessCountHistory.push(guessCount);
        if (playedOnlyOnce) setGameOver();
      }
      if (playedOnlyOnce) guesses.textContent += guess + ' ';
      guessCount++;
    }
    guessCount=1;
  }
  if (!playedOnlyOnce) {
    guessesAverage.textContent = 'Average guesses needed to solve: ';
    const average = totalGuessCountHistory.reduce((a, b) => a + b) / totalGuessCountHistory.length;
    guessesAverage.textContent += average;
    const maxGuessCount = totalGuessCountHistory.sort();
    console.log('Minimum amount of guesses ', maxGuessCount[0]);
    maxGuessCount.reverse();
    console.log('Maximum amount of guesses ', maxGuessCount[0]);
  }
};

const guessTimer = () => {
  const spentTime = Date.now() - startTime;
  timerElement.textContent =
    'Time spent guessing: ' + Math.round(spentTime / 1000) + ' seconds';
};

let secondTimer = setInterval(guessTimer, 1000);


/** function for user inputted guesses
 *
 *
 */
const playerGame = () => {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'All guesses: ';
  }
  guesses.textContent += userGuess + ' ';
  let returnedValue = checkGuess(userGuess, guessCount, randomNumber);
  if (returnedValue === 'Correct') {
    setGameOver();
  } else if (returnedValue === 'Game over') {
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (returnedValue === 'Too low') {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (returnedValue === 'Too high') {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
  guessCount++;
  guessField.value = '';
  guessField.focus();
};

guessSubmit.addEventListener('click', playerGame);
solveSubmit.addEventListener('click', () => {
  solveGameManyTimes(1);
});
solveSubmitMany.addEventListener('click', () => {
  solveGameManyTimes(10000);
});

const setGameOver = () => {
  guessesTotal.textContent = 'Total number of guesses: ' + guessCount;
  clearInterval(secondTimer);
  guessField.disabled = true;
  guessSubmit.disabled = true;
  solveSubmit.disabled = true;

  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
};

const resetGame = () => {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  solveSubmit.disabled = false;

  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * highestNum) + lowestNum;
  startTime = Date.now();
  secondTimer = setInterval(guessTimer, 1000);
};
