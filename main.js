// global variables
// let currTimeMilli;
let currTime = { time: "curr", min: 0, sec: 0, centi: 0, milli: 0 };

// let startTimeMilli;
let startTime = { time: "start", min: 0, sec: 0, centi: 0, milli: 0 };

let prevTimeMilli;
let prevTime = { time: "prev", min: 0, sec: 0, centi: 0, milli: 0 };

let lapTimeCenti;
let lapTime = { time: "lap", min: 0, sec: 0, centi: 0, milli: 0 };

let totalTimeElapsed = 0;

let startButton;
let stopButton;
let lapButton;
let resetButton;

let leftButtonContainer;
let rightButtonContainer;
let lapContainer;
let intervalID;

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
  console.log(timeObject);
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
    let txt = document.querySelector(".time-text");
    let formattedTime = formatTime(currTime);
    txt.innerHTML = formattedTime;
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

function lap() {
  let lapText = document.createElement("p");
  console.log(prevTime, currTime);
  lapTime.milli = currTime.milli - prevTime.milli;
  convertFromcenti(lapTime);
  lapText.innerHTML = formatTime(lapTime);
  lapContainer.appendChild(lapText);
  // set this time as the new previous times
  prevTime.milli = currTime.milli;
}

function reset() {
  //reset the current and previous timestamps
  //remove all laps
}

function initialize() {
  leftButtonContainer = document.querySelector("#left-button-container");
  rightButtonContainer = document.querySelector("#right-button-container");
  lapContainer = document.querySelector(".lap-container");
  addButton(leftButtonContainer, lapButton);
  addButton(rightButtonContainer, startButton);
}

//run functions
createStartStopButtons();
initialize();
