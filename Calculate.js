const display = document.getElementById('display');
const addInput = document.getElementById('add');
let result = 0;
let expression = '';

function appendDisplay(value){
    const caracter = expression.slice(-1);
    if ((value === '+' || value === '-' ||value === '*' || value === '/' || value === '.' ) &&
         (caracter === '+' || caracter === '-' || caracter === '*' || caracter === '/'|| caracter === '.' ))
{
         return;   
}
         expression += value;  
         display.value += value; 

         addInput.value += ' ';
}

function clearDisplay(){
    display.value = '';
}

function clearAdd(){
    addInput.value = '';
}

function calculateResult(){
    let valor = eval(display.value);
    if (!isNaN(valor)){
        result = valor;
        display.value = result;
        addInput.value += result +'\n';
}else{
    display.value = 'Error';
}

}