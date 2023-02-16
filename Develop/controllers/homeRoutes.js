const router = require('express').Router();
const { user, playlist, song } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const userData = await user.findAll({
      include: [
        // {
        //   model: Artist,
        //   attributes: ['name', 'image_url'],
        // },
        {
          model: playlist,
          attributes: ['name'],
          include: [
            {
              model: song,
              attributes: ['name', 'artist'],
            },
          ],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));
    const context = {
      users,
      logged_in: req.session.logged_in
    };

    if (req.query.search) {
      const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.query.search}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
      const data = await response.json();
      const response2 = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${req.query.search}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
      const data2 = await response2.json();
      context.artists = data.results.artistmatches.artist.slice(0, 10);
      context.tracks = data2.results.trackmatches.track.slice(0, 10);
    }

    let artist = req.query.artist;

    if (req.query.track) {
      console.log(req.query.track);
      const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${artist}&track=${req.query.track}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
      const data = await response.json();
      artist = data.track.artist.name;
      context.track = {
        name: data.track.name,
        playcount: data.track.playcount,
        summary: data.track.wiki.summary,
      }
    }

    if (artist) {
      const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
      const data = await response.json();
      //console.log(data.results);
      context.artist = {
        ...data.artist,
        image: data.artist.image[0]["#text"]
      }
    }

    res.render('homepage',
      context
    );

    // Pass serialized data and session flag into template

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [

        { model: Artist },
        { model: playlist },
        { model: Song },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('user-profile', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Profile }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }



  res.render('login');



});

module.exports = router;
