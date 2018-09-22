import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
//import DailyMetric from './DailyMetric'
import DailyMetricCopy from './DailyMetricCopy'
import Schedule from './Schedule'
import { Link } from 'react-router-dom'

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
        {/* <header className="App-header">
          <h1 className="App-title">Personal Financial Heartbeat</h1>
          <h3>{this.state.test}</h3>
        </header> */}


        <div className="MainBox">
          <h4 className="Green">+$1.35</h4>
          <h2 className="DaySave">$56.13</h2>
          <h4 className="Red">-$3.25</h4>
        <h4>SAVED</h4>
        {/* <div className="groupC">
          <div className="circle"></div>
          <div className="activeCircle"></div>
        </div> */}
        </div>


        {/* <Link to="/">Daily Metric</Link>
        <Link to="/schedule">Work Schedule</Link> */}
        <main>

        {/* <Switch>
          <Route exact path='/' render={(props) => <DailyMetric app={this.state} onStateChange={this.updateState} />}/>
>>>>>>> 15cac1115bbfab6446de84c98990b286a19b949f
          <Route exact path='/schedule' render={(props) => <Schedule app={this.state} />}/>
        </Switch> */}
        </main>

        {/* <pre> 
          {JSON.stringify(this.state.workSchedule)}
        </pre> */}
      </div>
    );
  }
}

export default App;
