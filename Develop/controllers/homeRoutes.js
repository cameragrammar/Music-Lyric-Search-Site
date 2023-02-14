const router = require('express').Router();
const { User, Playlist, Song } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // cut sense were not loading any user data

    // Get all projects and JOIN with user data
    console.log(8)
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
              model: Song
            },
          ],
        },
      ],
    });
    console.log(27)
    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [

        // { model: Artist },
        { model: Playlist },
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

  if (req.query.search) {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.query.search}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
    const data = await response.json();
    console.log(data.results.artistmatches);
    res.render('login', { results: data.results.artistmatches.artist.slice(0, 10) });
  }
  else {
    res.render('login');// change to profile page once login is renamed appropriatly 
  }


});

module.exports = router;
