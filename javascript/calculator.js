// Attach event listeners to buttons after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    let expressionDisplay = document.getElementById('input')
    let resultDisplay = document.querySelector('#result')

    let historyBtn = document.querySelector('#btn-history')
    
    let fnBtns = document.querySelectorAll('.btn-function') // Get all function buttons (numbers, AC,%, backspace, etc)
    let opDigitBtns = document.querySelectorAll('.btn-operator, .btn-digit') // Get all operator and digit buttons

    let lastResult = null
    // map function names to their corresponding functions
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
            // Get the action from the button's data-action attribute and call the corresponding function
            let action = event.target.dataset.action 
            actions[action]() // Call the corresponding function based on the action
                     
            console.log(event.target.dataset.action)
            
        })
    })

    // Listen for clicks on our History button
    historyBtn.addEventListener('click', event => {
        let history = JSON.parse(localStorage.getItem('history'))
        if (!history) return
        let ul = document.createElement('ul')
        ul.setAttribute('id','h-list')
        for (let h of history) {
            let li = document.createElement('li')
            li.innerHTML = `<span class='h-expresson'>${h.expression}</span> <strong class='h-result'>${h.result}</strong>`
            li.classList.add('h-item')
            ul.appendChild(li)
        }
        resultDisplay.textContent = ''
        expressionDisplay.textContent = ''
        expressionDisplay.appendChild(ul)
        console.log(h)
    })

    function clearScreen() {
        expressionDisplay.textContent = ''
        resultDisplay.textContent = ''
    }

    function clear () {
        clearScreen()
        localStorage.clear()
    }

    function backspace(){
        expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1)
    }

    // Calculate the percentage of the current expression and display the result
    function percent() {
        let expression = expressionDisplay.textContent
        if(expression.length == 0) return
        lastResult = eval(sanitizeExpression(expression)) / 100
        resultDisplay.textContent = lastResult
    }
    
    function toggleSign() {}

    // Evaluate the expression and display the result
    function calculate() {
        let expression = sanitizeExpression(expressionDisplay.textContent)
        if(expression.length == 0) return
        lastResult = eval(expression)
        resultDisplay.textContent = lastResult
        let hist = {
            'expression' : expression, 
            'result' : lastResult
        }
        let currentHistory = JSON.parse(localStorage.getItem('history')) ?? []
        currentHistory.push(hist)
        localStorage.setItem('history',JSON.stringify(currentHistory))
    }

    // Sanitize the expression by removing any trailing operators before evaluation
    function sanitizeExpression(expression) {
        expression = expression.trim() // remove whitespace
        if (isNaN(expression.at(-1))) { // check if the last character is not a number (i.e an operator)
            expression = expression.slice(0, -1) // remove last character if it's an operator
            expressionDisplay.textContent = expression
        } 
        return expression
    }

    // Update the expression display (input) with new value
    function updateDisplay(value) {
        let lastChar = expressionDisplay.textContent.slice(-1)
        if (isNaN(value)) { // If the value is not a number (i.e., it's an operator - +,-,*,/)
           if( expressionDisplay.textContent.length == 0) return 
           // If the last character is not a number (i.e operator) then remove it before adding the new operator
           if (isNaN(lastChar))  expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1)
           // If the last result is not null, display it in the expression display and clear the result display
            if (lastResult !== null) {
                expressionDisplay.textContent = lastResult
                resultDisplay.textContent = ''
                lastResult = null
           }
        }
        // If the last result is not null and the value is a number, clear the display before adding the new value
        if (lastResult !== null && !isNaN(value)) {
           clearScreen()
           lastResult = null
        }
        // Append the new value to the expression display
        expressionDisplay.textContent += value
    }
});



