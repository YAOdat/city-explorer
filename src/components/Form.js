import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';
import axios from 'axios';
import Weather from './Weather'


export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityInformation: {},
      displayMap: true,
      errorMessage: false,
      weather: [],

    }
  };

  searchedCity = (event) => {
    this.setState({
      city: event.target.value
    });
  }

  doSearch = async (event) => {
    event.preventDefault();
    await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.bd985e4e701a5b53341ec9e721b6098a
        &q=${this.state.city}&format=json`).then(response => {
      console.log(response.data[0], 'line33')
      this.setState({
        cityInformation: response.data[0],
        lattitude: response.data[0].lat,
        longitude: response.data[0].lon,

      });

      this.displayW()


      //   const weather =   axios.get('http://localhost:4001/weather', {params: 
      //   { lattitude: this.state.lattitude, 
      //   longitude: this.state.longitude,
      //   searchQuery: this.state.display_name
      // }})
      // console.log(weather)
      // this.setState ({
      //   weatherData: weather,
      // })

    });


  }


  displayW = async (searchQuery, lattitude, longitude) => {

    const weatherData = await axios.get(`http://localhost:4001/weather?searchQuery=${this.state.city}`, {
      params:

      {
        lattitude: this.state.lattitude,
        longitude: this.state.longitude,
        searchQuery: this.state.display_name
      }
    }); console.log(weatherData.data)

    this.setState({
      weather: weatherData.data
    })
  }




  render() {
    return (
      <div>

        <Form onSubmit={this.doSearch}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label id='formLabel'>Search for a City: </Form.Label>
            <input id='inputID' onChange={this.searchedCity} type="text" />

          </Form.Group>


          <Button id='main-btn' variant="primary" type="submit"> Explore! </Button>

        </Form>
        <p>{this.state.cityInformation.display_name}</p>
        <p> Latitude : {this.state.cityInformation.lat}</p>
        <p> Longitude : {this.state.cityInformation.lon}</p>

        {this.state.city &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.cityInformation.lat},${this.state.cityInformation.lon}&zoom=10`} alt='' />
        }

        {this.state.weather.map(item =>
          <li>{item.date} : {item.description}</li>
        )
        }

      </div>

    )
  }
}


