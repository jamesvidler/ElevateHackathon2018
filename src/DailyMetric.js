import React, { Component } from 'react';
import './DailyMetric.css';
import Api  from './Api';
import CountUp from 'react-countup';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import numeral from 'numeral'

class DailyMetric extends Component {
    constructor(props) {
        super(props);
        
        //this.changeStateTestVal = this.changeStateTestVal.bind(this);
        this.increaseBalance = this.increaseBalance.bind(this);
        this.decreaseBalance = this.decreaseBalance.bind(this);
        // this.state = {
        //     oldBalance: 0.00,
        //     balance: 0.00,
        //     lastIncrease: "$ 0.00",
        //     lastDecrease: "$ 0.00",
        //     showIncrease: false,
        //     showDecrease: false,
        //     transactions: []
        // };          

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
        var diff = newBalance - this.props.state.data.balance;
        var data = {
            oldBalance: this.props.state.data.balance,
            balance: newBalance,
            lastIncrease: (diff > 0 ? this.formatter.format(diff) : this.props.state.data.lastIncrease),
            lastDecrease: (diff < 0 ? this.formatter.format(diff) : this.props.state.data.lastDecrease)
        }
        this.props.updateAppState({
            data: data
        });
    }
    increaseBalance = function() {
        var balance = this.props.state.data.balance;
        var newBalance = balance + 0.25;
        this.updateBalance(newBalance);       
    }
    decreaseBalance = function() {
        var balance = this.props.state.data.balance;
        var newBalance = balance - 5.75;
        this.updateBalance(newBalance);
    }
    
    render() {
        const percentage = 70;
        return (
            <div className="DailyMetric">
                <div className="Bar">
                <CircularProgressbar
                percentage={percentage}
                textforPercentage={null} 
                strokeWidth={10}
                styles={{
                    path: { stroke: `rgba(53, 178, 52, 100)` },
                    trail: { stroke: '#590913'}
                  }}
                />
                </div>
                <h4 className="Green">Earning</h4>
                <CountUp
                    start={this.props.state.data.oldBalance}
                    end={this.props.state.data.balance}
                    duration={2.75}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="$"
                    suffix=""
                    onEnd={() => console.log('Ended! 👏')}
                    onStart={() => console.log('Started! 💨')}
                    formattingFn={(value) => {
                        return numeral(value).format('$ 0.00 a');
                    }}
                    >
                    {({ countUpRef }) => (
                        <h2 className="DaySave" ref={countUpRef}/>
                    )}
                </CountUp>
                <hr></hr>
                <h4 className="saved"><span className="Goal">Goal</span> $342.23</h4>

                {this.props.state.data.showDecrease &&
                    <h4 className="Red">{this.props.state.data.lastDecrease}</h4>
                }
                
                {/* <button onClick={this.increaseBalance}>increase balance</button>
                <button onClick={this.decreaseBalance}>decrease balance</button> */}
            </div>
        );
    }
}

export default DailyMetric;
