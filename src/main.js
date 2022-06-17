//import statements
import { initializeButtons, resetButtons } from "./buttons.js";
import { initializeTime, resetTime } from "./time.js";
import { initializeLaps, resetLaps } from "./laps.js";
// global variables

// start of functions

function initialize() {
  initializeButtons();
  initializeTime();
  initializeLaps();
}

function reset() {
  resetButtons();
  resetTime();
  resetLaps();
}

//run functions

initialize();
export { reset };
