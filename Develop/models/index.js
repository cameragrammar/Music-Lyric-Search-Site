const User = require('./user');
const Playlist = require('./playlist');
const Songs = require('./songs')

// user & playlist
User.hasMany(Playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id'
});

//playlist & song
Playlist.hasMany(Songs, {
  foreignKey: 'playlist_id',
});

Songs.belongsTo(Playlist, {
  foreignKey: 'playlist_id'
});

module.exports = { User, Playlist, Songs };

