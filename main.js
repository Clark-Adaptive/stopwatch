// global variables
let centi = 0;
let sec = 0;
let min = 0;

let prevcenti = 0;
let prevSec = 0;
let prevMin = 0;

let lapcenti = 0;
let lapSec = 0;
let lapMin = 0;

let formattedcenti;
let formattedMin;
let formattedSec;

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

function removeButton(button) {}

function formatTime(min, sec, centi) {
  formattedcenti = centi.toString().padStart(2, "0");
  formattedSec = sec.toString().padStart(2, "0");
  formattedMin = min.toString().padStart(2, "0");
  return `${formattedMin} : ${formattedSec} : ${formattedcenti}`;
}

function convertTocenti(min, sec, centi) {
  let minToSec = min * 60;
  let secTocenti = (sec + minToSec) * 100;
  let totalcenti = secTocenti + centi;
  return totalcenti;
}

function convertFromcenti(totalcenti) {
  let newMin = Math.floor(totalcenti / 6000);
  totalcenti -= newMin * 6000; // 1
  let newSec = Math.floor(totalcenti / 100);
  totalcenti -= newSec * 100; // 1
  let newcenti = totalcenti; // 35

  lapcenti = newcenti;
  lapSec = newSec;
  lapMin = newMin;
}

function startStopwatch() {
  // replace start button with stop button

  // start timer
  intervalID = setInterval(function () {
    centi++;
    if (centi == 100) {
      centi = 0;
      sec++;
      if (sec == 60) {
        sec = 0;
        min++;
      }
    }
    let txt = document.querySelector(".time-text");
    let formattedTime = formatTime(min, sec, centi);
    txt.innerHTML = formattedTime;
  }, 10);
}

function stopStopwatch() {
  // stop the repeating interval
  clearInterval(intervalID);
}

function lap() {
  let lapText = document.createElement("p");
  let currentTotalcenti = convertTocenti(min, sec, centi);
  let prevTotalcenti = convertTocenti(prevMin, prevSec, prevcenti);
  let totalcenti = currentTotalcenti - prevTotalcenti;
  convertFromcenti(totalcenti);
  lapText.innerHTML = formatTime(lapMin, lapSec, lapcenti);
  lapContainer.appendChild(lapText);
  // set this time as the new previous times
  prevcenti = centi;
  prevSec = sec;
  prevMin = min;
}

function reset() {}

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
