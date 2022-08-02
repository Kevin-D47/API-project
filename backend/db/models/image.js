'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association heregit checkout
    }
  }
  Image.init({
    url: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    previewImage: {
      type: DataTypes.STRING
    },
    spotid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    reviewid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
