import React from "react";

export default class Movie extends React.Component{

render() {
    return (
        this.props.movie.map(item => 
            <>
            
              <img variant='top' src={item.image_url}/>
              <p>{item.title}</p>
              <p>{item.released_on}</p>
              <p>{item.popularity}</p>
            </>


    ))
}

}