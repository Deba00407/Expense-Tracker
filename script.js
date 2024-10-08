document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseBlock = document.querySelector('.expenses');
    const expenseList = document.querySelector('#expense-list');
    const addBtn = document.getElementById('addBtn');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    renderExpenses();
    calculateTotal(); 

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());
        if (name === '' || isNaN(amount) || amount <= 0) return;
        let newExpense = {
            id: Date.now(),
            name,
            amount
        };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseName.value = '';
        expenseAmount.value = '';
        expenseList.innerHTML = '';
        renderExpenses();
        calculateTotal();
    });

    addBtn.addEventListener('click', () => {
        calculateTotal();
        renderExpenses();
    });

    function calculateTotal() {
        const totalAmount = expenses.reduce((acc, curr) => {
            return acc += curr.amount;
        }, 0);
        totalAmountDisplay.innerHTML = `Total: ${totalAmount}$`;
    }

    function renderExpenses() {
        expenseList.innerHTML = ''; 
        expenses.forEach(expense => {
            const newExpense = document.createElement('li');
            newExpense.innerHTML = `
                <span>${expense.name}</span>
                <div class = "expense-container">
                    <span>${expense.amount}$</span>
                    <button id="remove-btn">Remove</button>
                </div>
            `;
            expenseList.appendChild(newExpense);

            const removeBtn = newExpense.querySelector('#remove-btn');
            removeBtn.addEventListener('click', () =>{
                expenses = expenses.filter(exp => exp.id !== expense.id);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                expenseList.innerHTML = '';
                renderExpenses();
                calculateTotal();
            })
        });
    }
});