const sequelize = require('../config/connection');
const { User, Playlist, Songs } = require('../models');

const userData = require('./userData.json');
const songsData = require('./songsData.json');
const playlistData = require('./playlistData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Playlist.bulkCreate(playlistData);
    await Songs.bulkCreate(songsData);

    process.exit(0);
};

seedDatabase();
