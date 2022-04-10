// Calculation functions
function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

function operate(a, b, operatorCallback) {
  return operatorCallback(a, b);
}

// Get calculator components
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');





