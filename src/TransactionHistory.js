import React, { Component } from 'react';
import './TransactionHistory.css';
import numeral from 'numeral'

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = function() {

    }
    
    render() {  
        const transactionItems = this.props.state.data.transactions.map((t) =>
            <div className="trans">
             <p className="transText">
               
               
               {t.categoryTags[0] === 'Food and Dining' &&
               <i class="fas fa-utensils"></i>
               }
               {t.categoryTags[0] === 'Income' &&
               <i class="far fa-money-bill-alt"></i>
               }
               {t.categoryTags[0] === 'Shopping' &&
               <i class="fas fa-shopping-bag"></i>
               }
               {t.categoryTags[0] === 'Auto and Transport' &&
               <i class="fas fa-car"></i>
               }
               <span className="amountText">
               {numeral(t.currencyAmount).format('$ 0.00 a')} 
               </span>
            </p>
            </div>
        );
        return (

            <div className="TransactionHistory">
            <h3>Purchase Details</h3>
                <ul>
                    {transactionItems}
                </ul>
            </div>
        );
    }
}

export default TransactionHistory;
