import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';


export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className='formDiv'>
                <Form onSubmit={this.getCity}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Label class='formClass' htmlFor='userInput' id='formLabel' > Search for a City: </Form.Label>

                        <input onChange={this.changecityExplorer} type="text" htmlFor='userInput' id='formInput'/>
                        
                    </Form.Group>
                  

                    <Button class='buttonClass' variant="primary" type="submit"> Explore! </Button>

                </Form>
            </div>


        )
    }

};



