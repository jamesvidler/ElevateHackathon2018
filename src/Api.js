// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";

const util = require('util') // for printing objects
const req = require('request-promise-native'); // use Request library + promises to reduce lines of code
//req.debug = true
//require('request-debug')(req);

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

function getCustomerIncome() {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId))
    .then((resp) => {
      const income = resp.result.totalIncome;
      console.log(income);
    }, handleError)
  })();  
}

function getLastTenTransactions() {
  (async () => {
    await req(options('GET', 'customers/' + initialCustomerId + 'transactions/'))
    .then((resp) => {
      const income = resp.result;
      console.log(income);
    }, handleError)
  })();
}

getCustomerIncome();


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
  getCustomerIncome
}

export default Api;