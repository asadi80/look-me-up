const router = require('express').Router();

const userRoutes = require('./user-routes');
const profileRoutes = require('./profile-routes');
const linkRoutes = require('./link-routes');

router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/links', linkRoutes);

module.exports = router;