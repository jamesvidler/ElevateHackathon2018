import React, { Component } from 'react';
import './DailyMetric.css';
import Api from './Api';
import CountUp from 'react-countup'

class DailyMetric extends Component {
    constructor(props) {
        super(props);
        
        //this.changeStateTestVal = this.changeStateTestVal.bind(this);
        this.increaseBalance = this.increaseBalance.bind(this);
        this.decreaseBalance = this.decreaseBalance.bind(this);
        this.state = {
            oldBalance: 0.00,
            balance: 0.00,
            lastIncrease: "$ 0.00",
            lastDecrease: "$ 0.00",
            showIncrease: false,
            showDecrease: false
        };          

        this.hideTransactionsAfterTimeout = false;

        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          })
    }
    componentDidMount = function() {

    }
    updateBalance = function(newBalance) {
        var diff = newBalance - this.state.balance;
        this.setState({
            oldBalance: this.state.balance,
            balance: newBalance,
            lastIncrease: (diff > 0 ? this.newIncreaseItem(diff) : this.state.lastIncrease),
            lastDecrease: (diff < 0 ? this.newDecreaseItem(diff) : this.state.lastDecrease)
        })
    }
    newIncreaseItem = function(diff) {
        var self = this;
        self.setState({
            showIncrease: true
        })
        if(self.hideTransactionsAfterTimeout) {
            setTimeout(function() {
                self.setState({
                    showIncrease: false
                })
            }, 3000)
        }
        return this.formatter.format(diff);
    }
    newDecreaseItem = function(diff) {
        var self = this;
        self.setState({
            showDecrease: true
        })
        if(self.hideTransactionsAfterTimeout) {
            setTimeout(function() {
                self.setState({
                    showDecrease: false
                })
            }, 3000)
        }
        
        return this.formatter.format(diff);
    }
    increaseBalance = function() {
        var balance = this.state.balance;
        var newBalance = balance + 0.25;
        this.updateBalance(newBalance);       
    }
    decreaseBalance = function() {
        var balance = this.state.balance;
        var newBalance = balance - 5.75;
        this.updateBalance(newBalance);
    }
    render() {
        return (

            <div className="DailyMetric">
                {this.state.showIncrease &&
                <h4 className="Green">+{this.state.lastIncrease}</h4>
                }
                <CountUp
                    start={this.state.oldBalance}
                    end={this.state.balance}
                    duration={4}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="$ "
                    suffix=""
                    onEnd={() => console.log('Ended! 👏')}
                    onStart={() => console.log('Started! 💨')}
                    >
                    {({ countUpRef }) => (
                        <h2 className="DaySave" ref={countUpRef}/>
                    )}
                </CountUp>
                {this.state.showDecrease &&
                    <h4 className="Red">{this.state.lastDecrease}</h4>
                }
                <h4 className="saved">SAVED</h4>
                {/* <div className="groupC">
                <div className="circle"></div>
                <div className="activeCircle"></div>
                </div> */}
                <button onClick={this.increaseBalance}>increase balance</button>
                <button onClick={this.decreaseBalance}>decrease balance</button>
            </div>
        );
    }
}

export default DailyMetric;
