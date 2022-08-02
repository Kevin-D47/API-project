'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.User,
        {foreignKey: 'userid', onDelete: "CASCADE", hooks:true}
      )

      Review.belongsTo(
        models.Spot,
        {foreignKey: 'spotid', onDelete: "CASCADE", hooks:true}
      )

      Review.hasMany(
        models.Image,
        {foreignKey: 'reviewid', onDelete: "CASCADE", hooks:true}
      )
    }
  }
  Review.init({
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    spotid: {
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
    modelName: 'Review',
  });
  return Review;
};
