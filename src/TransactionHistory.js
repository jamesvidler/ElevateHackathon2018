import React, { Component } from 'react';
import styles from './TransactionHistory.css'

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = function() {

    }
    
    render() {
        const transactionItems = this.props.state.data.transactions.map((t) =>
            <div className="trans">
               <p className="transText">${t.currencyAmount}</p>
            </div>
        );
        return (

            <div className="TransactionHistory">
            <h3>  Purchase Details</h3>
                <ul>
                    {transactionItems}
                </ul>
            </div>
        );
    }
}

export default TransactionHistory;
