// global variables
let currTime;
let startTime;
let prevTime;
let lapTime;

let totalTimeElapsed;

let startButton;
let stopButton;
let lapButton;
let resetButton;

let leftButtonContainer;
let rightButtonContainer;
let lapContainer;
let intervalID;
let timeText;

// start of functions
function createStartStopButtons() {
  startButton = document.createElement("button");
  stopButton = document.createElement("button");
  lapButton = document.createElement("button");
  resetButton = document.createElement("button");

  startButton.innerHTML = "Start";
  stopButton.innerHTML = "Stop";
  lapButton.innerHTML = "Lap";
  resetButton.innerHTML = "Reset";

  startButton.classList.add("apple-button");
  stopButton.classList.add("apple-button");
  lapButton.classList.add("apple-button");
  resetButton.classList.add("apple-button");

  startButton.style.backgroundColor = "rgb(48, 209, 88, .2)";
  stopButton.style.backgroundColor = "rgb(255, 69, 58, .2)";
  lapButton.style.backgroundColor = "rgb(142, 142, 147, .2)";
  resetButton.style.backgroundColor = "rgb(142, 142, 147, .2)";

  startButton.addEventListener("click", startStopwatch);
  stopButton.addEventListener("click", stopStopwatch);
  lapButton.addEventListener("click", lap);
  resetButton.addEventListener("click", reset);
}

function addButton(buttonContainer, button) {
  // TODO: depending on whether the button is supposed to be on the left or the right, append or insert
  buttonContainer.appendChild(button);
}

function removeButton(buttonContainer) {
  // TODO: depending on whether the button is supposed to be on the left or the right, append or insert
  buttonContainer.removeChild(buttonContainer.firstChild);
}

function formatTime(timeObject) {
  formattedcenti = timeObject.centi.toString().padStart(2, "0");
  formattedSec = timeObject.sec.toString().padStart(2, "0");
  formattedMin = timeObject.min.toString().padStart(2, "0");
  return `${formattedMin} : ${formattedSec} : ${formattedcenti}`;
}

function convertTocenti(timeObject) {
  let minToSec = timeObject.min * 60;
  let secTocenti = (timeObject.sec + minToSec) * 100;
  let totalcenti = secTocenti + timeObject.centi;
  return totalcenti;
}

function convertFromcenti(timeObject) {
  let totalCenti;
  totalCenti = Math.floor(timeObject.milli / 10);
  timeObject.min = Math.floor(totalCenti / 6000);
  totalCenti -= timeObject.min * 6000;
  timeObject.sec = Math.floor(totalCenti / 100);
  totalCenti -= timeObject.sec * 100;
  timeObject.centi = totalCenti;
}

function startStopwatch() {
  // replace start button with stop button
  removeButton(rightButtonContainer);
  addButton(rightButtonContainer, stopButton);
  //replace the reset button with lap button EXCEPT in the beginning where it is default lap, but because I coded removeButton() to remove the first childnode of the button container, it still works
  removeButton(leftButtonContainer);
  addButton(leftButtonContainer, lapButton);
  // start timer
  startTime.milli = Date.now();
  intervalID = setInterval(function () {
    currTime.milli = Date.now() - startTime.milli + totalTimeElapsed;
    convertFromcenti(currTime);
    displayTime(formatTime(currTime));
  }, 10);
}

function stopStopwatch() {
  // you have to subtract totalTimeElapsed because we only add the time that has elapsed since the last time the start button was pressed
  totalTimeElapsed += currTime.milli - totalTimeElapsed;
  // stop the repeating interval
  clearInterval(intervalID);
  //replace the lap button with reset button ONLY if
  removeButton(leftButtonContainer);
  addButton(leftButtonContainer, resetButton);

  //replace the stop button with start button
  removeButton(rightButtonContainer);
  addButton(rightButtonContainer, startButton);
}

function displayTime(formattedTime) {
  timeText.innerHTML = formattedTime;
}

function lap() {
  let lapText = document.createElement("p");
  lapTime.milli = currTime.milli - prevTime.milli;
  convertFromcenti(lapTime);
  lapText.innerHTML = formatTime(lapTime);
  lapContainer.appendChild(lapText);
  // set this time as the new previous times
  prevTime.milli = currTime.milli;
}

function reset() {
  //reset the current and previous timestamps
  resetTimeObjects();
  //display 00:00.00 on the timer
  displayTime(formatTime(currTime));
  //remove all laps
  while (lapContainer.firstChild) {
    lapContainer.removeChild(lapContainer.lastChild);
  }
}

function resetTimeObjects() {
  currTime = { time: "curr", min: 0, sec: 0, centi: 0, milli: 0 };
  startTime = { time: "start", min: 0, sec: 0, centi: 0, milli: 0 };
  prevTime = { time: "prev", min: 0, sec: 0, centi: 0, milli: 0 };
  lapTime = { time: "lap", min: 0, sec: 0, centi: 0, milli: 0 };
  totalTimeElapsed = 0;
}

function initialize() {
  resetTimeObjects();
  timeText = document.querySelector(".time-text");
  leftButtonContainer = document.querySelector("#left-button-container");
  rightButtonContainer = document.querySelector("#right-button-container");
  lapContainer = document.querySelector(".lap-container");
  addButton(leftButtonContainer, lapButton);
  addButton(rightButtonContainer, startButton);
}

//run functions
createStartStopButtons();
initialize();
