const router = require('express').Router();
const userRoutes = require('./userroutesapi');

router.use('/users', userRoutes);

module.exports = router;
