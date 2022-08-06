import React from "react";

export default class WeatherDay extends React.Component{
    render () {

        console.log('test')
        return (
            <>
            
            <li>{this.props.weatherStatus.date}:{this.props.weatherStatus.description} {this.props.weatherStatus.highestTemp}</li>
            </>
        )
    }
}