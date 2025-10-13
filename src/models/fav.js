'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    tableName: 'Favorites'
  });

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
    Favorite.belongsTo(models.Song, { foreignKey: 'song_id' });
    Favorite.belongsTo(models.Albums, { foreignKey: 'album_id' });
  };

  return Favorite;
};