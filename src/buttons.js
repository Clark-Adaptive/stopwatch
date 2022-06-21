import { lap, displayLapTime } from "./laps.js";
import { reset } from "./main.js";
import {
  convertFromcenti,
  displayTime,
  formatTime,
  updateTotalTimeElapsed,
  startTime,
  currTime,
  prevTime,
  lapTime,
  totalTimeElapsed,
} from "./time.js";

let $startButton;
let $stopButton;
let $lapButton;
let $resetButton;
let $leftButtonContainer;
let $rightButtonContainer;

let hasStarted;
let intervalID;

function initializeButtons() {
  createStartStopButtons();
  replaceButton($leftButtonContainer, $lapButton);
  replaceButton($rightButtonContainer, $startButton);
}

function resetButtons() {}

function createStartStopButtons() {
  $leftButtonContainer = document.querySelector("#left-button-container");
  $rightButtonContainer = document.querySelector("#right-button-container");

  $startButton = document.createElement("button");
  $stopButton = document.createElement("button");
  $lapButton = document.createElement("button");
  $resetButton = document.createElement("button");

  $startButton.innerHTML = "Start";
  $stopButton.innerHTML = "Stop";
  $lapButton.innerHTML = "Lap";
  $resetButton.innerHTML = "Reset";

  $startButton.classList.add("apple-button", "start-button");
  $stopButton.classList.add("apple-button", "stop-button");
  $lapButton.classList.add("apple-button", "lap-button");
  $resetButton.classList.add("apple-button", "reset-button");

  $startButton.onclick = startStopwatch;
  $stopButton.onclick = stopStopwatch;
  $lapButton.onclick = lap;
  $resetButton.onclick = reset;
}

function replaceButton(buttonContainer, button) {
  if (buttonContainer.hasChildNodes()) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }
  buttonContainer.appendChild(button);
}

function stopStopwatch() {
  hasStarted = false;
  updateTotalTimeElapsed();
  clearInterval(intervalID);

  replaceButton($leftButtonContainer, $resetButton);
  replaceButton($rightButtonContainer, $startButton);
}

function startStopwatch() {
  hasStarted = true;
  replaceButton($rightButtonContainer, $stopButton);
  replaceButton($leftButtonContainer, $lapButton);
  // start timer
  startTime.milli = Date.now();
  intervalID = setInterval(function () {
    currTime.milli = Date.now() - startTime.milli + totalTimeElapsed;
    convertFromcenti(currTime);
    displayTime(formatTime(currTime));

    lapTime.milli = currTime.milli - prevTime.milli;
    convertFromcenti(lapTime);
    displayLapTime(formatTime(lapTime));
  }, 1000 / 60);
}

export { initializeButtons, resetButtons, hasStarted };
