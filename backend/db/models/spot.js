'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner'})

      Spot.hasMany(models.Booking, { foreignKey: 'spotid', onDelete: "CASCADE", hooks: true })

      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: "CASCADE", hooks: true })

      Spot.hasMany(models.Image, { foreignKey: 'spotId', onDelete: "CASCADE", hooks: true })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: 'Users' }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        validLat(value) {
          if (value > 90 || value < -90) {
            throw new Error("Invalid Data Entry")
          }
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        validLat(value) {
          if (value > 180 || value < -180) {
            throw new Error("Invalid Data Entry")
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        len: [ 1, 49 ]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
