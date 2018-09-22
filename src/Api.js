// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";

const req = require('request-promise-native'); // use Request library + promises to reduce lines of code

const teamToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMzhiYzJhMTItODU2ZC0zZTkwLWIzYzgtMDIyM2YyMTAwYzNlIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiIxNTI4Y2YwMy1mZjFlLTQ2NDctYTc2ZS0zOTBiOGIzMmRjYjgifQ.frju2AIe3H7orMWYpIhtAws0bI4nO1Hs5k11wx5TZcE";
const initialCustomerId = "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53";

var allTransactions = [{
  "locationLongitude": -79.3650230746,
  "locationCountry": "CA",
  "merchantCategoryCode": "5814",
  "description": "STARBUCKS #16867",
  "type": "CreditCardTransaction",
  "merchantName": "Starbucks",
  "currencyAmount": 6.03,
  "locationRegion": "ON",
  "source": "POS",
  "locationCity": "East York",
  "originationDateTime": "2018-08-24T10:15:00Z",
  "locationPostalCode": "M4G 2L1",
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": "305d331d-5cd1-4fda-a526-63ab36e7c6d1",
  "locationLatitude": 43.7137563493,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-a5d6a3a6-47cd-4c1e-b70c-2cf2a64fde1f",
  "locationStreet": "878 Eglinton Ave E",
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_b94e8718-a8f7-4ad1-b492-7646882d693e",
  "categoryTags": [
    "tag35892"
  ]
},
{
  "locationLongitude": -79.3998708371,
  "locationCountry": "CA",
  "merchantCategoryCode": "5651",
  "description": "GAP 1643",
  "type": "CreditCardTransaction",
  "merchantName": "Gap",
  "currencyAmount": 154.83,
  "locationRegion": "ON",
  "source": "POS",
  "locationCity": "Toronto",
  "originationDateTime": "2018-07-16T10:24:00Z",
  "locationPostalCode": "M4P 2J5",
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": "048e31d8-689a-4e86-b0b1-b0af6fc97873",
  "locationLatitude": 43.7154767173,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-502d0513-4f00-4a4d-805c-b527c4be6bb1",
  "locationStreet": "2637 Yonge St",
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_b94e8718-a8f7-4ad1-b492-7646882d693e",
  "categoryTags": [
    "Shopping"
  ]
},
{
  "locationLongitude": null,
  "locationCountry": null,
  "merchantCategoryCode": null,
  "description": "E TFR  C1***bCY",
  "type": "DepositAccountTransaction",
  "merchantName": "Balance+",
  "currencyAmount": 50,
  "locationRegion": null,
  "source": null,
  "locationCity": null,
  "originationDateTime": "2018-07-23T23:59:30Z",
  "locationPostalCode": null,
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": null,
  "locationLatitude": null,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-40e601b2-cae5-4cab-a171-c6b7330f0dd5",
  "locationStreet": null,
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_1894a538-7776-41ca-88b6-ffea5d2d50cf",
  "categoryTags": [
    "Transfer"
  ]
},
{
  "locationLongitude": -79.3617799376,
  "locationCountry": "CA",
  "merchantCategoryCode": "5814",
  "description": "STARBUCKS #4667",
  "type": "CreditCardTransaction",
  "merchantName": "Starbucks",
  "currencyAmount": 6.13,
  "locationRegion": "ON",
  "source": "POS",
  "locationCity": "East York",
  "originationDateTime": "2018-08-15T17:04:00Z",
  "locationPostalCode": "M4G 4H9",
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": "fb6dc23e-14df-4ce8-8afc-2871b0cdad08",
  "locationLatitude": 43.710534412,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-1a928119-d8e1-4beb-a1be-1cd9b98f694b",
  "locationStreet": "65 Wicksteed Ave",
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_b94e8718-a8f7-4ad1-b492-7646882d693e",
  "categoryTags": [
    "Food and Dining"
  ]
},
{
  "locationLongitude": null,
  "locationCountry": null,
  "merchantCategoryCode": null,
  "description": "ADP PMT 18988729",
  "type": "DepositAccountTransaction",
  "merchantName": null,
  "currencyAmount": 441.6,
  "locationRegion": null,
  "source": null,
  "locationCity": null,
  "originationDateTime": "2018-09-20T00:00:00.001Z",
  "locationPostalCode": null,
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": null,
  "locationLatitude": null,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-4accb043-749e-42ce-9be4-07236bc4ec45",
  "locationStreet": null,
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_1894a538-7776-41ca-88b6-ffea5d2d50cf",
  "categoryTags": [
    "Income"
  ]
},
{
  "locationLongitude": null,
  "locationCountry": null,
  "merchantCategoryCode": "4900",
  "description": "BULLFROG PWR R982O8",
  "type": "DepositAccountTransaction",
  "merchantName": "Bullfrog Power",
  "currencyAmount": -45.66,
  "locationRegion": null,
  "source": null,
  "locationCity": null,
  "originationDateTime": "2018-08-27T00:00:00.001Z",
  "locationPostalCode": null,
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": "3121f43a-247f-47bd-9904-3821f29469c1",
  "locationLatitude": null,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-2306b072-bedc-4aef-a60d-d690e406aef4",
  "locationStreet": null,
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_1894a538-7776-41ca-88b6-ffea5d2d50cf",
  "categoryTags": [
    "Bills and Utilities"
  ]
},
{
  "locationLongitude": null,
  "locationCountry": null,
  "merchantCategoryCode": null,
  "description": "E TFR C2***oBl",
  "type": "DepositAccountTransaction",
  "merchantName": null,
  "currencyAmount": -25,
  "locationRegion": null,
  "source": null,
  "locationCity": null,
  "originationDateTime": "2018-06-19T00:00:00.001Z",
  "locationPostalCode": null,
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": null,
  "locationLatitude": null,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-42fa6462-56ca-44fe-b968-18f63b582516",
  "locationStreet": null,
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_1894a538-7776-41ca-88b6-ffea5d2d50cf",
  "categoryTags": [
    "Transfer"
  ]
},
{
  "locationLongitude": null,
  "locationCountry": null,
  "merchantCategoryCode": null,
  "description": "ADP PMT 72929998",
  "type": "DepositAccountTransaction",
  "merchantName": null,
  "currencyAmount": 441.6,
  "locationRegion": null,
  "source": null,
  "locationCity": null,
  "originationDateTime": "2018-06-14T00:00:00.001Z",
  "locationPostalCode": null,
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": null,
  "locationLatitude": null,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-9e8a5c84-82d3-4f5f-9004-e2f62aa92000",
  "locationStreet": null,
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_1894a538-7776-41ca-88b6-ffea5d2d50cf",
  "categoryTags": [
    "Income"
  ]
},
{
  "locationLongitude": -79.359500347,
  "locationCountry": "CA",
  "merchantCategoryCode": "5411",
  "description": "LONGO'S #87",
  "type": "CreditCardTransaction",
  "merchantName": "Longo's",
  "currencyAmount": 19.17,
  "locationRegion": "ON",
  "source": "POS",
  "locationCity": "East York",
  "originationDateTime": "2018-06-05T14:02:00Z",
  "locationPostalCode": "M4G 3V1",
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": "0bd45563-c4c8-4a74-821b-69bc3fbb3219",
  "locationLatitude": 43.706607238,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-5e71e453-deaf-4630-be5a-f35f6492498b",
  "locationStreet": "93 Laird Dr",
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_b94e8718-a8f7-4ad1-b492-7646882d693e",
  "categoryTags": [
    "Food and Dining"
  ]
},
{
  "locationLongitude": -79.3437491547,
  "locationCountry": "CA",
  "merchantCategoryCode": "5411",
  "description": "METRO #989",
  "type": "CreditCardTransaction",
  "merchantName": "Metro",
  "currencyAmount": 13.12,
  "locationRegion": "ON",
  "source": "POS",
  "locationCity": "North York",
  "originationDateTime": "2018-07-10T08:20:00Z",
  "locationPostalCode": "M3C 1W6",
  "customerId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-ef7a-4774-88bc-762f2e9adc53",
  "merchantId": "077bc9ff-6ea1-4e86-a92f-5fd0f69c549d",
  "locationLatitude": 43.7338984436,
  "id": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_c418b5e6-9299db85-0017-42e9-a225-31833282280f",
  "locationStreet": "1050 Don Mills Rd",
  "accountId": "1528cf03-ff1e-4647-a76e-390b8b32dcb8_b94e8718-a8f7-4ad1-b492-7646882d693e",
  "categoryTags": [
    "Food and Dining"
  ]
}];
var numOfNewTransactions = 0;
var categoryTags = [];

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
  var reoccuringTags = [];
  
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