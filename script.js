let prevNum = null;
let currNum = null;
let operator = null;

const currValDisplay = document.querySelector('.curr-value');
const prevValDisplay = document.querySelector('.prev-value');
const maskValDisplay = document.querySelector('.mask-value');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        maskValDisplay.textContent = '';
        currValDisplay.textContent += btn.textContent;
        currNum = parseFloat(currValDisplay.textContent);
    })
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', updateDisplay)
})

function updateDisplay() {
    if (prevNum === null) {
        prevValDisplay.textContent = currValDisplay.textContent + ' ' + this.textContent;
        maskValDisplay.textContent = currValDisplay.textContent;
        currValDisplay.textContent = '';

        prevNum = currNum;
        currNum = null;
        operator = this.textContent;
    } else if (currNum !== null) {
        prevValDisplay.textContent = operate(operator, prevNum, currNum) + ' ' + this.textContent;
        maskValDisplay.textContent = currValDisplay.textContent;
        currValDisplay.textContent = '';
        currNum = null;

        prevNum = parseFloat(prevValDisplay.textContent);
        operator = this.textContent;
    } else {
        prevValDisplay.textContent = parseFloat(prevValDisplay.textContent) + ' ' + this.textContent;
        operator = this.textContent;
    }
}

/* function updateDisplay() {
    if (prevNum === null && currNum === null) {
        prevValDisplay.textContent = currValDisplay.textContent + ' ' + this.textContent;
        prevNum = parseFloat(currValDisplay.textContent);
        operator = this.textContent;
        currValDisplay.textContent = '';
    } else {
        currNum = parseFloat(currValDisplay.textContent)
        currValDisplay.textContent = operate(operator, prevNum, currNum);
        prevValDisplay.textContent = currValDisplay.textContent + this.textContent;
        prevNum = currNum = parseFloat(prevValDisplay.textContent);
        currValDisplay.textContent = '';
    }
} */

function operate(operator, prevNum, currNum) {
    console.log(operator)
    switch (operator) {
        case '+':
            return add(prevNum, currNum)
        case '−':
            return subtract(prevNum, currNum)
        case '×':
            return multiply(prevNum, currNum)
        case '÷':
            return divide(prevNum, currNum)
        case '^':
            return Math.pow(prevNum, currNum)
        case '√':
            return Math.sqrt(prevNum)
        case '1/x':
            return inverse(prevNum)
        case '±':
            return negate(prevNum)
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

/* function percentage(operator, prevNum, currNum) {
    if (!currNum) {
        return 0
    }
    
    switch (operator) {
        case '+':
            return add(prevNum, currNum / prevNum * 100)
        case '-':
            return subtract(prevNum, currNum / prevNum * 100)
        case '*':
            return multiply(prevNum, currNum / 100)
        case '/':
            return divide(prevNum, currNum / 100)
    }
} */