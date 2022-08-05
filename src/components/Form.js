import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';
import axios from 'axios';
import Movie from './Movie'



export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityInformation: {},
      displayMap: true,
      errorMessage: false,
      weather: [],
      movies:[],
    }
  };

  searchedCity = (event) => {
    this.setState({
      cityName: event.target.value
    });
  }

  doSearch = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(this.state.cityName)
   const city =  axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.bd985e4e701a5b53341ec9e721b6098a&q=${this.state.cityName}&format=json`).then(response => {
      console.log(response.data[0], 'line33')
      this.setState({
        cityInformation: response.data[0],
        display_name: response.data[0].display_name,
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      });

      this.displayWeather(this.state.cityName, response.data[0].lat, response.data[0].lon);

      this.displayMovie(this.state.cityName)

    });


  }

  displayMap = (lat, lon) => {
    const mapSrc = `https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${lat},${lon}&zoom=18`;
    console.log(mapSrc)
    this.setState({
      map_src: mapSrc
    })
  }


  displayWeather = async (cityName, lat, lon) => {
    
    const weatherData = await axios.get(`https://odat-city.herokuapp.com/weather?searchQuery=${cityName}&lat=${lat}&lon=${lon}`);

    this.setState({
      weather: weatherData.data
    })
  }


  displayMovie = async (cityName) => {
    const movieData = await axios.get(`https://odat-city.herokuapp.com/movies?searchQuery=${cityName}`)
    this.setState ({
      movies: movieData.data,
    })
  }


  render() {
    return (
      <div>

        <Form onSubmit={this.doSearch}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label id='formLabel'>Search for a City: </Form.Label>
            <input id='searchQuery' onChange={this.searchedCity} type="text" />

          </Form.Group>


          <Button id='main-btn' variant="primary" type="submit"> Explore! </Button>

        </Form>
        <p>{this.state.cityInformation.display_name}</p>
        <p> Latitude : {this.state.cityInformation.lat}</p>
        <p> Longitude : {this.state.cityInformation.lon}</p>

        {this.state.cityName &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.cityInformation.lat},${this.state.cityInformation.lon}&zoom=10`} alt='' />
        }

        {this.state.weather.map(item =>
          <li>{item.date} : {item.description}</li>
        ) }

        <Movie movie={this.state.movies} />
      </div>

    )
  }
}


