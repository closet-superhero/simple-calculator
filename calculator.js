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

// Event handlers and helpers
function handleButtonPress(e) {
  if (operatorBtns.includes(this)) {
    setValue(buffer);
    operator = setOperator(this.id);
    buffer = 0;
  } else if (inputBtns.includes(this)) {
    addToBuffer(this.id);
    updateDisplay(buffer);
  } else {
    switch (this.id) {
      case 'ac':
        calcReset();
        break;
      case 'neg':
        toggleNeg()
        break;
      case 'equals':
        break;    
    }
  }
};

function toggleNeg() {
    buffer = -buffer;
    updateDisplay(buffer);
};

function setOperator(operator) {
  // returns a function if valid operator
  switch (operator) {
    case "percent":
      return percent;
      break;
    case "divide":
      return divide;
      break;
    case "multiply":
      return multiply;
      break;
    case "add":
      return add;
      break;
    case "subtract":
      return subtract;
      break;
    default:
      updateDisplay("ERROR");
  }
};

function updateDisplay(text) {
  if (!text) {
    display.innerText = '0';
  }else {
    display.innerText = text;
  }
};

function addToBuffer(char) {
  const tempBuffer = buffer.toString().split('');
  if (char == '.' && !tempBuffer.includes(char)){
    tempBuffer.push(char);
    // buffer will be a string until after decimal
    buffer = tempBuffer.join('');
  } else {
    tempBuffer.push(char);
    buffer = parseFloat(tempBuffer.join(''));
  }
};

function setValue(val) {
  if (!firstValue) {
    firstValue = val;
  } else {
    secondValue = val;
  }
};

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
