import axios from 'axios';

export const getAllUsers = function () {
    return axios.get('/api/users');
};

export const getMe = function (token) {
    return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
};

export const getUser = function (username) {
    return axios.get(`/api/users/${username}`);
};

export const createUser = function (userData) {
    return axios.post('/api/users', userData);
};

export const loginUser = function (userData) {
    return axios.post('/api/users/login', userData);
};

export const saveRecipe = function (recipeData, token) {
    return axios.put('/api/users', recipeData, { headers: { authorization: `Bearer ${token}` } });
};
export const deleteRecipe = function (recipeId, token) {
    return axios.delete(`/api/users/books/${recipeId}`, { headers: { authorization: `Bearer ${token}` } });
};

export const searchLocation = function (query) {
    return axios.get('http://api.openweathermap.org/data/2.5/weather?zip={zip code},us&appid=bb2771f5bb681a2a7b1c9f5f413832a1&units=imperial', { params: { q: query } });
};

export const searchRecipes = function (query) {
    return axios.get('https://api.spoonacular.com/recipes/search?cuisine=" + foodType + "&apiKey=dca66fb5322341b49c535563addea129&number=100', { params: { q: query } });
};


