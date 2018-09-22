import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import DailyMetric from './DailyMetric'
import Schedule from './Schedule'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {

    const app = {
      customerID:'1528cf03-ff1e-4647-a76e-390b8b32dcb8_9c8b689c-daec-4fe6-836d-07d36f9dbcc9'
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Link to="/">Daily Metric</Link>
        <Link to="/schedule">Work Schedule</Link>
        <main>
        <Switch>
          <Route exact path='/' render={(props) => <DailyMetric app={app} />}/>
          <Route exact path='/schedule' render={(props) => <Schedule app={app} />}/>
        </Switch>
        </main>
      </div>
    );
  }
}

export default App;
