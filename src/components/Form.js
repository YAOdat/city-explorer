import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';
import axios, { AxiosError } from 'axios';
import Movie from './Movie'
import Weather from './Weather';
import Error from './Error';



export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityInformation: {},
      displayMap: true,
      errorMessage: false,
      displayError: false,
      weather: [],
      movies:[],
      error:undefined,
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

    this.setState ({
      error: undefined
    })

    
      const city = axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.bd985e4e701a5b53341ec9e721b6098a&q=${this.state.cityName}&format=json`).then(response => {
        console.log(response===undefined)
        console.log(AxiosError.code)
        this.setState({
          cityInformation: response.data[0],
          display_name: response.data[0].display_name,
          lat: response.data[0].lat,
          lon: response.data[0].lon,
          error: 'no error'
        });
  

        try {
          this.displayWeather(this.state.cityName, response.data[0].lat, response.data[0].lon);
          console.log('test')
          this.displayMovie(this.state.cityName)
        } catch (error) {

          console.log(error)
          console.log('test')
        }
     
        
  
      });

    
    
  }

//https://odat-city.herokuapp.com/
//http://localhost:4001/


  displayWeather = async (cityName, lat, lon) => {
    const weatherData = await axios.get(`https://odat-city.herokuapp.com/weather?searchQuery=${cityName}&lat=${lat}&lon=${lon}`);

    if(cityName !== null || undefined) {
      this.setState({
        weather: weatherData.data
      })

    } else {
      this.setState({
        displayError: true
      })
    }
  
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
        {this.state.error===undefined &&
          <Error/> 
        }
       
        <p>{this.state.cityInformation.display_name}</p>
        <p> Latitude : {this.state.cityInformation.lat}</p>
        <p> Longitude : {this.state.cityInformation.lon}</p>

        {this.state.cityName &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.cityInformation.lat},${this.state.cityInformation.lon}&zoom=10`} alt='' />
        }
        {this.state.weather.map(item =>
          <li >📅 {item.date} : 🌥️ {item.description}: 🌡️ Highest Temperature: {item.highestTemp}</li>
        ) }

        <div>_______________________________________</div>

        <Movie movie={this.state.movies} />
      </div>

    )
  }
}


