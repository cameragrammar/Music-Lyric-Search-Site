const router = require('express').Router();
const { Songs } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all songs
router.get('/', async (req, res) => {
    try {
        const allSongs = await Songs.findAll();
        res.status(200).json(allSongs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single songs by ID
router.get('/:id', async (req, res) => {
    try {
        const Songs = await Songs.findByPk(req.params.id);
        if (!Songs) {
            res.status(404).json({ message: 'Song not found' });
            return;
        }
        res.status(200).json(Songs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a new songs to the playlist
router.post(`/`, withAuth, async (req, res) => {
    try {
        const newSong = await Songs.create(req.body);
        res.status(200).json(newSong);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete artist from the playlist
router.delete(`/:id`, withAuth, async (req, res) => {
   try {
    const deleteSong = await Songs.destroy({ where: { id: req.params.id }});
    if (deleteSong) {
        res.status(200).json({ message: `Song removed` });
    } else {
        res.status(404).json({ message: `Song not found` });
    }
   } catch (err) {
    res.status(500).json(err);
   }
});

// Add a song to a playlist
router.put('/:playlistId', withAuth, async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const song = await Songs.findOne({ where: { id: req.params.id } });
        if (!song) {
            res.status(404).json({ message: 'Song not found' });
            return;
        }
        song.playlist_id = req.body.playlist_id;
        await song.save();
        res.status(200).json(song);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add a track to a playlist
// router.put('songs/add-to-playlist', withAuth, async (req, res) => {
//     try {
//         const { trackName, trackArtist, playlist_id } = req.body;
//         const song = await Songs.findOne({ where: { trackName, trackArtist } });
//         if (!song) {
//             res.status(404).json({ message: 'Song not found' });
//             return;
//         }
//         song.playlist_id = playlist_id;
//         await song.save();
//         res.status(200).json(song);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;
