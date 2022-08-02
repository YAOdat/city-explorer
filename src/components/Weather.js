import React from "react";

export default class Weather extends React.Component{
    render () {

        return (
            <>
                <p>{this.props.weather.date}</p>
                <p>{this.props.weather.description}</p>
            </>


        )
    }
}