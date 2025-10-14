'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Albums, {
        through: 'Favorite',
        foreignKey: 'user_id',
        otherKey: 'album_id',
        as: 'Albums'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

    status: {
      type: DataTypes.ENUM('active', 'inactive'), 
      defaultValue: 'active',
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};