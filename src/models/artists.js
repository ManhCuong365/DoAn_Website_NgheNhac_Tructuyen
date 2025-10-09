'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
      // define association here
      Artist.hasMany(models.Albums, { foreignKey: 'artist_id' });
      Artist.hasMany(models.Song, { foreignKey: 'artist_id' });
    }
  }
  Artist.init({
    name: DataTypes.STRING,
    photo_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Artists',
  });
  return Artist;
};