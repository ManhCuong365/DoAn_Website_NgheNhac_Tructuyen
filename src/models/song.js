'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      // define association here
      Song.belongsTo(models.Albums, {
        foreignKey: 'album_id',
        onDelete: 'RESTRICT',
        as: 'Album'
      });
      Song.belongsTo(models.Artists, {
        foreignKey: 'artist_id',
        onDelete: 'CASCADE',
        as: 'Artist'
      });
      
    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      alowNull: false,
    },
    file_url: {
      type: DataTypes.STRING,
      alowNull: true,
    },
    release_date: {
      type: DataTypes.INTEGER,
      alowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Song',
  });

  return Song;
};