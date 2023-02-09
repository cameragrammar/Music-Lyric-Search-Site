const router = require('express').Router();
const userRoutes = require('./userRoutes');
const artistsRoutes = require('./artistsRoutes');
const playlistRoutes = require('./playlistRoutes');
const songsRoutes = require('./songsRoutes');

router.use('/user', userRoutes);
router.use('/artists', artistsRoutes);
router.use('/playlist', playlistRoutes);
router.use('/songs', songsRoutes);

module.exports = router;

