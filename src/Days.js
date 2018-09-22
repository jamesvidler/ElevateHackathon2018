import React, { Component } from 'react';


class Days extends Component {
  render() {
        var dayComp = [
            {
                name: "Sunday",
                startTime: "09:00",
                endTime : "17:00",
            },
            {
                name: "Monday",
                startTime: "9:00",
                endTime : "17:00",
            },
            {
                name: "Tuesday",
                startTime: "9:00",
                endTime : "17:00",
            },
            {
                name: "Wednesday",
                startTime: "9:00",
                endTime : "17:00",
            },
            {
                name: "Thursday",
                startTime: "9:00",
                endTime : "17:00",
            },
            {
                name: "Friday",
                startTime: "9:00",
                endTime : "17:00",
            },  
            {
                name: "Saturday",
                startTime: "9:00",
                endTime : "17:00",
            },     
         ];
        var namesList = dayComp.map(function(day){
            return <li>{day.name} <span>{day.startTime} </span> - <span>{day.endTime} </span></li>;
          })
    return (<ul>{namesList}</ul>);
  }
}

export default Days;
