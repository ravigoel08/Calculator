const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector('.calculator_answer');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const show = display.textContent;
        const content = key.textContent;
        const previousKey = calculator.dataset.previousKeyType;

        if (!action) {
            display.textContent = resultString(show, previousKey, content);
            calculator.dataset.previousKeyType = 'number';
        }
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            calculatorConfig('operator_key', show, action);
        }

        if (action == 'clear') {
            display.textContent = 0;
            calculatorConfig('clear', 0, action);
        }

        if (action == 'calculate') {
            let first = calculator.dataset.first;
            let second = show;
            const operator = calculator.dataset.operator;

            if (first && operator) {
                display.textContent = calculate(first, second, operator);
            }
            calculatorConfig('calculator', display.textContent, action);
        }

        if (action == 'dev') {
            alert('Made with ❤ and 🔨 by Ravi')
        }
    }
})

// string to display

const resultString = (show, previousKey, content) => {
    if (show === '0' || previousKey === 'operator_key') {
        return content;
    }
    else {
        return show + content;
    }
}

// calculate function with switch statement

const calculate = (first, second, operator) => {
    let result = '';
    switch (operator) {
        case 'add':
            result = parseInt(first) + parseInt(second);
            break;
        case 'subtract':
            result = parseInt(first) - parseInt(second);
            break;
        case 'multiply':
            result = parseInt(first) * parseInt(second);
            break;
        case 'divide':
            result = parseInt(first) / parseInt(second);
            break;
    }
    return result;

}

// change the configs

const calculatorConfig = (previousKeyType, lastValue, operator) => {
    calculator.dataset.previousKeyType = previousKeyType;
    calculator.dataset.first = lastValue;
    calculator.dataset.operator = operator;
}
