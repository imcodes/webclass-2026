// Attach event listeners to buttons after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    let expressionDisplay = document.getElementById('input')
    let resultDisplay = document.querySelector('#result')
    
    let fnBtns = document.querySelectorAll('.btn-function') // Get all function buttons (numbers, AC,%, backspace, etc)
    let opBtns = document.querySelectorAll('.btn-operator') // Get all operator buttons (+, -, *, /)
    let digitBtns = document.querySelectorAll('.btn-digit') // Get all digit buttons (0-9)

    console.log(`fn: ${fnBtns.length}, op: ${opBtns.length}, digit: ${digitBtns.length}`)

    // Listen for clicks on digit buttons
    digitBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            expressionDisplay.textContent += event.target.dataset.value
        });
    });

    opBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            if(event.target.dataset.value == '=') return calculate()
            expressionDisplay.textContent += event.target.dataset.value
        })
    })

    // Listen for clicks on function buttons
    fnBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            let action = event.target.dataset.action
            switch(action) {
                case 'clear':
                    clear()
                    break
                case 'backspace':
                    backspace()
                    break
                case 'percent':
                    percent()
                    break
                default:
                    break
            }
                     
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
        let result = eval(expression) / 100
        resultDisplay.textContent = result
    }

    function calculate() {
        let expression = expressionDisplay.textContent
        if(expression.length == 0) return
        resultDisplay.textContent =  eval(expression)
    }

});

