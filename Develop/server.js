const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const Playlist = require('./models/playlist');

// const helpers = require('./utils/auth');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
    helpers: {
        json: function(context) {
            return JSON.stringify(context);
        }
    },
    partialsDir: [
        path.join(__dirname, 'views/partials/')
    ]
});

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.post('/profile/playlists', async (req, res) => {
    try {
      const newPlaylist = await Playlist.create({
        name: req.body.name,
        user_id: req.session.user_id
      });
  
      const playlists = await Playlist.findAll({
        where: { user_id: req.session.user_id },
        raw: true
      });
  
      res.render('profile', { playlists });
    } catch (err) {
      res.status(500).json(err);
    }
  });

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
