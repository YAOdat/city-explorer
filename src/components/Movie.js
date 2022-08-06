import React from "react";
import SingleMovie from "./SingleMovie";

export default class Movie extends React.Component{

render() {
    return (
        this.props.movie.map(item => 
            <>
              <SingleMovie movieDetails={item}/>
             
            </>


    ))
}

}