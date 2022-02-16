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
                result = 'ERROR cannot divide by zero.';
                break;
            }
            result = divide(a, b);
    }
    return Math.floor(result * 100)/100;
}


const numberButtons = document.querySelectorAll('#number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.top-side');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');

let numberArray = [];
let operator = '';
let result = 0;
let counter = 0;

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent == result) {
            display.textContent = '';
            counter = 0;
        }
        else if (counter > 0) {
            counter = 0;
            display.textContent = '';   
        }
        display.textContent = display.textContent + button.textContent;
        displayValue = Number(display.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        
        numberArray.push(displayValue);
        if (numberArray.length === 2) {
            result = numberArray.reduce(
                (a, b) => operate(operator, a, b)
            );
            numberArray = [];
            numberArray.push(result);
            display.textContent = result;
        }
        operator = button.id;
        counter = counter + 1;
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
});

clearButton.addEventListener('click', () => {
    numberArray = [];
    operator = '';
    result = 0;
    display.textContent = '0';
    displayValue = result;
});