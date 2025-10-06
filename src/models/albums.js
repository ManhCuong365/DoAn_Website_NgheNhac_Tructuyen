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
    artist_id: DataTypes.STRING,
    release_date: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Albums',
  });
  return Albums;
};