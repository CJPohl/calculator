// default settings
const DEFAULT_SCREEN = '0';
const DEFAULT_OPERATION = '';
const DEFAULT_CURRENT_VALUE = '';
const DEFAULT_PREVIOUS_VALUE = '';
const DEFAULT_CURRENT_OPERATOR = '';

let currentScreen = DEFAULT_SCREEN;
let operation = DEFAULT_OPERATION;
let currentValue = DEFAULT_CURRENT_VALUE;
let previousValue = DEFAULT_PREVIOUS_VALUE;
let currentOperator = DEFAULT_CURRENT_OPERATOR;

// global variables
const clearBtn = document.getElementById('clear');
const plusMinusBtn = document.getElementById('plus/minus');
const divideBtn = document.getElementById('divide');
const sevenBtn = document.getElementById('seven');
const eightBtn = document.getElementById('eight');
const nineBtn = document.getElementById('nine');
const multiplyBtn = document.getElementById('multiply');
const fourBtn = document.getElementById('four');
const fiveBtn = document.getElementById('five');
const sixBtn = document.getElementById('six');
const subtractBtn = document.getElementById('subtract');
const oneBtn = document.getElementById('one');
const twoBtn = document.getElementById('two');
const threeBtn = document.getElementById('three');
const addBtn = document.getElementById('add');
const zeroBtn = document.getElementById('zero');
const decimalBtn = document.getElementById('decimal');
const equalsBtn = document.getElementById('equals');
const buttons = document.querySelectorAll('.buttons');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const dashboard = document.querySelector('.dashboard');
const screen = document.createElement('div');

// script functions
function createScreen() { // creates number window where numbers will appear
    screen.classList.add('screen');
    dashboard.appendChild(screen);
    screen.textContent = currentScreen;
    decimalBtn.addEventListener('click', updateDecimal);
}

function clearScreen() { // function to clear calculator screen
    screen.textContent = '';
    currentScreen = DEFAULT_SCREEN;
    createScreen();
}

function clearValues() { // clear variables
    currentValue = DEFAULT_CURRENT_VALUE;
    previousValue = DEFAULT_PREVIOUS_VALUE;
    operation = DEFAULT_OPERATION;
    currentOperator = DEFAULT_CURRENT_OPERATOR;
}

function clearAll() { // clear all variables and screen
    clearScreen();
    clearValues();
}

function checkLength() { // function to check screen size capacity
    if (currentScreen.length > 15) { // if too big clear screen
        clearScreen();
    }
    if (currentScreen.indexOf('0') == 0) { // remove zero when user starts inputting numbers
        currentScreen = currentScreen.replace('0', '');
    }
}

function updateScreen() { // function to update screen when new numbers are added or operations are made
    if (operation != '0') {
        checkLength();
    }
    screen.textContent = currentScreen;
}

function changeQuality() { // go to negative
    if (currentScreen.includes('-') == false) {
        if (currentScreen.indexOf('0') == 0) { 
            currentScreen = currentScreen.replace('0', '');
        }
        currentScreen = currentScreen.slice(0, 0) + '-' + currentScreen; // inserts negative sign
    }
    else {
        currentScreen = currentScreen.replace('-', '');
    }
    updateScreen();
    storeValue();
}

function storePrevValue() { // when operator is clicked either operation occurs or stores previous value
    if (previousValue !== '') {
        operate()
        previousValue = operation.toString();
    }
    else {
        previousValue = currentValue;
    }
    clearScreen();
}

function storeValue() { // save number clicked
    currentValue = currentScreen;
}

function showResults() { // when equals is clicked, result is shown
    if (currentValue == DEFAULT_CURRENT_VALUE || previousValue == DEFAULT_PREVIOUS_VALUE) { // error for hitting equals button too early
        currentScreen = 'Error';
        updateScreen();
    }
    else {
        operate();
        currentScreen = operation.toString();
        updateScreen();
    }
}

function setCurrentOperator(e) { // sets whether +, -, *, or /
    currentOperator = e.target.id;
}

function operate() { // operator functions
    if (currentOperator == 'divide') {
        divide(previousValue, currentValue);
    }
    if (currentOperator == 'multiply') {
        multiply(previousValue, currentValue);
    }
    if (currentOperator == 'subtract') {
        subtract(previousValue, currentValue);
    }
    if (currentOperator == 'add') {
        add(previousValue, currentValue);
    }
}

function divide(a, b) {
    if (b == 0 || b == '0') { // divide by 0 error
        operation = 'Error';
        updateScreen();
    }
    else {
        operation = a / b;
        operation = roundNum(operation);  
    }
}

function multiply(a, b) {
    operation = a * b;
    operation = roundNum(operation);
}

function subtract(a, b) {
    operation = a - b;
    operation = roundNum(operation);
}

function add(a, b) {
    if (a.includes('.') && b.includes('.') == false) {
        a = parseFloat(a);
        b = parseInt(b);
    }
    else if (a.includes('.') == false && b.includes('.')) {
        a = parseInt(a);
        b = parseFloat(b);
    }
    else if (a.includes('.') && b.includes('.')) {
        a = parseFloat(a);
        b = parseFloat(b);
    }
    else {
        a = parseInt(a);
        b = parseInt(b); 
    }
    
    operation = a + b;
    operation = roundNum(operation);
}

function roundNum(operation) {
    operation = Math.round(operation*100000000000)/100000000000;
    return operation;
}

function update7() {
    currentScreen += '7';
    updateScreen();
}

function update8() {
    currentScreen += '8';
    updateScreen();
}

function update9() {
    currentScreen += '9';
    updateScreen();
}

function update4() {
    currentScreen += '4';
    updateScreen();
}

function update5() {
    currentScreen += '5';
    updateScreen();
}

function update6() {
    currentScreen +='6';
    updateScreen();
}

function update1() {
    currentScreen += '1';
    updateScreen();
}

function update2() {
    currentScreen += '2';
    updateScreen();
}

function update3() {
    currentScreen += '3';
    updateScreen();
}

function update0() {
    currentScreen += '0';
    updateScreen();
}

function updateDecimal() {
    currentScreen += '.';
    updateScreen();
    deactivateDecimal();
}

function deactivateDecimal() { // when decimal is clicked once, deactivate
    decimalBtn.removeEventListener('click', updateDecimal);
}

function clickButton(e) { // function for button clicks
    e.target.classList.add('clicked');
    setTimeout(function() {
        e.target.classList.remove('clicked');
    }, 50);
}   

// onload
window.onload = function() {
    clearBtn.addEventListener('click', clearAll);
    plusMinusBtn.addEventListener('click', changeQuality);
    sevenBtn.addEventListener('click', update7);
    eightBtn.addEventListener('click', update8);
    nineBtn.addEventListener('click', update9);
    fourBtn.addEventListener('click', update4);
    fiveBtn.addEventListener('click', update5);
    sixBtn.addEventListener('click', update6);
    oneBtn.addEventListener('click', update1);
    twoBtn.addEventListener('click', update2);
    threeBtn.addEventListener('click', update3);
    zeroBtn.addEventListener('click', update0);
    decimalBtn.addEventListener('click', updateDecimal);
    equalsBtn.addEventListener('click', showResults);
    buttons.forEach(button => button.addEventListener('click', clickButton));
    numbers.forEach(number => number.addEventListener('click', storeValue));
    operators.forEach(operator => operator.addEventListener('click', storePrevValue));
    operators.forEach(operator => operator.addEventListener('click', setCurrentOperator));
    createScreen();
}