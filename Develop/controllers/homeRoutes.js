const router = require('express').Router();
const { User, Playlist, Songs } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
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
              model: Songs,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    console.log(27)
    // Serialize data so the template can read it
<<<<<<< HEAD
    const user = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      user,
=======
    const users = userData.map((user) => user.get({ plain: true }));
    const context = {
      users,
>>>>>>> 074b8083abfb0243ec0610e8b93218598aaddcd0
      logged_in: req.session.logged_in
    };

    if (req.query.search) {
      const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.query.search}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
      const data = await response.json();
      //console.log(data.results.artistmatches);
      context.results = data.results.artistmatches.artist.slice(0, 10);
      }

      if (req.query.artist) {
        const response = await fetch(`http://ws.audioscrobbler.com//2.0/?method=artist.getinfo&artist=${req.query.artist}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
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

<<<<<<< HEAD
  if (req.query.search) {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.query.search}&api_key=ec04df62f6ddb8b7af8a249b27cd35de&format=json`);
    const data = await response.json();
    console.log(data.results.artistmatches);
    res.render('login', { results: data.results.artistmatches.artist.slice(0, 10) });
  }
  else {
    res.render('login');// change to profile page once login is renamed appropriatly 
  }


=======


  res.render('login');



>>>>>>> 074b8083abfb0243ec0610e8b93218598aaddcd0
});

module.exports = router;
