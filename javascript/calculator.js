// Attach event listeners to buttons after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    let expressionDisplay = document.getElementById('input')
    let resultDisplay = document.querySelector('#result')
    
    let fnBtns = document.querySelectorAll('.btn-function') // Get all function buttons (numbers, AC,%, backspace, etc)
    let opDigitBtns = document.querySelectorAll('.btn-operator, .btn-digit') // Get all operator and digit buttons

    let lastResult = null
    let actions = {
        'clear': clear,
        'backspace': backspace,
        'percent': percent,
        'toggle-sign': toggleSign
    }

    // Listen for clicks on digit buttons
    opDigitBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            if(event.target.dataset.value == '=') return calculate() 
            updateDisplay(event.target.dataset.value)
        });
    });

    // Listen for clicks on function buttons
    fnBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            let action = event.target.dataset.action
            actions[action]()
                     
            console.log(event.target.dataset.action)
            
        })
    })

    function clear() {
        expressionDisplay.textContent = ''
        resultDisplay.textContent = ''
    }

    function backspace(){
        expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1)
    }

    function percent() {
        let expression = expressionDisplay.textContent
        if(expression.length == 0) return
        lastResult = eval(sanitizeExpression(expression)) / 100
        resultDisplay.textContent = lastResult
    }
    
    function toggleSign() {}

    function calculate() {
        let expression = expressionDisplay.textContent
        if(expression.length == 0) return
        lastResult = eval(sanitizeExpression(expression))
        resultDisplay.textContent = lastResult
    }

    function sanitizeExpression(expression) {
        expression = expression.trim()
        if (isNaN(expression.at(-1))) {
            expression = expression.slice(0, -1) // remove last character if it's an operator
            expressionDisplay.textContent = expression
        } 
        return expression
    }

    function updateDisplay(value) {
        let lastChar = expressionDisplay.textContent.slice(-1)
        if (isNaN(value)) { // operator
           if( expressionDisplay.textContent.length == 0) return 
           if (isNaN(lastChar))  expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1)
           if (lastResult !== null) {
                expressionDisplay.textContent = lastResult
                resultDisplay.textContent = ''
                lastResult = null
           }
        }
        if (lastResult !== null && !isNaN(value)) {
           clear()
           lastResult = null
        }
        expressionDisplay.textContent += value
    }
});

