import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedRecipe() {
    const userData = useContext(UserInfoContext);

    const handleDeleteRecipe = (recipeId) => {
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }
        API.deleteRecipe(recipeId, token)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Viewing saved Recipes!</h1>
                </Container>
            </Jumbotron>
            <Container>
                <h2>
                    {userData.savedRecipe.length
                        ? `Viewing ${userData.savedRecipe.length} saved ${userData.savedRecipe.length === 1 ? 'recipe' : 'Recipe'}:`
                        : 'You have no saved Recipe!'}
                </h2>
                <CardColumns>
                    {userData.savedRecipe.map((recipe) => {
                        return (
                            <Card key={recipe.recipeId} border='dark'>
                                <Card.Body>
                                    <Card.Title>{recipe}</Card.Title>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                                        Delete this recipe!
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

export default SavedRecipe;
