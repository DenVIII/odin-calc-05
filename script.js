let prevNum = null;
let currNum = 0;
let operator = null;

const currValDisplay = document.querySelector('.curr-value');
const prevValDisplay = document.querySelector('.prev-value');
const maskValDisplay = document.querySelector('.mask-value');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearAllBtn = document.querySelector('.clear-all');
const clearEntryBtn = document.querySelector('.clear-entry');
const deleteLastCharBtn = document.querySelector('.delete');

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (prevValDisplay.textContent[prevValDisplay.textContent.length - 1] === '=') {
            clearAll();
        }
        if (currNum === 0) {
            currValDisplay.textContent = '';
            currNum = null;
        }
        maskValDisplay.textContent = '';
        currValDisplay.textContent += btn.textContent;
        currNum = parseFloat(currValDisplay.textContent);
    })
});

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', updateDisplay);
})
equalsBtn.addEventListener('click', compute);
clearAllBtn.addEventListener('click', clearAll);
clearEntryBtn.addEventListener('click', clearEntry);
deleteLastCharBtn.addEventListener('click', deleteLastChar);

function updateDisplay() {
    if (currNum === null && prevNum === null) {
        return;
    } 
    else if (this.classList.contains('unary') && currNum !== null) {
        currNum = operate(this.textContent, currNum);
        currValDisplay.textContent = currNum;
    }
    else if (prevNum === null) {
        prevValDisplay.textContent = currValDisplay.textContent + ' ' + this.textContent;
        prevNum = currNum;
        clearCurrValue();
        operator = this.textContent;
    } 
    else if (currNum !== null) {
        compute(this);
    } 
    else {
        prevValDisplay.textContent = parseFloat(prevValDisplay.textContent) + ' ' + this.textContent;
        operator = this.textContent;
    }
}

function compute(e) {
    const oper =  e.textContent || this.textContent
    if (currNum !== null && prevNum !== null) {
        prevNum = parseFloat(operate(operator, prevNum, currNum));
        if (isNaN(prevNum)) {
            clearAll()
            maskValDisplay.textContent = 'Invalid input';
        } 
        else {
            prevValDisplay.textContent = prevNum + ' ' + oper;
            clearCurrValue();
            if (oper !== '=') {
                operator = oper;
            } else {
                operator = null; 
            }
        }
    }
}

function clearCurrValue() {
    maskValDisplay.textContent = prevNum;
    currValDisplay.textContent = '';
    currNum = null;
}

function clearAll() {
    currValDisplay.textContent = '0';
    prevValDisplay.textContent = '';
    maskValDisplay.textContent = '';
    prevNum = null;
    currNum = 0;
}

function clearEntry() {
    if (operator === null) {
        clearAll();
    }
    else if (currNum !== 0) {
        currValDisplay.textContent = '0';
        currNum = 0;
    }
}

function deleteLastChar() {
    if (operator === null && prevNum !== 0) {
        clearAll();
    } 
    else if (currNum === 0) {
        return;
    }
    else if (currValDisplay.textContent.length === 1) {
        currValDisplay.textContent = '0';
        currNum = 0;
    }
    else {
        currValDisplay.textContent = currValDisplay.textContent.slice(0, currValDisplay.textContent.length - 1);
        currNum = parseFloat(currValDisplay.textContent);
    }
}

function operate(operator, currNum, prevNum) {
    switch (operator) {
        case '+':
            return add(currNum, prevNum)
        case '−':
            return subtract(currNum, prevNum)
        case '×':
            return multiply(currNum, prevNum)
        case '÷':
            return divide(currNum, prevNum)
        case '^':
            return Math.pow(currNum, prevNum)
        case '√':
            return Math.sqrt(currNum)
        case '1/x':
            return inverse(currNum)
        case '±':
            return negate(currNum)
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