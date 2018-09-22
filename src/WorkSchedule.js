import React, { Component } from 'react';
import './workschedule.css';
import Days from './Days';


class WorkSchedule extends Component {
  render() {
    return (
      <div className="WorkSchedule">
      <hr></hr>
        <p className="WorkSchedule-intro">
        Communicating from WorkSchedule
        <Days/>
        </p>
        <hr></hr>
      </div>
    );
  }
}

export default WorkSchedule;
