import React from "react";

export default class Weather extends React.Component{
    render () {

        return (
            <>
             {this.props.weather.data.map(item =>
                <li>{item.date} : {item.descriptioin}</li>
              )
              }

            </>
           
        )
    }
}