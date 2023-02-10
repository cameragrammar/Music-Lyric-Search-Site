const router = require('express').Router();
const { Songs } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all songs
router.get(`/`, async (req, res, next) => {
    try {
        const allSongs = await Songs.findAll();
        res.status(200).json(allSongs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single song by ID
router.get(`/:id`, async (req, res) => {
    try {
        const songs = await Songs.findByPk(req.params.id);
        if (!Songs) {
            res.status(404).json({ message: 'No songs found'});
            return;
        }
        res.status(200).json(Songs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new song to the playlist
router.post(`/`, withAuth, async (req, res) => {
    try {
        const newSong = await Songs.create(req.body);
        res.status(200).json(newSong);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a song from the playlist
router.delete(`/:id`, async (req, res) => {
    try {
        const deleteSong = await Songs.destroy({ where: { id: req.params.id } });
        if (deleteSong) {
            res.status(200).json({ message: 'Song deleted successfully'});
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
      } catch (err) {
        res.status(500).json(err);
      }
});


module.exports = router;