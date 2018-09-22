import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DailyMetric from './DailyMetric'
import SwipeableRoutes from "react-swipeable-routes";
import AnotherView from './AnotherView'

var defaultValues = {
  customerID:'1528cf03-ff1e-4647-a76e-390b8b32dcb8_9c8b689c-daec-4fe6-836d-07d36f9dbcc9',
  test: 'some val',
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
   ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount = function() {
    this.setState(defaultValues)
  }
  updateState = function(stateData) {
    this.setState(stateData);
  }
  render() {
    return (
      <div className="App">
        
        <Link to="/">Home</Link>
        <Link to="/anotherview">Another View</Link>

        <main className="MainBox">
          <SwipeableRoutes>
            <Route exact path='/' render={(props) => <DailyMetric app={this.state} onStateChange={this.updateState} />}/>
            <Route exact path='/anotherview' render={(props) => <AnotherView app={this.state} onStateChange={this.updateState} />}/>
          </SwipeableRoutes>
        </main>
      </div>
    );
  }
}

export default App;
