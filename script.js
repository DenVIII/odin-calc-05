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
