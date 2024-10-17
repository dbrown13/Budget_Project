"use strict";

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

/*   buttonExpensesCalc.addEventListener('click', (e) => {
    e.preventDefault();
    expensesFunction();
  }) */

}

document.addEventListener("DOMContentLoaded", buttonEvents);


// Budget Function
function budgetFunction() {
  console.log(budgetInput.value);
  const budgetValue = budgetInput.value;
  if (budgetValue == "" || budgetValue < 0) {
    errorMessageFunction("Please enter a budget that is more than 0.");
  } else {
    budgetCard.textContent = budgetValue;
    showBalance();
    storeBudget();
    budgetInput.value = "";
  }
}
function storeBudget() {
  let sumBudget = document.getElementById("budget_input").value;
  console.log("Saved: "+sumBudget);
  sessionStorage.setItem("sumBudget", sumBudget);
}
function retrieveAll() {
  console.log("retrieve all");
  const budgetCard = document.querySelector(".budget_card");
  const expenseCard = document.querySelector(".expenses_card");
  const balanceCard = document.querySelector(".balance_card");
  const sumBudget = sessionStorage.getItem("sumBudget");
  const sumExpenses = sessionStorage.getItem("sumExpenses");
  const sumBalance = sumBudget - sumExpenses;
  budgetCard.textContent = sumBudget;
  expenseCard.textContent = sumExpenses;
  balanceCard.textContent = sumBalance;
}
function retrieveBudget() {
  console.log("retrieve budget");
  const budgetCard = document.querySelector(".budget_card");
  const sumBudget = sessionStorage.getItem("sumBudget");
  if (!sumBudget) {
    console.log("null")
  } else {
    console.log("SumBudget:", sumBudget);
    budgetCard.textContent = sumBudget;
  }
}
function retrieveExpenses() {
  console.log("retrieve expenses");
  const expenseCard = document.querySelector(".expenses_card");
  console.log("expenseCard: "+expenseCard);
  const sumExpenses = sessionStorage.getItem("sumExpenses");
  if (!sumExpenses) {
    console.log("null")
  } else {
    console.log("SumExpenses:", sumExpenses);
    expenseCard.textContent = sumExpenses;
  }
}
// Show Balance Function
function showBalance() {
  const balanceCard = document.querySelector(".balance_card");
  const budgetCard = document.querySelector(".budget_card");
  const expenses = totalExpenses();
  const total = parseInt(budgetCard.textContent) - expenses;
  balanceCard.textContent = total;
}

// Total Expenses Function
function totalExpenses() {
  let expenseCard = document.querySelector(".expenses_card");

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
