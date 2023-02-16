const User = require('./User');
const Playlist = require('./Playlist');
const Songs = require('./Songs')

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
