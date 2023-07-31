"use strict";

const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseBtn = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
// console.log(squares);

let currentIndex = 76;
const width = 9;
let timerId;
let outcomeResult;
let currentTime = 20;

const moveFrog = function (e) {
  //   console.log(e);
  squares[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowLeft":
      console.log("moved left!!!");
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;

    case "ArrowRight":
      console.log("moved right!!!");
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;

    case "ArrowUp":
      console.log("moved up!!!");
      if (currentIndex - width > 0) currentIndex -= width;
      break;

    case "ArrowDown":
      console.log("moved down!!!");
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }

  squares[currentIndex].classList.add("frog");
};

const moveLogLeft = function (logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;

    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;

    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;

    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;

    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
};

const moveLogRight = function (logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;

    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;

    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;

    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;

    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
};

const moveCarLeft = function (carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c3");
      break;

    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c1");
      break;

    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c2");
      break;
  }
};

const moveCarRight = function (carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c2");
      break;

    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c3");
      break;

    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c1");
      break;
  }
};

const winGame = function () {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You WIN!!! 🎉🎉🎉";
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
  }
};

const loseGame = function () {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You LOSE!!! 💥💥💥";
    clearInterval(timerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
};

const checkWinLose = function () {
  winGame();
  loseGame();
};

const autoMoveElements = function () {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
};

startPauseBtn.addEventListener("click", function () {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeResult);
    outcomeResult - null;
    timerId = null;
    document.removeEventListener("keyup", moveFrog);
  } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeResult = setInterval(checkWinLose, 50);
    document.addEventListener("keyup", moveFrog);
  }
});
