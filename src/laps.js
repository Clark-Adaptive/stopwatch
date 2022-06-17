import { convertTocenti, currTime, prevTime, lapTime } from "./time.js";
import { hasStarted } from "./buttons.js";
let $prevMaxLap;
let $prevMinLap;
let $lapContainer;

let longestLapTime;
let shortestLapTime;

let numLaps;

function initializeLaps() {
  numLaps = 1;
  longestLapTime = Number.NEGATIVE_INFINITY;
  shortestLapTime = Number.POSITIVE_INFINITY;
  $lapContainer = document.querySelector(".lap-container");
}

function resetLaps() {
  numLaps = 1;
  $prevMaxLap = null;
  $prevMaxLap = null;
  longestLapTime = Number.NEGATIVE_INFINITY;
  shortestLapTime = Number.POSITIVE_INFINITY;
  //remove all laps
  while ($lapContainer.firstChild) {
    $lapContainer.removeChild($lapContainer.lastChild);
  }
}

function lap() {
  if (!hasStarted) {
    return;
  }
  // reset previous time to be the curren time so we can calculate the next lap time
  prevTime.milli = currTime.milli;
  checkMinMaxLap();
  numLaps++;
  createLapRow();
}

function displayLapTime(formattedTime) {
  if (!$lapContainer.hasChildNodes()) {
    createLapRow();
  }
  let nodes = document.querySelectorAll(".lap-time");
  let $lapTimeText = nodes[0];
  $lapTimeText.innerHTML = formattedTime;
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

  if (!$lapContainer.hasChildNodes()) {
    $lapContainer.appendChild(rowContainer);
  } else {
    $lapContainer.insertBefore(rowContainer, $lapContainer.children[0]);
  }
}

function checkMinMaxLap() {
  let nodes = document.querySelectorAll(".row-container");
  let lapRowContainer = nodes[0];
  let currLapTime = convertTocenti(lapTime);
  console.log(numLaps, shortestLapTime, longestLapTime);
  if (numLaps <= 2) {
    if (currLapTime > longestLapTime) {
      longestLapTime = currLapTime;
      $prevMaxLap = lapRowContainer;
      console.log("max", $prevMaxLap);
    }
    if (currLapTime < shortestLapTime) {
      shortestLapTime = currLapTime;
      $prevMinLap = lapRowContainer;
      console.log("min", $prevMinLap);
    }
    if (numLaps == 2) {
      $prevMaxLap.classList.add("max-lap");
      $prevMinLap.classList.add("min-lap");
    }
  } else {
    if (currLapTime > longestLapTime) {
      longestLapTime = currLapTime;
      lapRowContainer.classList.add("max-lap");
      $prevMaxLap.classList.remove("max-lap");
      $prevMaxLap = lapRowContainer;
    } else if (currLapTime < shortestLapTime) {
      shortestLapTime = currLapTime;
      lapRowContainer.classList.add("min-lap");
      $prevMinLap.classList.remove("min-lap");
      $prevMinLap = lapRowContainer;
    }
  }
}

export { initializeLaps, resetLaps, lap, displayLapTime };
