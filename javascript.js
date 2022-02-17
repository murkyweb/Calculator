const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
    switch (operator) {
        case 'add':
            result = add(a, b);
            break;
        case 'substract':
            result = substract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            if (a === 0 || b === 0) {
                display.textContent = 'ERROR';
                return result = 0;
            }
            result = divide(a, b);
    }
    return Math.floor(result * 100)/100;
}


const numberButtons = document.querySelectorAll('#number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.top-side');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('#decimal');

let numberArray = [];
let operator = '';
let result = 0;
let counter = 1;

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (counter || display.textContent == '0') {
            counter = 0;
            display.textContent = '';   
        }
        if (display.textContent.length >= 13) {
            display.textContent = display.textContent;
        }
        else {
            display.textContent = display.textContent + button.textContent;
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => { 
        displayValue = Number(display.textContent);
        numberArray.push(displayValue);
        //checks if there are enough numbers in the array to start operation.
        if (numberArray.length === 2) {
            result = numberArray.reduce(
                (a, b) => operate(operator, a, b)
            );
        //empties the array and puts the result from previous operation in the array.
            numberArray = [];
            numberArray.push(result);
            display.textContent = result;
        }
        operator = button.id;
        counter = 1;
    });
});

equalButton.addEventListener('click', () => {
    displayValue = Number(display.textContent);
    numberArray.push(displayValue);
    result = numberArray.reduce(
        (a, b) => operate(operator, a, b)
    );
    numberArray = [];
    display.textContent = result;
    displayValue = result;
    counter = 1;
});

clearButton.addEventListener('click', () => {
    numberArray = [];
    operator = '';
    result = 0;
    counter = 1;
    display.textContent = '0';
});

decimalButton.addEventListener('click', (e) => {
    if (display.textContent.includes('.')) {
        display.textContent = display.textContent;
    } 
    else {
        display.textContent = display.textContent + decimalButton.textContent;
    } 
    counter = 0;
});