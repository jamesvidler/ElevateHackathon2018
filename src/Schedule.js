import React, { Component } from 'react';
import './Schedule.css';

class Schedule extends Component {  
  render() {
    return (
      <div className="Schedule">
        <h1>This is the work schedule component</h1>
        <p>The Customer ID is {this.props.app.customerID}</p>
      </div>
    );
  }
}

export default Schedule;
