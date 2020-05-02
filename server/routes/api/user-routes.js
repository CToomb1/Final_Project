const router = require('express').Router();
const {
    createUser,
    getAllUsers,
    getSingleUser,
    saveLocation,
    deleteLocation,
    login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveLocation);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/Locations/:id').delete(authMiddleware, deleteLocation);

module.exports = router;
