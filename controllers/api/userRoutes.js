const router = require('express').Router();
const { User, Playlist } = require('../../models');

router.post('/', async (req, res) => {
  console.log('user /');
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('user login');
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.render('login', {
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.render('login', {
        message: 'Incorrect email or password, please try again',
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.render('login', { message: 'Please log in to view your profile.' });
      return;
    }

    const playlists = await Playlist.findAll({
      where: { user_id: req.session.user_id },
      raw: true
    });

    res.render('profile', { playlists });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/profile/playlists', async (req, res) => {
  try {
    const newPlaylist = await Playlist.create({
      name: req.body.name,
      user_id: req.session.user_id,
    });

    const playlists = await Playlist.findAll({
      where: { user_id: req.session.user_id },
      raw: true,
    });

    // pass the logged_in variable to template data
    res.render('profile', { playlists, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/profile/playlists/:id', async (req, res) => {
  console.log("can I get a console log at least?")
  try {
    const playlistData = await Playlist.update(req.body, {
      where: { id: req.params.id },
    });

    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
