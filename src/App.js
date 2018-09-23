import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DailyMetric from './DailyMetric'
import SwipeableRoutes from "react-swipeable-routes";
import AnotherView from './AnotherView'
import Api from './Api'
import deepmerge from 'deepmerge'

var defaultValues = {
  customerID:'1528cf03-ff1e-4647-a76e-390b8b32dcb8_9c8b689c-daec-4fe6-836d-07d36f9dbcc9',
  test: 'some val',
  date: '2018-09-22',
  workSchedule: 
    [
      {
          name: "Sunday",
          worksOn: false,
          startTime: null,
          endTime : null,
      },
      {
          name: "Monday",
          worksOn: true,
          startTime: "9:00",
          endTime : "17:00",
      },
      {
          name: "Tuesday",
          worksOn: true,
          startTime: "9:00",
          endTime : "17:00",
      },
      {
          name: "Wednesday",
          worksOn: true,
          startTime: "9:00",
          endTime : "17:00",
      },
      {
          name: "Thursday",
          worksOn: true,
          startTime: "9:00",
          endTime : "17:00",
      },
      {
          name: "Friday",
          worksOn: true,
          startTime: "9:00",
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
    customer: null
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultValues;
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount = function() {
    var self = this;

    Api.getCustomer(function(customer) {
      Api.getTransactionsForDay(self.state.date, function(transactions) {
        self.updateState({
          data: {
            transactions: transactions,
            customer: customer
          }
        });   
      })
    })
  }
  updateState = function(stateData) {
    var mergedState = deepmerge(this.state, stateData,);
    this.setState(mergedState);
  }
  render() {
    return (
      <div className="App">
        
        <Link to="/">Home</Link>
        <Link to="/anotherview">Another View</Link>
        <div class='Enclose'>
          <main className="MainBox">
            <SwipeableRoutes>
              <Route exact path='/' render={(props) => <DailyMetric state={this.state} updateAppState={this.updateState} />}/>
              <Route exact path='/anotherview' render={(props) => <AnotherView state={this.state} updateAppState={this.updateState} />}/>
            </SwipeableRoutes>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
