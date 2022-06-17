let currTime;
let startTime;
let prevTime;
let lapTime;
let totalTimeElapsed;

let $timeText;

function initializeTime() {
  resetTimeObjects();
  $timeText = document.querySelector(".time-text");
}

function resetTime() {
  resetTimeObjects();
  //display 00:00.00 on the timer
  displayTime(formatTime(currTime));
}

function formatTime(timeObject) {
  const formattedcenti = timeObject.centi.toString().padStart(2, "0");
  const formattedSec = timeObject.sec.toString().padStart(2, "0");
  const formattedMin = timeObject.min.toString().padStart(2, "0");
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

function displayTime(formattedTime) {
  $timeText.innerHTML = formattedTime;
}

function resetTimeObjects() {
  currTime = { time: "curr", min: 0, sec: 0, centi: 0, milli: 0 };
  startTime = { time: "start", min: 0, sec: 0, centi: 0, milli: 0 };
  prevTime = { time: "prev", min: 0, sec: 0, centi: 0, milli: 0 };
  lapTime = { time: "lap", min: 0, sec: 0, centi: 0, milli: 0 };
  totalTimeElapsed = 0;
}

function updateTotalTimeElapsed() {
  totalTimeElapsed += currTime.milli - totalTimeElapsed;
}

export {
  initializeTime,
  resetTime,
  convertFromcenti,
  convertTocenti,
  displayTime,
  formatTime,
  updateTotalTimeElapsed,
  startTime,
  currTime,
  prevTime,
  lapTime,
  totalTimeElapsed,
};
