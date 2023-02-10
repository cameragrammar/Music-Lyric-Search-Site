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
        const Artist = await Artist.findByPk(req.params.id);
        if (!Artist) {
            res.status(404).json({ message: 'Artist not found' });
            return;
        }
        res.status(200).json(Artist);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new artist to the playlist
router.post(`/`, withAuth, async (req, res) => {
    try {
        const newArtist = await Artist.create(req.body);
        res.status(200).json(newArtist);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete artist from the playlist
router.delete(`/:id`, withAuth, async (req, res) => {
   try {
    const deleteArtist = await Artist.destroy({ where: { id: req.params.id }});
    if (deleteArtist) {
        res.status(200).json({ message: `Artist removed` });
    } else {
        res.status(404).json({ message: `Artist not found` });
    }
   } catch (err) {
    res.status(500).json(err);
   }
});

module.exports = router;