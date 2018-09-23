import React, { Component } from 'react';
import './DailyMetric.css';
import CountUp from 'react-countup';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import numeral from 'numeral'
import moment from 'moment'
import _lodash from 'lodash'
import Confetti from 'react-confetti'

class DailyMetric extends Component {
    constructor(props) {
        super(props);
        
        this.increaseBalance = this.increaseBalance.bind(this);
        this.decreaseBalance = this.decreaseBalance.bind(this);

        this.state = {
            showConfetti: false
        };          

        this.percentage = 0;
        this.previousPercentage = 0;
        this.wageCounterStarted = false;
        this.hideTransactionsAfterTimeout = false;

        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
    }
    componentDidMount = function() {
        this.setState({
            showConfetti: false
        })
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
    startWageCounter = function(hourlyWage) {
        if(this.wageCounterStarted) return; //kickout if we've already started this
        var self = this;
        self.wageCounterStarted = true;
        const timeInterval = 5; //s
        const amountPerInterval = hourlyWage / 360 * timeInterval;
        console.log('amountPerInterval', amountPerInterval);
        setInterval(function() { 
            self.props.updateWagePaid(amountPerInterval);
            //self.increaseBalance(amountPerInterval);
        }, timeInterval * 1000)
    }
    checkIfWorkingAndPayWage = function() {
        //Check if we can start the wage counter
        //HACK: Let's start the wage counter anyways for demo purposes!
        const totalIncome = this.props.state.data.customer.totalIncome;
        const timeFormat = 'hh:mm';
        const now = moment();
        const today = now.format('dddd'); 
        const workingDays = _lodash.filter(this.props.state.workSchedule, function(day) { 
            return day.worksOn;
        });
        const matchedWorkingDays = _lodash.filter(this.props.state.workSchedule, function(day) { 
            return day.worksOn && day.name === today;
        });
        if(matchedWorkingDays != null && matchedWorkingDays.length > 0) {
            //lucky us... its a work day
            const workingDay = matchedWorkingDays[0];
            const time = now;
            const startTime = moment(workingDay.startTime, timeFormat);
            const quittingTime = moment(workingDay.endTime, timeFormat);
            const isDuringHours = time.isBetween(startTime, quittingTime);
            if(isDuringHours) {
                const hoursPerDay = 8; //HACK: should be based on hours of the work schedule
                const hoursPerWeek = hoursPerDay * workingDays.length;
                const hoursPerYear = hoursPerWeek * 52;
                const hourlyWage = totalIncome / hoursPerYear;
                console.log('hourlyWage', hourlyWage)
                this.startWageCounter(hourlyWage);
            }
        }
    }
    showConfetti = function(toggle) {
        var self = this;
        this.setState({
            showConfetti: toggle
        })
        //if we turn it on, turn it off in a bit
        if(toggle === true) {
            setTimeout(function() {
               self.showConfetti(false)
            }, 8000)
        }
    }

    
    render() {
        this.previousPercentage = this.percentage;
        this.percentage = (this.props.state.data.balance / this.props.state.data.goal) * 100;
        if(this.percentage >= 100 && this.previousPercentage < 100) {
            this.showConfetti(true);
        }
        console.log(this.percentage);
        console.log('metric rendered');
        const hourlyWage = 0.00;
        if(this.props.state.data.customer != null) {
            this.checkIfWorkingAndPayWage(); 
        }
        return (
            <div className="DailyMetric">
                {this.state.showConfetti &&
                <Confetti id="Confetti" />
                }
                <div className="Bar">
                <CircularProgressbar
                    percentage={this.percentage}
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
