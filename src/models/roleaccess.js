'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoleAccess.belongsTo(models.Role, {
        foreignKey: 'roleId'
      })

      RoleAccess.belongsTo(models.Access, {
        foreignKey: 'accessId'
      })
    }
  };
  RoleAccess.init({
    roleId: DataTypes.INTEGER,
    accessId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleAccess',
  });
  return RoleAccess;
};