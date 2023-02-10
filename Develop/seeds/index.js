const sequelize = require('../config/connection');
const { user, playlist, song } = require('../models');

const userData = require('./userData.json');
const songsData = require('./songsData.json');
const playlistData = require('./playlistData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await user.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await playlist.bulkCreate(playlistData);
    await song.bulkCreate(songsData);

    process.exit(0);
};

seedDatabase();
