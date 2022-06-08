function createStartStopButtons() {
  let startButton = document.createElement("button");
  let stopButton = document.createElement("button");
  startButton.innerHTML = "Start";
  stopButton.innerHTML = "Stop";
}

function startStopwatch() {
  // replace start button with stop button

  // start timer
  let micro = 0;
  let sec = 0;
  let min = 0;
  setInterval(function () {
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
    let formattedMicro = micro.toString().padStart(2, "0");
    let formattedSec = sec.toString().padStart(2, "0");
    let formattedMin = min.toString().padStart(2, "0");
    txt.innerHTML = `${formattedMin} : ${formattedSec} : ${formattedMicro}`;
  }, 10);
}

function stopStopwatch() {}

//run functions
createStartStopButtons();
