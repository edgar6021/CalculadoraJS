document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    let operator = '';
    let firstOperand = '';
    let waitingForSecondOperand = false;

    keys.addEventListener('click', (event) => {
        if (!event.target.closest('button')) return;

        const key = event.target;
        const action = key.classList.contains('operator') ? 'operator' : key.classList.contains('equal-sign') ? 'equal-sign' : key.classList.contains('all-clear') ? 'all-clear' : 'number';

        if (action === 'number') {
            handleNumber(key.value);
        } else if (action === 'operator') {
            handleOperator(key.value);
        } else if (action === 'equal-sign') {
            handleEqual();
        } else if (action === 'all-clear') {
            handleAllClear();
        }
    });

    function handleNumber(number) {
        if (waitingForSecondOperand) {
            calculatorScreen.value = number;
            waitingForSecondOperand = false;
        } else {
            calculatorScreen.value = calculatorScreen.value === '0' ? number : calculatorScreen.value + number;
        }
    }

    function handleOperator(nextOperator) {
        const value = calculatorScreen.value;
        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === '') {
            firstOperand = value;
        } else if (operator) {
            const result = calculate(firstOperand, value, operator);
            calculatorScreen.value = result;
            firstOperand = result;
        }

        operator = nextOperator;
        waitingForSecondOperand = true;
    }

    function handleEqual() {
        if (operator && firstOperand) {
            const result = calculate(firstOperand, calculatorScreen.value, operator);
            calculatorScreen.value = result;
            operator = '';
            firstOperand = '';
            waitingForSecondOperand = false;
        }
    }

    function handleAllClear() {
        calculatorScreen.value = '';
        operator = '';
        firstOperand = '';
        waitingForSecondOperand = false;
    }

    function calculate(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);
        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '*') return first * second;
        if (operator === '/') return first / second;
    }
});
