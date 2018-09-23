import moment from 'moment'
import 'moment-timezone'

const req = require('request-promise-native'); // use Request library + promises to reduce lines of code

const teamToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMzhiYzJhMTItODU2ZC0zZTkwLWIzYzgtMDIyM2YyMTAwYzNlIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiIxNTI4Y2YwMy1mZjFlLTQ2NDctYTc2ZS0zOTBiOGIzMmRjYjgifQ.frju2AIe3H7orMWYpIhtAws0bI4nO1Hs5k11wx5TZcE";
const initialCustomerId = "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53";



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
function getTransactions(callback) {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId + '/transactions'))
    .then((resp) => {
      for(var i in resp.result) {
        resp.result[i].originationDateTime = convertToEST(resp.result[i].originationDateTime);
      }
      var transactions = resp.result;
      callback(transactions);
    }, handleError)
  })();
}

function convertToEST(date) {
  return moment(date).tz('America/New_York').format();
}

/*
  Fetches any new transactions 
  If there are multiple transactions, it returns an array of transactions json objects
  If there are no new transactions, it just returns an empty array
  Make sure to do null checks when calling this function
*/
function getNewTransactions(transactions, date, callback) {
  getTransactionsForDay(date, function(resp) {
    var newTransactions = [];
    const newArraySize = resp.length; 
    const currentArraySize = transactions.length; 
    
    if(newArraySize != currentArraySize) {  // This assumes that the user cannot delete past transactions
      for(var i = newArraySize; i > currentArraySize; i--) {
        newTransactions.push(resp[i -1]); 
      }
    }
    callback(newTransactions);
  })
}

/*
  Gets the customers income
*/ 
function getCustomer(callback) {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId))
    .then((resp) => {
      callback(resp.result);
    }, handleError)
  })();  
}

/*
  This function gets all the unique category tags for all the transactions
*/
function getCategoryTags(transactions) {
  var categoryTags = [];
  for(var i = 0; i < transactions.length; i++) {
    if(transactions[i].categoryTags != null && transactions[i].categoryTags.length > 0 ){
      if(!categoryTags.includes(transactions[i].categoryTags[0])) {
        categoryTags.push(transactions[i].categoryTags[0]);
      }
    }
  }
  return categoryTags;
}

/*
  This function gets all the REOCCURING category tags
  IT DOES NOT RETURN THE REOCCURING TRANSACTIONS BUT INSTEAD JUST THE TAGS
*/
function getReoccuringCategoryTags(categoryTags) {
  var reoccuringTags = [];
  for(var i = 0; i < categoryTags.length; i++) {
    if(
        categoryTags[i] == "Education" ||
        categoryTags[i] == "Bills and Utilities" ||
        categoryTags[i] == "Loans" ||
        categoryTags[i] == "Health and Fitness" ||
        categoryTags[i] == "Mortgage and Rent" ||
        categoryTags[i] == "Uncategorized" ||
        categoryTags[i] == "Misc."
    ) {
      reoccuringTags.push(categoryTags[i]);
    }
  }
  return reoccuringTags;
}

/*
  This function returns all the reoccuring transactions in json form
  NEEDS TO BE CALLED AFTER getReoccuringCategoryTags()
*/
function getReoccuringTransactions(transactions) {
  var categoryTags = getCategoryTags(transactions);
  var reoccuringTransactions= [];
  var reoccuringTags = getReoccuringCategoryTags(categoryTags)
  for(var i = 0; i < reoccuringTags.length; i++) {
    for(var j = 0; j < transactions.length; j++) {
      if(transactions[j].categoryTags[0] == reoccuringTags[i]) {
        reoccuringTransactions.push(transactions[j]);
        break;
      }
    }
  }
  return reoccuringTransactions;
}

/*
  Gets all the transactions for a given day
  Inclusive of any reoccuring transactions
  Date has to be of format YYYY-MM-DD
*/
function getTransactionsForDay(date, callback) {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId + '/transactions'))
    .then((resp) => {
      var transactionForTheDay = [];

      for(var i in resp.result) {
        resp.result[i].originationDateTime = convertToEST(resp.result[i].originationDateTime);
      }

      const transactions = resp.result;
      for(var i = 0; i < transactions.length; i++) {
        if(transactions[i].originationDateTime.indexOf(date)!=-1) {
          transactionForTheDay.push(transactions[i]);
        }
      }
      var reoccuringTransactions = getReoccuringTransactions(transactions);
      for(var i = 0; i < reoccuringTransactions.length; i++) {
        reoccuringTransactions[i].currencyAmount = (reoccuringTransactions[i].currencyAmount / 30).toFixed(2);
        transactionForTheDay.push(reoccuringTransactions[i]);
      }
      callback(transactionForTheDay); 
    }, handleError)
  })();
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

var Api = {
  getReoccuringTransactions,
  getCustomer,
  getNewTransactions,
  getTransactions,
  getTransactionsForDay
}

export default Api;