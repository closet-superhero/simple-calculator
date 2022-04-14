// Calculation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function percent(a) {
  return a / 100;
}

function operate(a, b, operatorCallback) {
  return operatorCallback(a, b);
}

// Get calculator components
const display = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll(".button"));
const operatorBtns = buttons.filter((button) => {
  return button.classList.contains("operator");
});
const inputBtns = buttons.filter((button) => {
  return button.classList.contains("input");
});
const funcBtns = buttons.filter((button) => {
  return button.classList.contains("function");
});

// Initialize data
let inputBuffer = "0";
const input = [];
const MAX_DISPLAY_LENGTH = 9;
let operator = null;
display.value = 0;

// Set event listeners

inputBtns.forEach((button) =>
  button.addEventListener("mousedown", handleInput)
);

operatorBtns.forEach((button) =>
  button.addEventListener("mousedown", handleOperator)
);

funcBtns.forEach((button) =>
  button.addEventListener("mousedown", handleFuncBtn)
);

// Event functions

function handleInput(e) {
  // this refers to the target element
  if (this.id == "." && inputBuffer.includes(".")) {
    return;
  } else if (display.value.length < MAX_DISPLAY_LENGTH) {
    inputBuffer += this.id;
  }
  if (inputBuffer == ".") {
    inputBuffer = "0.";
  }
  updateDisplay(parseFloat(inputBuffer));
}

function handleOperator(e) {
  const numFromBuffer = parseFloat(inputBuffer);
  let numOfArgs;
  let result;
  if (!operator) {
    operator = setOperator(this.id);
  }

  if (operator && numFromBuffer != NaN) {
    numOfArgs = input.push(numFromBuffer);
    inputBuffer = "0";
  }

  if (numOfArgs == 2 && operator) {
    result = input.reduce((a, b) => operate(a, b, operator));
    input.splice(0, numOfArgs, result);
    updateDisplay(result);
  }

  operator = setOperator(this.id);
}

function handleFuncBtn(e) {
  switch (this.id) {
    case "ac":
      calcReset();
      break;
    case "neg":
      toggleNeg();
      break;
    case "percent":
      break;
  }
}

function setOperator(elementId) {
  // returns a function if valid operator else null
  let operatorCallback;
  switch (elementId) {
    case "divide":
      operatorCallback = divide;
      break;
    case "multiply":
      operatorCallback = multiply;
      break;
    case "add":
      operatorCallback = add;
      break;
    case "subtract":
      operatorCallback = subtract;
      break;
    default:
      operatorCallback = null;
  }
  return operatorCallback;
}

// Displaying data

function updateDisplay(num) {
  display.value = num;
}

function toggleNeg() {
  let negBuffer;
  if (inputBuffer == 0) {
    if (input.length == 0) {
      return;
    } else {
      // so we can do math with result of prev calculation
      negBuffer = parseFloat(-input[0]);
      input.splice(0);
    }
  } else {
    negBuffer = parseFloat(-inputBuffer);
  }
  inputBuffer = negBuffer.toString();
  updateDisplay(negBuffer);
}

function calcReset() {
  inputBuffer = "0";
  operator = null;
  input.splice(0);
  updateDisplay(0);
}
