// default settings
const DEFAULT_SCREEN = '0';

let currentScreen = DEFAULT_SCREEN;
let operation;

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

function checkLength() { // function to check screen size capacity
    if (currentScreen.length > 14) { // if too big clear screen
        clearScreen();
    }
    if (currentScreen.indexOf('0') == 0) { // remove zero when user starts inputting numbers
        currentScreen = currentScreen.replace('0', '');
    }
}

function updateScreen() { // function to update screen when new numbers are added or operations are made
    checkLength();
    screen.textContent = currentScreen;
}

function changeQuality() {
    if (currentScreen.includes('-') == false) {
        currentScreen = currentScreen.slice(0, 0) + '-' + currentScreen;
    }
    else {
        currentScreen = currentScreen.replace('-', '');
    }
    updateScreen();
}

function divide(a, b) {
    operation = a / b;
    currentScreen = operation;
    updateScreen();
}

function multiply(a, b) {
    operation = a * b;
    currentScreen = operation;
    updateScreen();
}

function subtract(a, b) {
    operation = a - b;
    currentScreen = operation;
    updateScreen();
}

function add(a, b) {
    operation = a + b;
    currentScreen = operation;
    updateScreen();
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

function deactivateDecimal() {
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
    clearBtn.addEventListener('click', clearScreen);
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
    buttons.forEach(button => button.addEventListener('click', clickButton));
    createScreen();
}