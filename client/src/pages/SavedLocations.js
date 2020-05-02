import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedLocation() {
    const userData = useContext(UserInfoContext);

    const handleDeleteLocation = (locationId) => {
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }
        API.deleteLocation(locationId, token)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing saved Location!</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedLocation.length
                        ? `Viewing ${userData.savedLocation.length} saved ${userData.savedLocation.length === 1 ? 'location' : 'Location'}:`
                        : 'You have no saved Location!'}
                </h2>
                <CardColumns>
                    {userData.savedLocation.map((location) => {
                        return (
                            <Card key={location.locationId} border='dark'>
                                <Card.Body>
                                    <Card.Title>{location}</Card.Title>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteLocation(location.locationId)}>
                                        Delete this location!
                  </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>
        </>
    );
}

export default SavedLocation;
