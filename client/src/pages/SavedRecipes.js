import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import UserInfoContext from '../utils/userinfocontext';

import * as API from '../utils/api';
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
                    {userData.savedRecipes.length
                        ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
                        : 'You have no saved Recipe!'}
                </h2>
                <CardColumns>
                    {userData.savedRecipes.map((recipe) => {
                        return (
                            <Card key={recipe.id} border='dark'>
                                <Card.Body>
                                    {recipe.FoodPic ? <Card.Img src={`https://spoonacular.com/recipeImages/${recipe.FoodPic}`} alt={`Picture of ${recipe.description}`} variant='top' /> : null}
                                    <Card.Text >Title: {recipe.description}</Card.Text>
                                    <Card.Text >Prep time: {recipe.PrepTime} minutes</Card.Text>
                                    <Card.Text >Servings: {recipe.Servings} people</Card.Text>
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
