import React from "react";
import Alert from 'react-bootstrap/Alert';

export default class Error extends React.Component {

    render() {
        return (
            <Alert variant="info">
                <Alert.Heading>Sorry!</Alert.Heading>
                <p>
                The city you are looking for doesn't exist in our database.
                </p>
                <hr />
                <p className="mb-0">
                   Try to search for a new city.
                </p>
            </Alert>
        )
    }
}