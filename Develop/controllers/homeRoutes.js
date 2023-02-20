const router = require('express').Router();
const { User, Playlist, Songs } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const userData = await User.findAll({
      include: [
        // {
        //   model: Artist,
        //   attributes: ['name', 'image_url'],
        // },
        {
          model: Playlist,
          attributes: ['name'],
          include: [
            {
              model: Songs,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    // console.log(users)
    // Serialize data so the template can read it

    const users = userData.map((user) => user.get({ plain: true }));
    // console.log(users);
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
    console.log('bro help');
    res.render('homepage',
      context
    );

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
    // Pass serialized data and session flag into template
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [

        // { model: Artist },
        { model: Playlist },
        { model: Songs },
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
    console.log('/profile')
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
      // include: [{ model: User }],
    });

    const user = userData.get({ plain: true });
    const context = {
      ...user,
      logged_in: true
    }

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

    res.render('profile', context);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* router.get('/profile', async (req, res) => {
  console.log('home login')
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('profile');

}); */

module.exports = router;
