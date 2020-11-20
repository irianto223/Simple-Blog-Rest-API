'use strict';
import { hashPassword } from '../helpers/auth';

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
        sourceKey:'id',
        foreignKey: 'userId'
      })

      User.belongsToMany(models.Role, {
        through: models.UserRole,
        sourceKey:'id',
        foreignKey: 'userId'
      })

      User.hasMany(models.UserAccess, {
        sourceKey:'id',
        foreignKey: 'userId'
      })

      User.belongsToMany(models.Access, {
        through: models.UserAccess,
        sourceKey:'id',
        foreignKey: 'userId'
      })

      User.hasMany(models.Article, {
        sourceKey:'id',
        foreignKey: 'userId'
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
    hooks: {
      beforeCreate: (instansce, options) => {
        instansce.password = hashPassword(instansce.password);
      }
    }
  });
  return User;
};