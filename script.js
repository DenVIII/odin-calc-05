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
const pointBtn = document.querySelector('.point');
const percenteBtn = document.querySelector('.percentage');

numberBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (currValDisplay.textContent.length === 14) {
            return;
        }
        if (prevValDisplay.textContent[prevValDisplay.textContent.length - 1] === '=') {
            clearAll();
        }
        if (currValDisplay.textContent === '0') {
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
});
equalsBtn.addEventListener('click', compute);
clearAllBtn.addEventListener('click', clearAll);
clearEntryBtn.addEventListener('click', clearEntry);
deleteLastCharBtn.addEventListener('click', deleteLastChar);
pointBtn.addEventListener('click', addDecimalPoint);
percenteBtn.addEventListener('click', calcPercente);

function updateDisplay() {
    debugger;
    if (currNum === null && prevNum === null) {
        return;
    } 
    else if (this.classList.contains('unary')) {
        const num = currNum ?? prevNum ?? 0;
        clearAll();
        currNum = operate(this.textContent, num);
        currValDisplay.textContent = expo(roundNumber(currNum));
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
    const oper =  e.textContent || this.textContent;
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

function roundNumber(num) {
    const maxNumLength = 14;
    if (num.toString().length > maxNumLength) {
        return parseFloat(num.toFixed(maxNumLength));
    } else {
        return num;
    }
}

function expo(num) {
    const numberOfDigits = 12;
    if (num.toString().length > numberOfDigits) {
        return parseFloat(num.toExponential(numberOfDigits));
    } else {
        return num;
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

function addDecimalPoint() {
    if (currValDisplay.textContent.includes('.')) {
        return;
    }
    else {
        currValDisplay.textContent += '.';
    }
}

function operate(operator, currNum, prevNum) {
    let result;
    switch (operator) {
        case '+':
            result = add(currNum, prevNum);
            break;
        case '−':
            result = subtract(currNum, prevNum);
            break;
        case '×':
            result = multiply(currNum, prevNum);
            break;
        case '÷':
            result = divide(currNum, prevNum);
            break;
        case '^':
            result = Math.pow(currNum, prevNum);
            break;
        case '√':
            result = Math.sqrt(currNum);
            break;
        case '1/x':
            result = inverse(currNum);
            break;
        case '±':
            result = negate(currNum);
            break;
    }
    return expo(roundNumber(result));
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

function calcPercente() {
    if (!currNum || !prevNum || !operator) {
        return;
    }
    
    switch (operator) {
        case '+':
            currNum = expo(roundNumber(currNum / prevNum * 100));
            break;
        case '−':
            currNum = expo(roundNumber(currNum / prevNum * 100));
            break;
        case '×':
            currNum = expo(roundNumber(currNum / 100));
            break;
        case '÷':
            currNum = expo(roundNumber(currNum / 100));
            break;
    }

    currValDisplay.textContent = currNum;
} 