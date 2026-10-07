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

});

