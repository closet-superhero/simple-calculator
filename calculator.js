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

// Initialize data
let buffer = 0;
let operator = null;
let firstValue = null;
let secondValue = null;
let prevCalc = {};

// Event handlers and helpers
function handleButtonPress(e) {
  if (operatorBtns.includes(this)) {
    handleOperatorAction(this);
  } else if (inputBtns.includes(this)) {
    addToBuffer(this.id);
    updateDisplay(buffer);
  } else {
    switch (this.id) {
      case "ac":
        calcReset();
        break;
      case "neg":
        toggleNeg();
        break;
      case "percent":
        buffer = percent(buffer);
        updateDisplay(buffer);
        break;
    }
  }
}

function toggleNeg() {
  buffer = -buffer;
  updateDisplay(buffer);
}

function handleOperatorAction(element) {
  let result;
  let prevOperator;
  setOperand(buffer);
  buffer = 0;
  if (!operator) {
    setOperator(element.id);
    prevOperator = operator;
  } else {
    prevOperator = operator;
    setOperator(element.id);
  }

  if ((prevOperator == "equals") && (operator == 'equals') && !secondValue) {
    if (prevCalc.operator)
    result = operate(firstValue, prevCalc.secondValue, prevCalc.operator);
    firstValue = result;
  }

  if (firstValue && secondValue && (prevOperator != "equals")) {
    prevCalc = {
      firstValue: firstValue,
      secondValue: secondValue,
      operator: prevOperator,
    };
    result = operate(firstValue, secondValue, prevOperator);
    firstValue = result;
    secondValue = null;
  }

  if (result) {
    updateDisplay(result);
  }
}

function setOperator(elementId) {
  // returns a function if valid operator
  let operatorCallback;
  switch (elementId) {
    case "percent":
      operatorCallback = percent;
      break;
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
      operatorCallback = "equals";
  }
  operator = operatorCallback;
}

function updateDisplay(text) {
  if (!text) {
    display.innerText = "0";
  } else {
    display.innerText = text;
  }
}

function addToBuffer(char) {
  const tempBuffer = buffer.toString().split("");
  if (char == "." && !tempBuffer.includes(char)) {
    tempBuffer.push(char);
    // buffer will be a string until after decimal
    buffer = tempBuffer.join("");
  } else {
    tempBuffer.push(char);
    buffer = parseFloat(tempBuffer.join(""));
  }
}

function setOperand(val) {
  if (!val) {
    return;
  } else if (!firstValue) {
    firstValue = val;
  } else if (!secondValue) {
    secondValue = val;
  } else return;
}

function calcReset() {
  buffer = 0;
  operator = null;
  firstValue = null;
  secondValue = null;
  updateDisplay(buffer);
}

// Set event listeners
buttons.forEach((button) =>
  button.addEventListener("click", handleButtonPress)
);
