'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        sourceKey: 'id',
        foreignKey: 'userId'
      })
    }
  };
  Article.init({
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'article "title" tidak boleh kosong'
        }
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'article "body" tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};