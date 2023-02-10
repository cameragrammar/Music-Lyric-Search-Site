const router = require('express').Router();
const userRoutes = require('./userRoutes');
const songsRoutes = require('./songsRoutes');

router.use('/user', userRoutes);
router.use('/songs', songsRoutes);

module.exports = router;

