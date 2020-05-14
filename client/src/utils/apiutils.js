import axios from 'axios';

export const getAllUsers = function () {
  return axios.get('/api/users');
};

// route to get logged in user's info (needs the token)
export const getMe = function (token) {
  return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
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
  return axios.delete(`/api/users/recipeData/${recipeId}`, { headers: { authorization: `Bearer ${token}` } });
};

export const searchLocationAPI = function (query) {
  return axios.get(
    'https://api.openweathermap.org/data/2.5/forecast?zip=07083,us&appid=bb2771f5bb681a2a7b1c9f5f413832a1&units=imperial',
    { params: { q: query } }
  );
};

export const searchRecipesAPI = function (query) {
  return axios.get(
    'https://api.spoonacular.com/recipes/search?cuisine="+ q +"&apiKey=dca66fb5322341b49c535563addea129&number=100',
    { params: { q: query } }
  );
};
