let firstNum = 2;
let secondNum = 3;
let operator = '/';

console.log(add(4, 4));
console.log(subtract(2, 2));
console.log(multiply(4, 4));
console.log(divide(2, 2));

console.log(operate(operator, firstNum, secondNum))

const currValDisplay = document.querySelector('.curr-value');
const prevValDisplay = document.querySelector('.prev-value');
const numberBtns = document.querySelectorAll('.number');

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        currValDisplay.textContent += btn.textContent;
    })
});

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum)
        case '-':
            return subtract(firstNum, secondNum)
        case '*':
            return multiply(firstNum, secondNum)
        case '/':
            return divide(firstNum, secondNum)
        case '^':
            return Math.pow(firstNum, secondNum)
        case '&#8730;':
            return Math.sqrt(firstNum)
        case '1/x':
            return inverse(firstNum)
        case '&plusmn;':
            return negate(firstNum)
    }
}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function inverse(number) {
    return 1/number
}

function negate(number) {
    return -1 * number;
}

/* function percentage(operator, firstNum, secondNum) {
    if (!secondNum) {
        return 0
    }
    
    switch (operator) {
        case '+':
            return add(firstNum, secondNum / firstNum * 100)
        case '-':
            return subtract(firstNum, secondNum / firstNum * 100)
        case '*':
            return multiply(firstNum, secondNum / 100)
        case '/':
            return divide(firstNum, secondNum / 100)
    }
} */