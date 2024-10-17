"use strict";
//export {budgetValue};

const errorMessage = document.querySelector(".error_message");
const budgetInput = document.querySelector(".budget_input");
const expensesDesc = document.querySelector(".expenses_description");
const expensesAmount = document.querySelector(".expenses_amount");
const tableRecord = document.querySelector(".table_data");
const cardsContainer = document.querySelector(".cards");

// Cards
const budgetCard = document.querySelector(".budget_card");
const expenseCard = document.querySelector(".expenses_card");
const balanceCard = document.querySelector(".balance_card");

let itemList = [];
let itemId = 0;

// Button Events
function buttonEvents() {
  const buttonBudgetCalc = document.querySelector('#button_budget');
  const buttonExpensesCalc = document.querySelector('#button_expenses');

  // Event Listener for Budget Event
  buttonBudgetCalc.addEventListener('click', (e) => {
    e.preventDefault();
    budgetFunction();
  })

  buttonExpensesCalc.addEventListener('click', (e) => {
    e.preventDefault();
    expensesFunction();
  })

}

document.addEventListener("DOMContentLoaded", buttonEvents);


// Budget Function
function budgetFunction() {
  const budgetValue = budgetInput.value;
  alert(budgetValue);
  if (budgetValue == "" || budgetValue < 0) {
    errorMessageFunction("Please enter a budget that is more than 0.");
  } else {
    budgetCard.textContent = budgetValue;
    budgetInput.value = "";
    showBalance();
  }
}

// Show Balance Function
function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCard.textContent) - expenses;
  balanceCard.textContent = total;
}

// Total Expenses Function
function totalExpenses() {
  let total = 0;

  if (itemList.length > 0) {
    total = itemList.reduce(function(acc,curr) {
      acc += curr.amount;
      return acc;
    }, 0)
  }
  expenseCard.textContent = total;
  return total;
}

// Error Message Function
function errorMessageFunction(message) {
  errorMessage.innerHTML = `<p>${message}<p>`;
    errorMessage.classList.add('error');
    setTimeout(() => {
      errorMessage.classList.remove('error')
    }, 2500);
}
export {budgetValue};
