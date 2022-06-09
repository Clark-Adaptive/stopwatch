// global variables
let prevTimeStamp;
let currTimeStamp;

let startButton;
let stopButton;
let lapButton;
let resetButton;

let buttonContainer;
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

function addButton(button) {
  // TODO: depending on whether the button is supposed to be on the left or the right, append or insert
  buttonContainer.appendChild(button);
}

function removeButton(button) {}

function formatTime(min, sec, micro) {
  let formattedMicro = micro.toString().padStart(2, "0");
  let formattedSec = sec.toString().padStart(2, "0");
  let formattedMin = min.toString().padStart(2, "0");
  return `${formattedMin} : ${formattedSec} : ${formattedMicro}`;
}

function convertToMicro(min, sec, micro) {
  let minToSec = min * 60;
  let secToMicro = (sec + minToSec) * 100;
  let totalMicro = secToMicro + micro;
  return totalMicro;
}

function convertFromMicro(totalMicro) {
  let newMin = Math.floor(totalMicro / 6000);
  totalMicro -= newMin * 6000; // 1
  let newSec = Math.floor(totalMicro / 100);
  totalMicro -= newSec * 100; // 1
  let newMicro = totalMicro; // 35

  lapMicro = newMicro;
  lapSec = newSec;
  lapMin = newMin;
}

function startStopwatch() {
  // replace start button with stop button

  // start timer
  prevTimeStamp = Date.now();
  currTimeStamp = Date.now();
  intervalID = setInterval(function () {
    micro++;
    if (micro == 100) {
      micro = 0;
      sec++;
      if (sec == 60) {
        sec = 0;
        min++;
      }
    }
    let txt = document.querySelector(".time-text");
    let formattedTime = formatTime(min, sec, micro);
    txt.innerHTML = formattedTime;
  }, 10);
}

function stopStopwatch() {
  // stop the repeating interval
  clearInterval(intervalID);
}

function lap() {
  let lapText = document.createElement("p");
  let currentTotalMicro = convertToMicro(min, sec, micro);
  let prevTotalMicro = convertToMicro(prevMin, prevSec, prevMicro);
  let totalMicro = currentTotalMicro - prevTotalMicro;
  convertFromMicro(totalMicro);
  lapText.innerHTML = formatTime(lapMin, lapSec, lapMicro);
  lapContainer.appendChild(lapText);
  // set this time as the new previous times
  prevMicro = micro;
  prevSec = sec;
  prevMin = min;
}

function reset() {}

function initialize() {
  buttonContainer = document.querySelector(".button-container");
  lapContainer = document.querySelector(".lap-container");
  addButton(lapButton);
  addButton(startButton);
}

//run functions
createStartStopButtons();
initialize();
