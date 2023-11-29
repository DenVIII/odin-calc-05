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
    if (currNum === null && prevNum === null) {
        return;
    } else if (prevNum === null) {
        prevValDisplay.textContent = currValDisplay.textContent + ' ' + this.textContent;
        prevNum = currNum;
        clearCurrValue();
        operator = this.textContent;
    } else if (currNum !== null) {
        prevNum = parseFloat(operate(operator, prevNum, currNum));
        if (isNaN(prevNum)) {
            clearAll()
            maskValDisplay.textContent = 'Invalid input';
        } else {
            prevValDisplay.textContent = prevNum + ' ' + this.textContent;
            clearCurrValue();
            operator = this.textContent;
        }
    } else {
        prevValDisplay.textContent = parseFloat(prevValDisplay.textContent) + ' ' + this.textContent;
        operator = this.textContent;
    }
}

function clearCurrValue() {
    maskValDisplay.textContent = currValDisplay.textContent;
    currValDisplay.textContent = '';
    currNum = null;
}

function clearAll() {
    currValDisplay.textContent = '';
    prevValDisplay.textContent = '';
    maskValDisplay.textContent = '';
    prevNum = null;
    currNum = null;
}

function operate(operator, prevNum, currNum) {
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
    return num2 !== 0 ? num1 / num2 : 'Can\'t divide by zero'
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