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
        sourceKey: 'id',
        foreignKey: 'userId'
      })

      UserAccess.belongsTo(models.Access, {
        sourceKey: 'id',
        foreignKey: 'accessId'
      })
    }
  };
  UserAccess.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userId tidak boleh kosong'
        }
      }
    },
    accessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'accessId tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserAccess',
  });
  return UserAccess;
};
