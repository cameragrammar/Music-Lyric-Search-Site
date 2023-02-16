const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  console.log('user /')
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    // const filler = await User.findAll({
    //   include: [
    //     // {
    //     //   model: Artist,
    //     //   attributes: ['name', 'image_url'],
    //     // },
    //     {
    //       model: Playlist,
    //       attributes: ['name'],
    //       include: [
    //         {
    //           model: Songs,
    //           attributes: ['name'],
    //         },
    //       ],
    //     },
    //   ],
    // });

    // console.log(filler)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('user login')
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
