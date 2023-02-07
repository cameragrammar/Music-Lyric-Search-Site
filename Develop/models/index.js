const user = require('./user');
const playlist = require('./playlist');

user.hasMany(playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

playlist.belongsTo(user, {
  foreignKey: 'user_id'
});

module.exports = { user, playlist };
