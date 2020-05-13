import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveRecipe, searchRecipesAPI, searchLocationAPI } from '../utils/API';

function SearchRecipes() {
    const [searchRecipes, setSearchRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [dayArray, setDayArray] = useState([]);
    const userData = useContext(UserInfoContext);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!searchInput) {
            return false;
        }

        let dayOne, dayTwo, dayThree, dayFour, dayFive;

        searchLocationAPI(searchInput)
            .then(({ data: weatherRES }) => {
                let mapping = {
                    'clear sky': 'American',
                    'light rain': 'chinese',
                    'overcast clouds': 'italian',
                    'light snow': 'japanese',
                    'snow': 'Mexican',
                    'scattered clouds': 'Caribbean',
                    'broken clouds': 'Cajun',
                }

                dayOne = {
                    cityname: weatherRES.city.name,
                    Datename: weatherRES.list[6].dt_txt,
                    IconImage: weatherRES.list[6].weather[0].icon,
                    Temp: weatherRES.list[6].main.temp,
                    WeatherDescription: weatherRES.list[6].weather[0].description,
                    food: mapping[weatherRES.list[6].weather[0].description] || "American",
                    recipeData: "",

                };
                dayTwo = {
                    cityname: weatherRES.city.name,
                    Datename: weatherRES.list[14].dt_txt,
                    IconImage: weatherRES.list[14].weather[0].icon,
                    Temp: weatherRES.list[14].main.temp,
                    WeatherDescription: weatherRES.list[14].weather[0].description,
                    food: mapping[weatherRES.list[14].weather[0].description] || "American",
                };
                dayThree = {
                    cityname: weatherRES.city.name,
                    Datename: weatherRES.list[22].dt_txt,
                    IconImage: weatherRES.list[22].weather[0].icon,
                    Temp: weatherRES.list[22].main.temp,
                    WeatherDescription: weatherRES.list[22].weather[0].description,
                    food: mapping[weatherRES.list[22].weather[0].description] || "American",
                };
                dayFour = {
                    cityname: weatherRES.city.name,
                    Datename: weatherRES.list[30].dt_txt,
                    IconImage: weatherRES.list[30].weather[0].icon,
                    Temp: weatherRES.list[30].main.temp,
                    WeatherDescription: weatherRES.list[30].weather[0].description,
                    food: mapping[weatherRES.list[30].weather[0].description] || "American",
                };
                dayFive = {
                    cityname: weatherRES.city.name,
                    Datename: weatherRES.list[38].dt_txt,
                    IconImage: weatherRES.list[38].weather[0].icon,
                    Temp: weatherRES.list[38].main.temp,
                    WeatherDescription: weatherRES.list[38].weather[0].description,
                    food: mapping[weatherRES.list[38].weather[0].description] || "American",
                };
                return Promise.all([searchRecipesAPI(dayOne.food), searchRecipesAPI(dayTwo.food), searchRecipesAPI(dayThree.food), searchRecipesAPI(dayFour.food), searchRecipesAPI(dayFive.food)])
                    .then((responses) => {

                        console.log(responses);
                        let index = Math.floor(Math.random() * responses[0].data.results.length);

                        // const recipeData = responses[0].data.items.map((day) => ({
                        dayOne.recipeData = {
                            FoodPic: responses[0].data.results[index].image || '',
                            PrepTime: responses[0].data.results[index].readyInMinutes,
                            Servings: responses[0].data.results[index].servings,
                            description: responses[0].data.results[index].title,
                            recipeID: responses[0].data.results[index].id,
                        }
                        console.log(dayOne);


                        index = Math.floor(Math.random() * responses[1].data.results.length);

                        // const recipeData = responses[0].data.items.map((day) => ({
                        dayTwo.recipeData = {
                            FoodPic: responses[1].data.results[index].image || '',
                            PrepTime: responses[1].data.results[index].readyInMinutes,
                            Servings: responses[1].data.results[index].servings,
                            description: responses[1].data.results[index].title,
                            recipeID: responses[1].data.results[index].id,
                        }

                        index = Math.floor(Math.random() * responses[0].data.results.length);
                        // const recipeData = responses[0].data.items.map((day) => ({
                        dayThree.recipeData = {
                            FoodPic: responses[2].data.results[index].image || '',
                            PrepTime: responses[2].data.results[index].readyInMinutes,
                            Servings: responses[2].data.results[index].servings,
                            description: responses[2].data.results[index].title,
                            recipeID: responses[2].data.results[index].id,
                        }

                        index = Math.floor(Math.random() * responses[0].data.results.length);
                        // const recipeData = responses[0].data.items.map((day) => ({
                        dayFour.recipeData = {
                            FoodPic: responses[3].data.results[index].image || '',
                            PrepTime: responses[3].data.results[index].readyInMinutes,
                            Servings: responses[3].data.results[index].servings,
                            description: responses[3].data.results[index].title,
                            recipeID: responses[3].data.results[index].id,
                        }

                        index = Math.floor(Math.random() * responses[0].data.results.length);
                        // const recipeData = responses[0].data.items.map((day) => ({
                        dayFive.recipeData = {
                            FoodPic: responses[4].data.results[index].image || '',
                            PrepTime: responses[4].data.results[index].readyInMinutes,
                            Servings: responses[4].data.results[index].servings,
                            description: responses[4].data.results[index].title,
                            recipeID: responses[4].data.results[index].id,
                        }
                        return setDayArray([dayOne, dayTwo, dayThree, dayFour, dayFive]);
                    })

                    .catch(error => {
                        console.error(error.message)
                    });

            })

            .then((res) => {

                return setSearchRecipes(res)
            })

            .then(() => setSearchInput(''))
            .catch((err) => console.log(err));
    };

    const handleSaveRecipe = (recipeID) => {
        console.log(recipeID);
        const recipeToSave = dayArray.find(({ recipeData }) => recipeData.recipeID === recipeID);
        const { recipeData } = recipeToSave;
        console.log(recipeData);
        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }

        // send the books data to our api
        saveRecipe(recipeData, token)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for recipes!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a location!(City name only)'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
            </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </Jumbotron>


            <Container>
                <h2>{dayArray.length ? `Viewing your foodcast for ${searchInput}:` : 'Search for a city to begin'}</h2>
                <CardColumns>
                    {dayArray.map((day) => {
                        return (
                            <Card key={day.Datename} border='dark'>
                                <Card.Body>
                                    <Card.Title>{day.Datename}</Card.Title>
                                    {day.IconImage ? <Card.Img src={`http://openweathermap.org/img/w/${day.IconImage}.png`} alt={`Picture of ${day.WeatherDescription}`} variant='top' /> : null}
                                    <Card.Text >Temperature: {day.Temp}</Card.Text>
                                    {day.recipeData.FoodPic ? <Card.Img src={`https://spoonacular.com/recipeImages/${day.recipeData.FoodPic}`} alt={`Picture of ${day.recipeData.description}`} variant='top' /> : null}
                                    <Card.Text >Title: {day.recipeData.description}</Card.Text>
                                    <Card.Text >Prep time: {day.recipeData.PrepTime} minutes</Card.Text>
                                    <Card.Text >Servings: {day.recipeData.Servings} people</Card.Text>
                                    {userData.username && (
                                        <Button
                                            disabled={userData.savedRecipes?.some((savedRecipe) => savedRecipe.recipeID === day.recipeData.recipeID)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveRecipe(day.recipeData.recipeID)}>
                                            {userData.savedRecipes?.some((savedRecipe) => savedRecipe.recipeID === day.recipeData.recipeID)
                                                ? 'This recipe has already been saved!'
                                                : 'Save this recipe!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardColumns>
            </Container>

        </>
    );


};

export default SearchRecipes;