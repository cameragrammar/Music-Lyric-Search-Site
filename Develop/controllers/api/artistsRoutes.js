const router = require('express').Router();
const { Artist } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all artists
router.get('/', async (req, res) => {
    try {
        const allArtists = await Artist.findAll();
        res.status(200).json(allArtists);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single artist by ID
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            res.status(404).json({ message: 'Artist not found' });
            return;
        }
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new artist to the playlist