import React, { Component } from 'react';
import './DailyMetric.css';
import CountUp from 'react-countup';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import numeral from 'numeral'
import moment from 'moment'
import _lodash from 'lodash'

class DailyMetric extends Component {
    constructor(props) {
        super(props);
        
        this.increaseBalance = this.increaseBalance.bind(this);
        this.decreaseBalance = this.decreaseBalance.bind(this);

        this.state = {};          

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
    computeWorkEarnings = function() {
        
    }
    
    render() {
        const percentage = (this.props.state.data.balance / this.props.state.data.goal) * 100;
        console.log(percentage);
        console.log('metric rendered');
        const hourlyWage = 0.00;
        if(this.props.state.data.customer != null) {
            const income = this.props.state.data.customer;
            const today = moment().format('dddd');
            const hour = moment().format('')
            const workingDay = _lodash.filter(this.props.state.workSchedule, function(day) { 
                return day.name === today && day.worksOn;
            });
            //HACK: We will be counting up ALL the time, not even during the day
            //const isWorkingToday = _
        }
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
                {this.props.state.data.balance > 0 &&
                    <h4 className="Green">Earning</h4>
                }

                {this.props.state.data.balance <= 0 &&
                    <h4 className="Red">Losing</h4>
                }
                
                <CountUp
                    start={this.props.state.data.oldBalance}
                    end={this.props.state.data.balance}
                    duration={3.00}
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
                <h4 className="saved"><span className="Goal">Goal</span> { numeral(this.props.state.data.goal).format('$ 0.00 a')}</h4>

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
