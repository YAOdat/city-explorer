import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';
import axios from 'axios';


export default class Search extends React.Component {
     constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityInformation: {},
      displayMap: true,
      errorMessage: false,

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
      this.setState({
        cityInformation: response.data[0],
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      });


    });
  }


  render() {
    return (
      <div>
       
        <Form onSubmit={this.doSearch}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label id='formLabel'>Search for a City: </Form.Label>
            <input id='inputID' onChange={this.searchedCity} type="text"/>
           
          </Form.Group>
          

          <Button id='main-btn' variant="primary" type="submit"> Explore! </Button>

        </Form>
        <p>{this.state.cityInformation.display_name}</p>
        <p> Latitude : {this.state.cityInformation.lat}</p>
        <p> Longitude : {this.state.cityInformation.lon}</p>

        {this.state.city && 
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.bd985e4e701a5b53341ec9e721b6098a&q&center=${this.state.cityInformation.lat},${this.state.cityInformation.lon}&zoom=10`} alt='' />
        }

  

      </div>

    )
  }
}


