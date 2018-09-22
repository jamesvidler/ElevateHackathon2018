import React, { Component } from 'react';
import './DailyMetric.css';
import Api from './Api';
import CountUp from 'react-countup'

class DailyMetricCopy extends Component {
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
        var newBalance = balance + 300.25;
        this.updateBalance(newBalance);       
    }
    decreaseBalance = function() {
        var balance = this.state.balance;
        var newBalance = balance - 5.75;
        this.updateBalance(newBalance);
    }
    render() {
        var ShowIncrease = (function() {
            if(this.state.showIncrease) {
                return <div>+ {this.state.lastIncrease}</div>
            }
        })
        var ShowDecrease = (function() {
            if(this.state.showDecrease) {
                return <div>{this.state.lastDecrease}</div>
            }
        })
        return (
        <div className="DailyMetric">
            {this.state.showIncrease &&
                <div>+ {this.state.lastIncrease}</div>
            }
            <CountUp
                start={this.state.oldBalance}
                end={this.state.balance}
                duration={2.75}
                separator=","
                decimals={2}
                decimal="."
                prefix="$ "
                suffix=""
                onEnd={() => console.log('Ended! 👏')}
                onStart={() => console.log('Started! 💨')}
                >
                {({ countUpRef }) => (
                    <div>
                    <span ref={countUpRef} />
                    </div>
                )}
            </CountUp>
            {this.state.showDecrease &&
                <div>+ {this.state.lastDecrease}</div>
            }
            <button onClick={this.increaseBalance}>Increase</button>
            <button onClick={this.decreaseBalance}>Decrease</button>
        </div>
        );
    }
}

export default DailyMetricCopy;
