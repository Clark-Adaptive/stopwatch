// global variables
let currTime;
let startTime;
let prevTime;
let lapTime;

let totalTimeElapsed;

let numLaps;
let longestLap;
let shortestLap;
let $prevMaxLap;
let $prevMinLap;

let startButton;
let stopButton;
let lapButton;
let resetButton;

//boolean that determines if the stopwatch has started or not
let hasStarted;

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

  startButton.classList.add("apple-button", "start-button");
  stopButton.classList.add("apple-button", "stop-button");
  lapButton.classList.add("apple-button", "lap-button");
  resetButton.classList.add("apple-button", "reset-button");

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
  return `${formattedMin}:${formattedSec}.${formattedcenti}`;
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

// function displayTime(milliseconds) {
//   // ? convert milliseconds
//   return `${minutes}:${seconds}.${centiseconds}`;
// }

function startStopwatch() {
  hasStarted = true;
  // replace start button with stop button
  removeButton(rightButtonContainer);
  addButton(rightButtonContainer, stopButton);
  //replace the reset button with lap button EXCEPT in the beginning where it is default lap, but because I coded removeButton() to remove the first childnode of the button container, it still works
  removeButton(leftButtonContainer);
  addButton(leftButtonContainer, lapButton);
  // start timer
  startTime.milli = Date.now();
  intervalID = setInterval(function () {
    //display current time
    currTime.milli = Date.now() - startTime.milli + totalTimeElapsed;
    convertFromcenti(currTime);
    displayTime(formatTime(currTime));
    //also want to display current lap time
    lapTime.milli = currTime.milli - prevTime.milli;
    convertFromcenti(lapTime);
    displayLapTime(formatTime(lapTime));
  }, 10);
}

function stopStopwatch() {
  hasStarted = false;
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

function displayLapTime(formattedTime) {
  if (!lapContainer.hasChildNodes()) {
    createLapRow();
  }
  let nodes = document.querySelectorAll(".lap-time");
  let lapTimeText = nodes[0];
  // let lapTimeText = nodes[nodes.length - 1];
  lapTimeText.innerHTML = formattedTime;
}

function displayTime(formattedTime) {
  timeText.innerHTML = formattedTime;
}

function createLapRow() {
  let rowContainer = document.createElement("li");
  let lapNumber = document.createElement("p");
  let lapTimeText = document.createElement("p");

  lapNumber.innerHTML = `Lap ${numLaps}`;
  lapTimeText.innerHTML = convertTocenti(lapTime);
  lapTimeText.classList.add("lap-time");

  rowContainer.classList.add("row-container");
  rowContainer.appendChild(lapNumber);
  rowContainer.appendChild(lapTimeText);

  if (!lapContainer.hasChildNodes()) {
    lapContainer.appendChild(rowContainer);
  } else {
    lapContainer.insertBefore(rowContainer, lapContainer.children[0]);
  }
}

function checkMinMaxLap() {
  let nodes = document.querySelectorAll(".row-container");
  // let lapRowContainer = nodes[nodes.length - 1];
  let lapRowContainer = nodes[0];
  let currLapTime = convertTocenti(lapTime);
  console.log(numLaps, shortestLap, longestLap);
  if (numLaps <= 2) {
    if (currLapTime > longestLap) {
      longestLap = currLapTime;
      $prevMaxLap = lapRowContainer;
      console.log("max", $prevMaxLap);
    }
    if (currLapTime < shortestLap) {
      shortestLap = currLapTime;
      $prevMinLap = lapRowContainer;
      console.log("min", $prevMinLap);
    }
    if (numLaps == 2) {
      $prevMaxLap.classList.add("max-lap");
      $prevMinLap.classList.add("min-lap");
    }
  } else {
    if (currLapTime > longestLap) {
      //set new longestLap to be current lap time
      longestLap = currLapTime;
      // paint this lap green
      lapRowContainer.classList.add("max-lap");
      //remove green paint form the previous longest lap
      $prevMaxLap.classList.remove("max-lap");
      $prevMaxLap = lapRowContainer;
    } else if (currLapTime < shortestLap) {
      //set new shortestLap to be current lap time
      shortestLap = currLapTime;
      // paint this lap red
      lapRowContainer.classList.add("min-lap");
      // remove red paint from the previous shortest lap
      $prevMinLap.classList.remove("min-lap");
      $prevMinLap = lapRowContainer;
    }
  }
}

function lap() {
  if (!hasStarted) {
    return;
  }
  // reset previous time to be the curren time so we can calculate the next lap time
  prevTime.milli = currTime.milli;
  //create html dom element to display lap
  checkMinMaxLap();
  numLaps++;
  createLapRow();
}

function reset() {
  numLaps = 1;
  $prevMaxLap = null;
  $prevMaxLap = null;
  longestLap = Number.NEGATIVE_INFINITY;
  shortestLap = Number.POSITIVE_INFINITY;
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
  numLaps = 1;
  longestLap = Number.NEGATIVE_INFINITY;
  shortestLap = Number.POSITIVE_INFINITY;
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
