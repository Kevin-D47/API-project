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
        {foreignKey: 'userid', onDelete: "CASCADE", hooks:true}
      )
      
      Image.belongsTo(
        models.Spot,
        {foreignKey: 'spotid', onDelete: "CASCADE", hooks:true}
      )

      Image.belongsTo(
        models.Review,
        {foreignKey: 'reviewid', onDelete: "CASCADE", hooks:true}
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
