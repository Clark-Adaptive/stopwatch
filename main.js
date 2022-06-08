function createStartStopButtons() {
  let startButton = document.createElement("button");
  let stopButton = document.createElement("button");
  startButton.innerHTML = "Start";
  stopButton.innerHTML = "Stop";
}

function startStopwatch() {
  // replace start button with stop button

  // start timer
  let microseconds = 0;
  let seconds = 0;
  let minutes = 0;
  setInterval(function () {
    microseconds++;
    if (microseconds == 100) {
      microseconds = 0;
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
      }
    }
    let txt = document.querySelector(".time-text");
    txt.innerHTML = `${minutes} : ${seconds} : ${microseconds}`;
  }, 10);
}

function stopStopwatch() {}

//run functions
createStartStopButtons();
