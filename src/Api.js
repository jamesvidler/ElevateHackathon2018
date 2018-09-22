// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";

const req = require('request-promise-native'); // use Request library + promises to reduce lines of code

const teamToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMzhiYzJhMTItODU2ZC0zZTkwLWIzYzgtMDIyM2YyMTAwYzNlIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiIxNTI4Y2YwMy1mZjFlLTQ2NDctYTc2ZS0zOTBiOGIzMmRjYjgifQ.frju2AIe3H7orMWYpIhtAws0bI4nO1Hs5k11wx5TZcE";
const initialCustomerId = "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53";

var allTransactions = [];
var numOfNewTransactions = 0;
var categoryTags = [];
var reoccuringTags = [];
var reoccuringTransactions = [];

function options(method, uri, body = null) {
  return {
    json: true,
    body: body,
    uri: 'https://api.td-davinci.com/api/' + uri,
    method: method,
    headers: { 'Authorization': teamToken }
  };
}

/*
  Initializes the allTransactions array with all the transactions that the customer has made
  This function should be called before any other calls are made
*/
function initTransactionsArray() {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId + '/transactions'))
    .then((resp) => {
      const transactions = resp.result;
      const length = resp.result.length;
      for( var i = 0; i < length; i++) {
        allTransactions.push(transactions[i]);
        console.log("Test");
      } 
      return 0; // test
    }, handleError)
  })();
}

/*
  Checks if there are any new transactions
  If there are new tractions 
  DOES NOT RETURN THE NEW TRANSACTIONS ITSELF
  TO GET THE NEW TRANSACTIONS CALL getNewTransactions()
*/
function isNewTransaction() {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId + '/transactions'))
    .then((resp) => {
      const newArraySize = resp.result.length;
      const currentArraySize = allTransactions.length;
      if(newArraySize != currentArraySize) {  // This assumes that the user cannot delete past transactions
        numOfNewTransactions = newArraySize - currentArraySize;
        for(var i = newArraySize; i > currentArraySize; i--) {
          allTransactions.push(resp.result[i]); 
        }
        return true;
      }
      return false;
    }, handleError)
  })();
}

/*
  Fetches any new transactions 
  If there are multiple transactions, it returns an array of transactions json objects
  If there are no new transactions, it just returns an empty array
  Make sure to do null checks when calling this function
*/
function getNewTransactions() {
  var newTransactions = [];
  var index = allTransactions.length;
  var counter = 0;
  while(counter < numOfNewTransactions) {
    newTransactions.push(allTransactions[index]);
    index--;
  }
  return newTransactions;
}

/*
  Gets the customers income
*/ 
function getCustomerIncome() {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId))
    .then((resp) => {
      const income = resp.result.totalIncome;
      console.log(income);
    }, handleError)
  })();  
}

/*
  This function gets all the unique category tags for all the transactions
*/
function getCategoryTags() {
  for(var i = 0; i < allTransactions.length; i++) {
    if(!categoryTags.includes(allTransactions[i].categoryTags[0])) {
      categoryTags.push(allTransactions[i].categoryTags[0]);
    }
  }
  return categoryTags;
}

/*
  This function gets all the REOCCURING category tags
  IT DOES NOT RETURN THE REOCCURING TRANSACTIONS BUT INSTEAD JUST THE TAGS
*/
function getReoccuringCategoryTags() {
  for(var i = 0; i < categoryTags.length; i++) {
    if(
        categoryTags[i] == "Education" ||
        categoryTags[i] == "Bills and Utilities" ||
        categoryTags[i] == "Loans" ||
        categoryTags[i] == "Health and Fitness" ||
        categoryTags[i] == "Mortgage and Rent"
    ) {
      reoccuringTags.push(categoryTags[i]);
    }
  }
}

/*
  This function returns all the reoccuring transactions in json form
  NEEDS TO BE CALLED AFTER getReoccuringCategoryTags()
*/
function getReoccuringTransactions() {
  for(var i = 0; i < reoccuringTags.length; i++) {
    for(var j = 0; j < allTransactions.length; j++) {
      if(allTransactions[j].categoryTags[0] == reoccuringTags[i]) {
        reoccuringTransactions.push(allTransactions[j]);
        break;
      }
    }
  }
}

/*
  This is just for error handling 
  The UI should not be calling this
*/
function handleError(err) {
  let outErr = err;
  if (err.response) {
    if (err.response.body) {
      outErr = err.response.body;
      console.dir(outErr.errorDetails);
    } else {
      outErr = err.response;
    }
  }
  console.dir(outErr);
  process.exit(1);
}

var Api = {getReoccuringTransactions, getReoccuringCategoryTags,getCategoryTags,
  getCustomerIncome, getNewTransactions, isNewTransaction, initTransactionsArray}
export default Api;