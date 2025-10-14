'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {
    static associate(models) {
      // define association here
      Albums.hasMany(models.Song, {
        foreignKey: 'album_id',
        onDelete: 'RESTRICT',
        as: 'Songs'
      });
      Albums.belongsTo(models.Artists, {
        foreignKey: 'artist_id',
        onDelete: 'CASCADE',  
        as: 'Artist'
      });
      Albums.belongsToMany(models.User, {
        through: models.Favorite || 'Favorites',
        foreignKey: 'album_id',
        otherKey: 'user_id',
        as: 'Users'
      });
    }
  }
  Albums.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    artist_id: DataTypes.INTEGER,
    release_date: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Albums',
  });
  return Albums;
};