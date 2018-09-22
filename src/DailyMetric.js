import React, { Component } from 'react';
import './DailyMetric.css';
import Api from './Api';

class DailyMetric extends Component {
    constructor(props) {
        super(props);
        this.changeStateTestVal = this.changeStateTestVal.bind(this);
    }
    componentDidMount = function() {
        //debugger;
        Api.getCustomerIncome();
    }
    changeStateTestVal = function() {
        this.props.onStateChange({
            test: 'a test value',
            workSchedule: null
        })
    }
    render() {
        return (
        <div className="DailyMetric">
            <h1>This is the daily metric component</h1>
            <p>Customer ID is {this.props.app.customerID}</p>
            <button onClick={this.changeStateTestVal}>Update Parent Value</button>
        </div>
        );
    }
}

export default DailyMetric;
