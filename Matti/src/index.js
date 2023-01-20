// Author: Jonsson-123
// Date 13.1.2023

const maxGuesses = 10000;
const highestNum = 100;
const lowestNum = 1;

let randomNumber = Math.floor(
  Math.random() * (highestNum - lowestNum + 1) + lowestNum
);
const guesses = document.querySelector(".guesses");
const guessesAverage = document.querySelector(".guessesAverage");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const introText = document.querySelector(".introText");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const timerElement = document.querySelector(".timer");
const guessesTotal = document.querySelector(".guessesTotal");
const solveSubmit = document.querySelector(".solveSubmit");
const solveSubmitMany = document.querySelector(".solveSubmitMany");



let guessCount = 1;
let resetButton;

console.log(randomNumber);
introText.textContent = `We have selected a random number between ${lowestNum} and ${highestNum}. See if you can guess it in ${maxGuesses} turns or fewer. We'll tell you if your guess was too high or too low.`;

let startTime = Date.now();


const computerGuess = (guess, guessCount, randomNum) => {

  if (guess === randomNum) {
    return "Correct";

  } else if (guessCount === maxGuesses) {
    return 'Game over';

  } else {
    if (guess < randomNum) {
      return "Too low";
    } else if (guess > randomNum) {
      return "Too high";
    }
  }

};

/** Uses binary search formula to find the wanted number
 *
 */
const solveGameManyTimes = () => {


  const totalGuessCountHistory = [];

  guessesAverage.textContent = "Average guesses ";

  // Tests the computer solving 10000 times
  for (let i = 0; i < 10000; i++) {
    randomNumber = Math.floor(Math.random() * (highestNum - lowestNum + 1) + lowestNum);
    guessCount = 1;
    let gameStatus = 'unsolved';
    let guess;
    let minRange = lowestNum;
    let maxRange = highestNum;
    //const computerGuessHistory = [];
    let returnedValue;

    // Computer tries to solve the number
    while (guessCount <= maxGuesses && gameStatus !== 'solved') {

      guess = Math.floor((maxRange + minRange) / 2);

      returnedValue = computerGuess(guess, guessCount, randomNumber);

      if (returnedValue === 'Too low') {
        minRange = guess + 1;
      }
      if (returnedValue === 'Too high') {
        maxRange = guess - 1;
      }
      if (returnedValue === 'Correct') {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        totalGuessCountHistory.push(guessCount);
        gameStatus = 'solved';
        console.log(gameStatus);
        //setGameOver();
      }
      if (returnedValue === 'Game over') {
        lastResult.textContent = "!!!GAME OVER!!!";
        lastResult.style.backgroundColor = "red";
        lowOrHi.textContent = "";
        totalGuessCountHistory.push(guessCount);
        //setGameOver();
      }
      // guesses.textContent += guess + " ";
      // computerGuessHistory.push(guess);
      guessCount++;
    }
  }
  console.log(totalGuessCountHistory.length);
  console.log(totalGuessCountHistory);
  const average = totalGuessCountHistory.reduce((a, b) => a + b) / totalGuessCountHistory.length;
  guessesAverage.textContent += average;
};
const solveGame = () => {

  guesses.textContent = "All guesses: ";
  randomNumber = Math.floor(Math.random() * (highestNum - lowestNum + 1) + lowestNum);
  guessCount = 1;
  let gameStatus = 'unsolved';
  let guess;
  let minRange = lowestNum;
  let maxRange = highestNum;
  const computerGuessHistory = [];
  let returnedValue;

  // Computer tries to solve the number
  while (guessCount <= maxGuesses && gameStatus !== 'solved') {

    guess = Math.floor((maxRange + minRange) / 2);

    returnedValue = computerGuess(guess, guessCount, randomNumber);

    if (returnedValue === 'Too low') {
      minRange = guess + 1;
    }
    if (returnedValue === 'Too high') {
      maxRange = guess - 1;
    }
    if (returnedValue === 'Correct') {
      lastResult.textContent = "Congratulations! You got it right!";
      lastResult.style.backgroundColor = "green";
      lowOrHi.textContent = "";
      totalGuessCountHistory.push(guessCount);
      gameStatus = 'solved';
      console.log(gameStatus);
      setGameOver();
    }
    if (returnedValue === 'Game over') {
      lastResult.textContent = "!!!GAME OVER!!!";
      lastResult.style.backgroundColor = "red";
      lowOrHi.textContent = "";
      totalGuessCountHistory.push(guessCount);
      setGameOver();
    }
    guesses.textContent += guess + " ";
    computerGuessHistory.push(guess);
    guessCount++;
  }
};


const guessTimer = () => {
  const spentTime = Date.now() - startTime;
  timerElement.textContent =
    "Time spent guessing: " + Math.round(spentTime / 1000) + " seconds";
};

let secondTimer = setInterval(guessTimer, 1000);

const checkGuess = () => {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "All guesses: ";
  }

  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === maxGuesses) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
};



guessSubmit.addEventListener("click", checkGuess);
solveSubmit.addEventListener("click", solveGame);
solveSubmitMany.addEventListener('click', solveGameManyTimes);


const setGameOver = () => {
  guessesTotal.textContent = "Total number of guesses: " + guessCount;
  clearInterval(secondTimer);
  guessField.disabled = true;
  guessSubmit.disabled = true;
  solveSubmit.disabled = true;

  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
};

const resetGame = () => {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  solveSubmit.disabled = false;

  guessField.value = "";
  guessField.focus();
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * highestNum) + lowestNum;
  startTime = Date.now();
  secondTimer = setInterval(guessTimer, 1000);
};
