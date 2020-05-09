const router = require('express').Router();
const {
    createUser,
    getAllUsers,
    getSingleUser,
    saveRecipe,
    deleteRecipe,
    login,
} = require('../../controllers/users-controllers');

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveRecipe);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/Locations/:id').delete(authMiddleware, deleteRecipe);

module.exports = router;
