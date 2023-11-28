const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const divideBtn = document.getElementById('divide');
const multiplyBtn = document.getElementById('multiply');
const subBtn = document.getElementById('sub');
const addBtn = document.getElementById('add');
const decimalBtn = document.getElementById('decimal');
const equalBtn = document.getElementById('equal');
const numberBtns = document.querySelectorAll('.number');

// initialize the variables
let result = '';
let operation = '';
let previousOperand = 0;

// Function to append number
const appendNumber =(number) =>{
    if(number === '.' && result.includes('.')) return;
    result+=number;
    updateDisplay();
}

// function to update display
const updateDisplay = () =>{
    if(operation){
        resultElement.innerText =`${previousOperand} ${operation} ${result}`;
        
    }else{
        resultElement.innerText=result;
    }
}

//function to select operator
const selectOperator = (operatorValue) =>{
    if(result==='') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result='';
    updateDisplay();
}

// function to calculate result
const calculateResult = () => {
    let evaluatedResult;
    const prev =parseFloat(previousOperand) ;
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            evaluatedResult=prev+current;
            break;
        case '-':
            evaluatedResult=prev-current;
            break;
        case '*':
            evaluatedResult=prev*current;
            break;
        case '/':
            evaluatedResult=prev/current;
            break;
    
        default:
            return;
    }
    result = evaluatedResult.toString();
    operation ='';
    previousOperand='';
}


// Add event listener to number buttons
numberBtns.forEach(button =>{
    button.addEventListener('click',()=>{
        appendNumber(button.innerText);
    });
})

//function to clear display
const clearDisplay = () => {
    result='';
    previousOperand ='';
    operation ='';
    updateDisplay();
}

//function to delete last character from display

const deleteLastDigit =()=>{
    if(operation !=="" && result ===""){
        operation = "";
        result = previousOperand;
        previousOperand = "";
        updateDisplay();
    }else{
        result=result.slice(0,-1);
        updateDisplay();
    }

}

decimalBtn.addEventListener('click',()=> appendNumber('.'));
addBtn.addEventListener('click',()=> selectOperator('+'));
subBtn.addEventListener('click',()=> selectOperator('-'));
multiplyBtn.addEventListener('click',()=> selectOperator('*'));
divideBtn.addEventListener('click',()=>selectOperator('/'));
equalBtn.addEventListener('click',()=>{
    if(result==='') return;
    calculateResult();
    updateDisplay();
});
clearBtn.addEventListener('click',clearDisplay);
deleteBtn.addEventListener('click',deleteLastDigit);
