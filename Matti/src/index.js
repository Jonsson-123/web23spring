// Author: Jonsson-123
// Date 13.1.2023

const maxGuesses = 9;
const highestNum = 100;
const lowestNum = 7;

let randomNumber = Math.floor(
  Math.random() * (highestNum - lowestNum + 1) + lowestNum
);
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const introText = document.querySelector(".introText");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const timerElement = document.querySelector(".timer");
const guessesTotal = document.querySelector(".guessesTotal");
let guessCount = 1;
let resetButton;

console.log(randomNumber);
introText.textContent = `We have selected a random number between ${lowestNum} and ${highestNum}. See if you can guess it in ${maxGuesses} turns or fewer. We'll tell you if your guess was too high or too low.`;

let startTime = Date.now();

const guessTimer = () => {
  const spentTime = Date.now() - startTime;
  timerElement.textContent =
    "Time spent guessing: " + Math.round(spentTime / 1000) + " seconds";
};

let secondTimer = setInterval(guessTimer, 1000);

const checkGuess = () => {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
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

const setGameOver = () => {
  guessesTotal.textContent = "Total number of guesses: " + guessCount;
  clearInterval(secondTimer);
  guessField.disabled = true;
  guessSubmit.disabled = true;
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
  guessField.value = "";
  guessField.focus();
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * highestNum) + lowestNum;
  startTime = Date.now();
  secondTimer = setInterval(guessTimer, 1000);
};
