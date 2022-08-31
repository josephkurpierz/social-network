const router = require('express').Router();
const userRoutes = require('./user-routes');

//add /users prefix to routes in user routes
router.use('/users', userRoutes);

module.exports = router;