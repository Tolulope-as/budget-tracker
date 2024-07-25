const balance = document.getElementById('balance');

const itemName = document.querySelector('.item-name');
const itemAmount = document.querySelector('.item-amount');



function saveInput() {
    const income = document.getElementById('income').value;
    localStorage.setItem('savedInput', income);

}
function loadInput() {
    const savedValue = localStorage.getItem('savedInput');
    if(savedValue){
        document.getElementById('income').value = savedValue;

    }
}
document.getElementById('income').addEventListener('input', saveInput);

let transactions = [];

function loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if(storedTransactions){
        transactions = JSON.parse(storedTransactions);
        displayTransactions();
    }
    sumExpenses();
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
    const newExpense = document.getElementById('new-expense').value;
    const amount = document.getElementById('amount').value;

    const newTransaction = {
    name : newExpense,
    amount : amount  
    };

    transactions.push(newTransaction);
    saveTransactions();
    displayTransactions();
    sumExpenses();
    updateBalance();

    document.getElementById('new-expense').value = '';
    document.getElementById('amount').value = '';

}

function displayTransactions() {
   const expenseItem = document.querySelector('.expense-item');
   expenseItem.innerHTML = '';
   transactions.forEach((transaction, index) => {
    const expenseDiv = document.createElement('div');
    expenseDiv.classList.add('transaction-item') ;
   
   const expenseName = document.createElement('p');
   expenseName.classList.add('item-name')
   expenseName.textContent = `${transaction.name}`;
   expenseDiv.appendChild(expenseName);

    
   const expenseAmount = document.createElement('p');
   expenseAmount.classList.add('item-amount')
   expenseAmount.textContent = `${transaction.amount}`;
   expenseDiv.appendChild(expenseAmount);


   const deleteButton = document.createElement('button');
   const deleteImg = document.createElement('img');
   deleteImg.src = './close.png';
   deleteImg.classList.add('delete-icon') ;
   deleteButton.appendChild(deleteImg);
   deleteButton.classList.add('delete') ;
   deleteButton.addEventListener('click', () => deleteTransaction(index));
   expenseDiv.appendChild(deleteButton);


   expenseItem.appendChild(expenseDiv);
});

}

function sumExpenses() {
    const transactionAmounts  = document.querySelectorAll('.item-amount');
    let totalExpenses = 0;
    transactionAmounts.forEach(amount => {
        totalExpenses += parseFloat(amount.textContent);
    }); 
    document.getElementById('expense').value = totalExpenses ;

};
   
    function updateBalance() {
        const myIncome = parseFloat(document.getElementById('income').value) || 0 ;
        const totalExpense = parseFloat(document.getElementById('expense').value) || 0 ;

        document.getElementById('balance').value = myIncome - totalExpense;
    }

    function deleteTransaction(index) {
    transactions.splice(index, 1);

    saveTransactions();
    displayTransactions();
    sumExpenses();
    updateBalance();
    
}
document.getElementById('income').addEventListener('input', updateBalance);

window.onload = function () {
    loadTransactions();
    loadInput();
    updateBalance();    
};
