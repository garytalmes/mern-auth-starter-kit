const router = require('express').Router();

const sampleRoutes = require('./sample.routes');
const userRoutes = require('./user.routes');

router.use('/sample', sampleRoutes);
router.use('/user', userRoutes);

module.exports = router;
