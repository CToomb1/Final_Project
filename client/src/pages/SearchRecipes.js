import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveRecipe, searchRecipe, searchLocation } from '../utils/API';

function SearchRecipe() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchLocation, setsearchLocation] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const userData = useContext(UserInfoContext);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!searchInput) {
            return false;
        }

        searchRecipe(searchInput)
            .then((weatherRES) => {

                const dayOne = {
                    cityname: weatherRES.city.name,
                    Datenanme: weatherRES.list[6].dt_txt,
                    IconImage: weatherRES.list[6].weather[0].icon,
                    Temp: weatherRES.list[6].main.temp,
                    food: weatherRES.list[6].weather[0].description,
                };
                const dayTwo = {
                    cityname: weatherRES.city.name,
                    Datenanme: weatherRES.list[14].dt_txt,
                    IconImage: weatherRES.list[14].weather[0].icon,
                    Temp: weatherRES.list[14].main.temp,
                    food: weatherRES.list[14].weather[0].description,
                };
                const dayThree = {
                    cityname: weatherRES.city.name,
                    Datenanme: weatherRES.list[22].dt_txt,
                    IconImage: weatherRES.list[22].weather[0].icon,
                    Temp: weatherRES.list[22].main.temp,
                    food: weatherRES.list[22].weather[0].description,
                };
                const dayFour = {
                    cityname: weatherRES.city.name,
                    Datenanme: weatherRES.list[30].dt_txt,
                    IconImage: weatherRES.list[30].weather[0].icon,
                    Temp: weatherRES.list[30].main.temp,
                    food: weatherRES.list[30].weather[0].description,
                };
                const dayFive = {
                    cityname: weatherRES.city.name,
                    Datenanme: weatherRES.list[38].dt_txt,
                    IconImage: weatherRES.list[38].weather[0].icon,
                    Temp: weatherRES.list[38].main.temp,
                    food: weatherRES.list[38].weather[0].description,
                };


                return setSearchedRecipes(dayOne, dayTwo, dayThree, dayFour, dayFive);
            })
            .then(() => setSearchInput(''))
            .catch((err) => console.log(err));
    };



}











function SearchBooks() {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const userData = useContext(UserInfoContext);
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        searchGoogleBooks(searchInput)
            .then(({ data }) => {
                const bookData = data.items.map((book) => ({
                    bookId: book.id,
                    authors: book.volumeInfo.authors || ['No author to display'],
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks?.thumbnail || '',
                }));
                console.log(bookData);

                return setSearchedBooks(bookData);
            })
            .then(() => setSearchInput(''))
            .catch((err) => console.log(err));
    };

    const handleSaveBook = (bookId) => {
        const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }

        saveBook(bookToSave, token)
            .then(() => userData.getUserData())
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Jumbotron fluid className='text-light bg-dark'>
                <Container>
                    <h1>Search for Books!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a book'
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
                <h2>{searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : 'Search for a book to begin'}</h2>
                <CardColumns>
                    {searchedBooks.map((book) => {
                        return (
                            <Card key={book.bookId} border='dark'>
                                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className='small'>Authors: {book.authors}</p>
                                    <Card.Text>{book.description}</Card.Text>
                                    {userData.username && (
                                        <Button
                                            disabled={userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)}
                                            className='btn-block btn-info'
                                            onClick={() => handleSaveBook(book.bookId)}>
                                            {userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)
                                                ? 'This book has already been saved!'
                                                : 'Save this Book!'}
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
}

export default SearchBooks;
