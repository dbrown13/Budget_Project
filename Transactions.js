"use strict";

let expensesDesc = document.querySelector(".expenses_description");
let expensesAmount = document.querySelector(".expenses_amount");
let tableRecord = document.querySelector(".table_data");
//const cardsContainer = document.querySelector(".cards");

// Cards
let budgetCard = document.querySelector(".budget_card");
let expenseCard = document.querySelector(".expenses_card");
//const balanceCard = document.querySelector(".balance_card");

let itemList = [];
let itemId = 0;
console.log("clear");

// Button Events
function buttonEvents() {
  //const buttonBudgetCalc = document.querySelector('#button_budget');
  const buttonExpensesCalc = document.querySelector('#button_expenses');

  // Event Listener for Budget Event
  //buttonBudgetCalc.addEventListener('click', (e) => {
  //  e.preventDefault();
  //  budgetFunction();
  //})

  buttonExpensesCalc.addEventListener('click', (e) => {
    e.preventDefault();
    expensesFunction();
  })
}

document.addEventListener("DOMContentLoaded", buttonEvents);

function retrieveBudget() {
    const sumBudget = sessionStorage.getItem("sumBudget");
  }
// Expenses Function
function expensesFunction() {
  let expensesDesc = document.querySelector(".expenses_description");
  let expensesAmount = document.querySelector(".expenses_amount");
  //retrieveBudget();
  let expensesDescValue = expensesDesc.value;
  let expensesAmountValue = expensesAmount.value;
  
  if (expensesDescValue == "" || expensesAmountValue == "" || budgetInput < 0) {
  //if (expensesDescValue == "" || expensesAmountValue == "") {
    errorMessageFunction("Please enter expenses description or expenses amount.");
  } else {
    let amount = parseInt(expensesAmountValue);
    expensesAmount.value = "";
    expensesDesc.value = "";

    // Storing value inside object
    let expenses = {
      id: itemId,
      title: expensesDescValue,
      amount: amount,
    };

    itemList.push(expenses);
    itemId++;

    // Add expenses inside the HTML Page
    addExpenses(expenses);
    //showBalance();
    storeExpenses();
    storeItemList();
  }
}

// Add Expenses Function
function addExpenses(expensesItem) {
  let expensesDesc = document.querySelector(".expenses_description");
  let expensesAmount = document.querySelector(".expenses_amount");

  console.log("In addExpenses");
  console.log("expensesItem Title: "+expensesItem.title);
  console.log("expenseItem Id: "+expensesItem.id);

  const tableRecord = document.querySelector(".table_data");


  const html = `<ul class="table_tr_content">
                  <li data-id=${expensesItem.id}>${expensesItem.id}</li>
                  <li>${expensesItem.title}</li>
                  <li><span>$</span>${expensesItem.amount}</li>
                  <li>
                    <button type="button" class="button_edit">Edit</button>
                    <button type="button" class="button_delete">Delete</button>
                  </li>
                </ul>`;

  tableRecord.insertAdjacentHTML("beforeend", html);


  // Edit
  const buttonEdit = document.querySelectorAll('.button_edit');
  const buttonDelete = document.querySelectorAll('.button_delete');
  const contentId = document.querySelectorAll('.table_tr_content');

  // Edit Button Event
  buttonEdit.forEach((editButton) => {
    editButton.addEventListener('click', (e) => {
      //console.log("edit");
      let id;
      contentId.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });
      let element = e.target.parentElement.parentElement;
      element.remove();
      //console.log("id of target = " +id);
      
      // Find matching id in list of expenses
      let expenses = itemList.filter(function(item) {
        return item.id == id;
      })
      
      console.log("expense: "+expenses[0].title);
      expensesDesc.value = expenses[0].title;
      console.log("desc: "+expensesDesc);
      expensesAmount.value = expenses[0].amount;
      console.log("amount: "+expensesAmount);

      let temporaryExpensesList = itemList.filter(function(item) {
        return item.id != id;
      });

      itemList = temporaryExpensesList;
      storeExpenses();
      storeItemList();
    });
  });

  // Delete Button Event
  buttonDelete.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (e) => {
      let id;
      contentId.forEach((ids) => {
        id = ids.firstElementChild.dataset.id;
      });

      let element = e.target.parentElement.parentElement;
      element.remove();

      let temporaryExpensesList = itemList.filter(function(item) {
        return item.id != id;
      })

      itemList = temporaryExpensesList;
      //showBalance();
      storeExpenses();
      storeItemList();
    });
  });
}

// Show Balance Function
function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCard.textContent) - expenses;
  balanceCard.textContent = total;
}
// Store total expenses
function storeExpenses() {
    let sumExpenses = totalExpenses();
    sessionStorage.setItem("sumExpenses", sumExpenses);
}
// Store item list
function storeItemList() {
    sessionStorage.setItem("itemList", JSON.stringify(itemList));
}
function retrieveAll() {
    console.log("retrieve all");
    budgetCard = document.querySelector(".budget_card");
    expenseCard = document.querySelector(".expenses_card");
    const sumBudget = sessionStorage.getItem("sumBudget");
    const sumExpenses = sessionStorage.getItem("sumExpenses");
    itemList = JSON.parse(sessionStorage.getItem("itemList"));
    budgetCard.textContent = sumBudget;
    expenseCard.textContent = sumExpenses;

/*     let expensesDescValue = expensesDesc.value;
    let expensesAmountValue = expensesAmount.value;
  
    //if (expensesDescValue == "" || expensesAmountValue == "" || budgetInput < 0) {
    if (expensesDescValue == "" || expensesAmountValue == "") {
        errorMessageFunction("Please enter expenses description or expenses amount.");
    } else {
        let amount = parseInt(expensesAmountValue);
        expensesAmount.value = "";
        expensesDesc.value = "";

        // Storing value inside object
        let expenses = {
            id: itemId,
            title: expensesDescValue,
            amount: amount,
        };
*/
    itemList.forEach((item) => {
        addExpenses(item);       
    }) 

//tableRecord.insertAdjacentHTML("beforeend", html);
  
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