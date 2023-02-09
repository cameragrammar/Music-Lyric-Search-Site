const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model { }

Artist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playlist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'playlist',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    }
);

module.exports = Artist;
