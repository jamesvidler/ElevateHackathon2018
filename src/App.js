import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import DailyMetric from './DailyMetric'
import Schedule from './Schedule'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
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
          <Route exact path='/' component={DailyMetric}/>
          <Route exact path='/schedule' component={Schedule}/>
        </Switch>
        </main>
      </div>
    );
  }
}

export default App;
