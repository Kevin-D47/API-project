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
      Image.belongsTo(
        models.User,
        {foreignKey: 'userId', onDelete: "CASCADE", hooks:true}
      )

      Image.belongsTo(
        models.Spot,
        {foreignKey: 'spotId', onDelete: "CASCADE", hooks:true}
      )

      Image.belongsTo(
        models.Review,
        {foreignKey: 'reviewId', onDelete: "CASCADE", hooks:true}
      )
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
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
