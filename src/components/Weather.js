import React from "react";
import WeatherDay from "./WeatherDay";

export default class Weather extends React.Component{
    render () {
        
        return (
            <>
            {console.log(this.props.weather.data)}
             {this.props.weather.data.map(item =>
                <WeatherDay weatherStatus={item} />
              )
              }

            </>
           
        )
    }
}