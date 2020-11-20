'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Access.hasMany(models.RoleAccess, {
        sourceKey: 'id',
        foreignKey: 'accessId'
      })

      Access.belongsToMany(models.Role, {
        through: models.RoleAccess,
        sourceKey: 'id',
        foreignKey: 'accessId'
      })

      Access.hasMany(models.UserAccess, {
        sourceKey: 'id',
        foreignKey: 'accessId'
      })

      Access.belongsToMany(models.User, {
        through: models.UserAccess,
        sourceKey: 'id',
        foreignKey: 'accessId'
      })
    }
  };
  Access.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Access',
  });
  return Access;
};