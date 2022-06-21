import { convertTocenti, currTime, prevTime, lapTime } from "./time.js";
import { hasStarted } from "./buttons.js";
let $prevMaxLap;
let $prevMinLap;
let $lapContainer;

let longestLapTime;
let shortestLapTime;

let numLaps;
// make a variable for the number of laps that fit on the screen to help with creating empty table with lines
let numLapsThatFitOnScreen;
let rowHeight;

function initializeLaps() {
  numLaps = 1;
  longestLapTime = Number.NEGATIVE_INFINITY;
  shortestLapTime = Number.POSITIVE_INFINITY;
  $lapContainer = document.querySelector(".lap-container");
  fillTableWithEmptyRows();
}

function fillTableWithEmptyRows() {
  numLapsThatFitOnScreen = Math.floor(
    (rowHeight = $lapContainer.offsetHeight / createEmptyRow().offsetHeight)
  );
  for (let a = 0; a < numLapsThatFitOnScreen - 1; a++) {
    createEmptyRow();
  }
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
  fillTableWithEmptyRows();
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
  let nodes = document.querySelectorAll(".lap-time");
  let $lapTimeText = nodes[0];
  $lapTimeText.innerHTML = formattedTime;
}

function createEmptyRow() {
  // this function is used so we can get the height of the row to determine how many rows we can fit onto the table initially to draw the lines
  let rowContainer = document.createElement("li");
  let lapNumber = document.createElement("p");
  let lapTimeText = document.createElement("p");

  lapNumber.innerHTML = "_";
  lapTimeText.innerHTML = "_";
  lapTimeText.classList.add("lap-time");

  rowContainer.classList.add("row-container", "blank-row");
  rowContainer.appendChild(lapNumber);
  rowContainer.appendChild(lapTimeText);
  $lapContainer.appendChild(rowContainer);
  return rowContainer;
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

  $lapContainer.insertBefore(rowContainer, $lapContainer.children[0]);
  if (numLaps <= numLapsThatFitOnScreen) {
    // remove one of the rows form the bottom
    $lapContainer.removeChild($lapContainer.lastChild);
  }
}

function checkMinMaxLap() {
  let nodes = document.querySelectorAll(".row-container");
  let lapRowContainer = nodes[0];
  let currLapTime = convertTocenti(lapTime);
  if (numLaps <= 2) {
    if (currLapTime > longestLapTime) {
      longestLapTime = currLapTime;
      $prevMaxLap = lapRowContainer;
    }
    if (currLapTime < shortestLapTime) {
      shortestLapTime = currLapTime;
      $prevMinLap = lapRowContainer;
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

function handleFirstLap() {
  if (numLaps == 1) {
    createLapRow();
  }
}

export { initializeLaps, resetLaps, lap, displayLapTime, handleFirstLap };
