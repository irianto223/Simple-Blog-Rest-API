'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAccess.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      UserAccess.belongsTo(models.Access, {
        foreignKey: 'accessId'
      })
    }
  };
  UserAccess.init({
    userId: DataTypes.INTEGER,
    accessId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAccess',
  });
  return UserAccess;
};