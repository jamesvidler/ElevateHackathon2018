import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DailyMetric from './DailyMetric'
import SwipeableRoutes from "react-swipeable-routes";
import AnotherView from './AnotherView'
import Api from './Api'
import deepmerge from 'deepmerge'
import TransactionHistory from './TransactionHistory'
import moment from 'moment'


var defaultValues = {
  customerID:'1528cf03-ff1e-4647-a76e-390b8b32dcb8_9c8b689c-daec-4fe6-836d-07d36f9dbcc9',
  disableEarning: (window.location.search != null && window.location.search.length > 0),
  date: moment().format('YYYY-MM-DD'),
  workSchedule: 
    [
      {
          name: "Sunday",
          worksOn: true,
          startTime: "02:00",
          endTime : "20:00",
      },
      {
          name: "Monday",
          worksOn: true,
          startTime: "09:00",
          endTime : "17:00",
      },
      {
          name: "Tuesday",
          worksOn: true,
          startTime: "09:00",
          endTime : "17:00",
      },
      {
          name: "Wednesday",
          worksOn: true,
          startTime: "09:00",
          endTime : "17:00",
      },
      {
          name: "Thursday",
          worksOn: true,
          startTime: "09:00",
          endTime : "17:00",
      },
      {
          name: "Friday",
          worksOn: true,
          startTime: "09:00",
          endTime : "17:00",
      },  
      {
          name: "Saturday",
          worksOn: false,
          startTime: null,
          endTime : null
      }     
   ],
  data: {
    oldBalance: 0.00,
    balance: 0.00,
    lastIncrease: "$ 0.00",
    lastDecrease: "$ 0.00",
    showIncrease: false,
    showDecrease: false,
    transactions: [],
    customer: null,
    goal: 75.00,
    wagePaid: 0
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultValues;
    this.updateState = this.updateState.bind(this);
    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    this.updateWagePaid = this.updateWagePaid.bind(this);
    this.wagePaid = 0;
  }
  componentDidMount = function() {
    var self = this;
    Api.getCustomer(function(customer) {
      Api.getTransactionsForDay(self.state.date, function(transactions) {
        console.log('initial transactions', transactions);
        var balance = self.computeBalance(transactions);
        self.updateBalance(balance);
        self.updateState({
          data: {
            transactions: transactions,
            customer: customer,
            balance: balance
          }
        }); 
        self.pollForUpdates();  
      })
    })
  }
  pollForUpdates = function() {
    var self = this;
    function refresh() {
      
        // make Ajax call here, inside the callback call:
        Api.getNewTransactions(self.state.data.transactions, self.state.date, function(newTransactions) {
          console.log('new transactions', newTransactions);
          var transactions = self.state.data.transactions.concat(newTransactions);
          var balance = self.computeBalance(transactions);
          self.updateBalance(balance);
          self.updateState({
            data: {
              transactions: transactions,
              balance: balance
            }
          });   
          setTimeout(refresh, 5000);
        });
        
        // ...
    }
    
    // initial call, or just call refresh directly
    setTimeout(refresh, 5000);
  }
  updateWagePaid = function(wagePaid) {
    this.wagePaid += wagePaid;
  }
  computeBalance = function(transactions) {
    var balance = 0.00;
    for(var i in transactions) {
      balance += parseFloat(transactions[i].currencyAmount); //hack for a bug in Api.js
    }
    balance += this.wagePaid;
    return balance;
  }
  updateBalance = function(newBalance) {
    var diff = newBalance - this.state.data.balance;
    var data = {
        oldBalance: this.state.data.balance,
        balance: newBalance
    }

    if(diff > 0) {
      //income
      data.lastIncrease = diff;
      data.showIncrease = true;
      data.showDecrease = false;
    } else {
      //decrease
      data.lastDecrease = diff;
      data.showDecrease = true;
      data.showIncrease = false;
    }

    this.updateState({
        data: data
    });
  }
  updateState = function(stateData) {
    const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
    var mergedState = deepmerge(this.state, stateData, { arrayMerge: overwriteMerge });
    this.setState(mergedState);
  }
  render() {
    return (
      <div className="App">        
        <div className="Enclose">
          <main className="MainBox">
            <SwipeableRoutes>
              <Route key="1" exact path='/' render={(props) => <DailyMetric state={this.state} updateAppState={this.updateState} updateWagePaid={this.updateWagePaid} />}/>
              <Route key="2" exact path='/transaction-history' render={(props) => <TransactionHistory state={this.state} updateAppState={this.updateState} />}/>
              <Route key="3" exact path='/anotherview' render={(props) => <AnotherView state={this.state} updateAppState={this.updateState} />}/>
            </SwipeableRoutes>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
