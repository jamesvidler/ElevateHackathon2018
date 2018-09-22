import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import P from './P';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Personal Financial Heartbeat</h1>
        </header>
        <P/>
      </div>
    );
  }
}

export default App;
