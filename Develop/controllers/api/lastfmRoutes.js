const router = require('express').Router();
const { Songs } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all songs
router.get('/', async (req, res) => {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.query.search}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
    const data = await response.json();
    console.log(data.results.artistmatches);
    res.render('login', {results:data.results.artistmatches.artist});
});


module.exports = router;