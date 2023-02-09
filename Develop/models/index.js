const user = require('./user');
const playlist = require('./playlist');
const song = require('./songs')
const artist = require('./artists')

// user & playlist
user.hasMany(playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

playlist.belongsTo(user, {
  foreignKey: 'user_id'
});

//playlist & song
playlist.hasMany(song, {
  foreignKey: 'playlist_id',
  onDelete: 'CASCADE'
});

song.belongsTo(playlist, {
  foreignKey: 'playlist_id'
});

//playlist & artist
playlist.hasMany(artist, {
  foreignKey: 'playlist_id',
  onDelete: 'CASCADE'
});

artist.belongsTo(playlist, {
  foreignKey: 'playlist_id'
});

module.exports = { user, playlist };
