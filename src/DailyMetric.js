import React, { Component } from 'react';
import './DailyMetric.css';
import Api from './Api';

class DailyMetric extends Component {
    componentDidMount = function() {
        Api.getCustomerIncome();
    }
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
