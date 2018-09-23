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
        const icon = function(category) {
            var html = null;
            if(category === 'Income') {
                html = <i class="far fa-money-bill-alt"></i>
            } else if (category === 'Food and Dining') {
                html = <i class="fas fa-utensils"></i>
            } else if (category === 'Bill and Utilities') {
                html = <i class="far fa-money-bill-alt"></i>
            } else if (category === 'Health and Fitness') {
                html = <i class="far fa-money-bill-alt"></i>
            } else if (category === '') {
                html = <i class="far fa-money-bill-alt"></i>
            } else if (category === 'Shopping') {
                html = <i class="fas fa-shopping-bag"></i>
            } else if (category === 'Auto and Transport') {
                html = <i class="fas fa-car"></i>
            } else {
                html = <i class="fas fa-dollar-sign"></i>
            }
            return html;
        }
        const transactionItems = this.props.state.data.transactions.map((t) =>
            <div className="trans">
             <p className="transText">
               {icon(t.categoryTags[0])}

               <span className="desc">{t.merchantName}</span>

               {t.currencyAmount > 0 && 
               <span className="amountText green-text">
                {numeral(t.currencyAmount).format('$ 0.00 a')} 
               </span>
               }

               {t.currencyAmount < 0 && 
               <span className="amountText red-text">
                {numeral(t.currencyAmount).format('$ 0.00 a')} 
               </span>
               }
               
            </p>
            </div>
        );
        return (

            <div className="TransactionHistory">
            <h3>Your Details</h3>
                <ul>
                    {transactionItems}
                </ul>
            </div>
        );
    }
}

export default TransactionHistory;
