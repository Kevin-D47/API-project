'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
        {foreignKey: 'userid', onDelete: "CASCADE", hooks: true}
      )

      Booking.belongsTo(
        models.Spot,
        {foreignKey: 'spotid', onDelete: "CASCADE", hooks: true}
      )
    }
  }
  Booking.init({
    spotid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Booking',
  });
  return Booking;
};
