import React, { Component } from 'react';
import './DailyMetric.css';

class DailyMetric extends Component {
  render() {
    return (
      <div className="DailyMetric">
        <h1>This is the daily metric component</h1>
        <p>Customer ID is {this.props.app.customerID}</p>
      </div>
    );
  }
}

export default DailyMetric;
