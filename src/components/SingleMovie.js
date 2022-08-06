import React from "react"

export default class SingleMovie extends React.Component {

    render() {
        if (this.props.movieDetails.image_url !== 'https://image.tmdb.org/t/p/w500null') {
            return (
                <div>
                   
                    <img variant='top' src={this.props.movieDetails.image_url} />
                    <p>{this.props.movieDetails.title}</p>
                    <p>{this.props.movieDetails.released_on}</p>
                    <p>{this.props.movieDetails.popularity}</p>
    
    
                </div>
            )
            
        }
       
    }
}