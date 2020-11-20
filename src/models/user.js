'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserRole, {
        foreignKey: {
          name: 'userId'
        }
      })

      User.belongsToMany(models.Role, {
        through: models.UserRole
      })

      User.hasMany(models.UserAccess, {
        foreignKey: {
          name: 'userId'
        }
      })

      User.belongsToMany(models.Access, {
        through: models.UserAccess
      })

      User.hasMany(models.Article, {
        foreignKey: {
          name: 'userId'
        }
      })
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};