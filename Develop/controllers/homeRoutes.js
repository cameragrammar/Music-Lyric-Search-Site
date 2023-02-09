const router = require('express').Router();
const { User, artist, playlist, songs } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
      include: [
        {
          model: artist,
          attributes: ['name', 'image_url'],
        },
        {
            model: playlist,
            attributes: ['name'],
            include: [
                {
                    model: songs,
                    attributes: ['title', 'artist'],
                },
            ],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      users, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        { model: artist},
        { model: playlist},
        { model: songs},
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
