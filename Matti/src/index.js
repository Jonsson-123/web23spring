/**
 * @author Jonsson-123
 *
 *
 */

const keySequence = [];
let previousX;
let previousY;
let secretUnlocked = false;
let timer;
const alertDiv = document.querySelector('.alert');

// Event listener for pressing any key on keyboard
document.addEventListener('keydown', () => {

  let keySequenceToString;
  // Add the keypress to an array
  keySequence.push(event.key);
  //Create a string of the array
  keySequenceToString = keySequence.join('');

  // Check if the string contains the required code with regex
  if (/jepjep/.test(keySequenceToString) && !secretUnlocked) {
    alert('Secret unlocked');
    secretUnlocked = true;
  };
  resetTimer();
});

/** Prints double clicked coordinates to page
 *
 * @param {*} event - Click event
 */
const showCoords = (event) => {
  if (event.x === previousX && event.y === previousY) {
    document.querySelector('.printCoords').innerHTML = `Double clicked coords: x:${event.x} y: ${event.y} `;
  } else {
    previousX = event.x;
    previousY = event.y;
  }
};

// Register clicks on the document
document.addEventListener('click', (event) => {
  showCoords(event);
  resetTimer();
});

// Log to console when div element on page is touched
document.querySelector('.touchDiv').addEventListener('touchstart', () =>  {
console.log('div element touched');
resetTimer();
});

/** Starts a timer which prints a text to screen after 15 seconds if not stopped
 *
 */
const startTimer = () => {
   timer = setInterval(() => {
    alertDiv.textContent = 'HURRY UP!';
    alertDiv.style.color = 'red';
}, 15000);
};

/** Resets a timer
 *
 */
const resetTimer = () => {
  alertDiv.textContent = '';
  clearInterval(timer);
  startTimer();
};

// Prints a text to screen after 15 seconds
setTimeout(() => {
  alertDiv.textContent = 'HURRY UP!';
  alertDiv.style.color = 'red';
}, 15000);

// Event listener for mouse movement on the whole page
document.addEventListener('mousemove', () => {
  resetTimer();
});

startTimer();


